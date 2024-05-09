import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap, useGetPurposeMessageKeys } from '../hooks';
import { messages, completeOptionsMessages } from '../messages';
import type { ConsentSelection, HandleSetViewState } from '../types';
import { getConsentSelections } from '../consent-selections';
import { Button } from './Button';
import { GPCIndicator } from './GPCIndicator';
import { Toggle } from './Toggle';
import { CONSENT_OPTIONS } from '../constants';
import { DEFAULT_PURPOSE_TO_MESSAGE_KEY, ORDER_OF_PURPOSES } from './constants';

/**
 * The model view for "More Choices" showing granular checkboxes and more info
 */
export function CompleteOptions({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const { airgap } = useAirgap();

  // Get the tracking purposes from Airgap for display
  const initialConsentSelections = getConsentSelections(airgap);
  const purposeToMessageKey = useGetPurposeMessageKeys({
    consentSelection: initialConsentSelections,
    defaultPurposeToMessageKey: DEFAULT_PURPOSE_TO_MESSAGE_KEY,
  });

  // Set state on the currently selected toggles
  const [consentSelections, setConsentSelections] = useState(
    initialConsentSelections,
  );

  // When a consent toggle is hit (not saved)
  const handleToggle = (purpose: string, isChecked: boolean): void => {
    const newSelection: ConsentSelection = {};
    newSelection[purpose] = isChecked;
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
    Object.entries(consentSelections).forEach(([purpose, isChecked]) => {
      newConsent.purposes[purpose] = isChecked;
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
  const description = formatMessage(completeOptionsMessages.description);

  return (
    <div className="complete-options-container" role="none">
      <p
        role="heading"
        id="consent-dialog-title"
        className="text-title text-title-center"
      >
        {formatMessage(messages.consentTitle)}
      </p>
      <form className="complete-options-form">
        <GPCIndicator />
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
          aria-label={formatMessage(messages.buttonGroupAriaDescription)}
        >
          <Toggle
            key="Essential"
            name={formatMessage(purposeToMessageKey.Essential)}
            initialToggleState
            disabled
            handleToggle={() => {
              // noop
            }}
            ariaLabel={formatMessage(
              completeOptionsMessages.essentialAriaLabel,
            )}
          />
          {orderedSelections.map(([purpose, isChecked], idx) => (
            <Toggle
              key={purpose}
              name={
                Object.hasOwnProperty.call(purposeToMessageKey, purpose)
                  ? formatMessage(purposeToMessageKey[purpose])
                  : purpose
              }
              initialToggleState={isChecked}
              disabled={false}
              handleToggle={(checked: boolean) =>
                handleToggle(purpose, checked)
              }
              {...(idx === 0 ? { autoFocus: true } : {})}
            />
          ))}
        </div>
        <Button
          handleClick={handleSave}
          primaryText={formatMessage(completeOptionsMessages.saveButtonPrimary)}
          type="submit"
        />
      </form>
    </div>
  );
}
