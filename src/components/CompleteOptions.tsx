import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap, useGetPurposeMessageKeys } from '../hooks';
import { messages, completeOptionsMessages, bottomMenuMessages } from '../messages';
import type { ConsentSelection, HandleSetViewState } from '../types';
import { getConsentSelections } from '../consent-selections';
import { Button } from './Button';
import { GPCIndicator } from './GPCIndicator';
import { Toggle } from './Toggle';
import { CONSENT_OPTIONS } from '../constants';
import { DEFAULT_PURPOSE_TO_MESSAGE_KEY } from './constants';
import { sortByPurposeOrder } from '../helpers';

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
  const orderedSelections =
    Object.entries(consentSelections).sort(sortByPurposeOrder);

  // Render description
  const description = formatMessage(completeOptionsMessages.description);

  return (
    <div className="complete-options-container" role="none">
      <p
        role="heading"
        id="consent-dialog-title"
        className="text-title text-title-left"
      >
        {formatMessage(messages.consentTitle)}
      </p>
      <p role="paragraph" className='paragraph paragraph-left'>{formatMessage(messages.consentTitleToggleInfo)}</p>
      <form className="complete-options-form complete-options-form-left">
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
          className="toggles-container toggles-container-left"
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
              {...(idx === 0 ? { initialFocus: false } : {})}
            />
          ))}
          </div>
          <div className="button-confirm-cta">
          <Button
            handleClick={handleSave}
            primaryText={formatMessage(completeOptionsMessages.saveButtonPrimary)}
            type="submit"
            {...(orderedSelections.length === 0 ? { initialFocus: true } : {})}
          />
          </div>
          <div class="privacy-policy-bottom">
            <a href="https://privacy.goshippo.com/policies?name=privacy-notice" class="privacy-policy-link" target="_blank" rel="noreferrer">
              {formatMessage(bottomMenuMessages.showPolicyButtonAcceptOrRejectAllOrMoreChoices)}
            </a>
        </div>
      </form>
    </div>
  );
}
