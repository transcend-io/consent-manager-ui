import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap, useGetPurposeMessageKeys } from '../hooks';
import {
  messages,
  completeOptionsMessages,
  completeOptionsInvertedMessages,
} from '../messages';
import type { ConsentSelection, HandleSetViewState } from '../types';
import { getConsentSelections } from '../consent-selections';
import { Button } from './Button';
import { GPCIndicator } from './GPCIndicator';
import { Toggle } from './Toggle';
import { CONSENT_OPTIONS } from '../constants';
import {
  DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY,
  ORDER_OF_PURPOSES,
} from './constants';
import { ObjByString } from '@transcend-io/type-utils';

/**
 * The model view where checking each checkbox represents an opt otu
 */
export function CompleteOptionsInverted({
  handleSetViewState,
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global variables to pass to message contents */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const { airgap } = useAirgap();

  // Get the tracking purposes from Airgap for display
  const initialConsentSelections = getConsentSelections(airgap);
  const purposeToMessageKey = useGetPurposeMessageKeys({
    consentSelection: initialConsentSelections,
    defaultPurposeToMessageKey: DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY,
    inverted: true,
  });

  // Set state on the currently selected toggles
  const [consentSelections, setConsentSelections] = useState(
    initialConsentSelections,
  );

  // When a consent toggle is hit (not saved)
  const handleToggle = (purpose: string, isChecked: boolean): void => {
    const newSelection: ConsentSelection = {};
    newSelection[purpose] = !isChecked;
    setConsentSelections({
      ...consentSelections,
      ...newSelection,
    });
  };

  // When consent selections are actually saved
  const handleSave: JSX.MouseEventHandler<HTMLButtonElement> | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    const newConsent = airgap.getConsent();
    Object.entries(consentSelections).forEach(([purpose, isConsented]) => {
      newConsent.purposes[purpose] = isConsented;
    });
    airgap.setConsent(event, newConsent.purposes, CONSENT_OPTIONS);
    handleSetViewState('close');
  };

  // sort ordering of options
  const orderedSelections = Object.entries(consentSelections).sort(([a], [b]) =>
    // sort custom purposes to the end
    ORDER_OF_PURPOSES.indexOf(a) < 0 && ORDER_OF_PURPOSES.indexOf(b) > 0
      ? 1
      : ORDER_OF_PURPOSES.indexOf(b) < 0 && ORDER_OF_PURPOSES.indexOf(a) > 0
      ? -1
      : // order purposes based on order defined above
        ORDER_OF_PURPOSES.indexOf(a) - ORDER_OF_PURPOSES.indexOf(b),
  );

  // Render description
  const description = formatMessage(
    completeOptionsInvertedMessages.description,
    globalUiVariables,
  );

  return (
    <div className="complete-options-container" role="none">
      <p
        id="consent-dialog-title"
        role="heading"
        className="text-title text-title-center"
      >
        {formatMessage(
          messages.completeOptionsInvertedTitle,
          globalUiVariables,
        )}
      </p>
      <form className="complete-options-form">
        <GPCIndicator globalUiVariables={globalUiVariables} />
        {description && description !== '-' ? (
          <p className="paragraph">
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </p>
        ) : undefined}
        <div
          className="toggles-container"
          role="group"
          aria-label={formatMessage(
            messages.buttonGroupAriaDescription,
            globalUiVariables,
          )}
        >
          {orderedSelections.map(([purpose, isChecked], idx) => (
            <Toggle
              key={purpose}
              globalUiVariables={globalUiVariables}
              invertLabels
              name={
                Object.hasOwnProperty.call(purposeToMessageKey, purpose)
                  ? formatMessage(
                      purposeToMessageKey[purpose],
                      globalUiVariables,
                    )
                  : purpose
              }
              initialToggleState={!isChecked}
              disabled={false}
              handleToggle={(checked: boolean) =>
                handleToggle(purpose, checked)
              }
              {...(idx === 0 ? { initialFocus: true } : {})}
            />
          ))}
        </div>
        <Button
          handleClick={handleSave}
          primaryText={formatMessage(
            completeOptionsMessages.saveButtonPrimary,
            globalUiVariables,
          )}
          {...(orderedSelections.length === 0 ? { initialFocus: true } : {})}
        />
      </form>
    </div>
  );
}
