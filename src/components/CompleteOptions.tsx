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
import { DEFAULT_PURPOSE_TO_MESSAGE_KEY } from './constants';
import { sortByPurposeOrder } from '../helpers';
import { ObjByString } from '@transcend-io/type-utils';

/**
 * The model view for "More Choices" showing granular checkboxes and more info
 */
export function CompleteOptions({
  handleSetViewState,
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global variables to pass to message contents */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const { airgap, buildStrictAuth } = useAirgap();

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
    airgap.setConsent(
      buildStrictAuth({ auth: event }),
      newConsent.purposes,
      CONSENT_OPTIONS,
    );
    handleSetViewState('close');
  };

  // sort ordering of options
  const orderedSelections =
    Object.entries(consentSelections).sort(sortByPurposeOrder);

  // Render description
  const description = formatMessage(
    completeOptionsMessages.description,
    globalUiVariables,
  );

  return (
    <div className="complete-options-container" role="none">
      <fieldset style={{ border: '0' }}>
        <legend
          id="consent-dialog-title"
          className="text-title text-title-center"
        >
          {formatMessage(messages.consentTitle, globalUiVariables)}
        </legend>
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
            <Toggle
              key="Essential"
              globalUiVariables={globalUiVariables}
              name={formatMessage(
                purposeToMessageKey.Essential,
                globalUiVariables,
              )}
              initialToggleState
              disabled
              handleToggle={() => {
                // noop
              }}
              ariaLabel={formatMessage(
                completeOptionsMessages.essentialAriaLabel,
                globalUiVariables,
              )}
            />
            {orderedSelections.map(([purpose, isChecked], idx) => (
              <Toggle
                key={purpose}
                globalUiVariables={globalUiVariables}
                name={
                  Object.hasOwnProperty.call(purposeToMessageKey, purpose)
                    ? formatMessage(
                        purposeToMessageKey[purpose],
                        globalUiVariables,
                      )
                    : purpose
                }
                initialToggleState={isChecked}
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
            type="submit"
            {...(orderedSelections.length === 0 ? { initialFocus: true } : {})}
          />
        </form>
      </fieldset>
    </div>
  );
}
