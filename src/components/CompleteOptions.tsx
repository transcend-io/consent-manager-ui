import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap, useGetPurposeMessageKeys } from '../hooks';
import { messages, completeOptionsMessages } from '../messages';
import type { ConsentSelection, HandleSetViewState } from '../types';
import { getConsentSelections } from '../consent-selections';
import { DefinedMessage } from '@transcend-io/internationalization';
import { Button } from './Button';
import { GPCIndicator } from './GPCIndicator';
import { Toggle } from './Toggle';
import { CONSENT_OPTIONS } from '../constants';

// Mapping of purposes to the message translation key
const defaultPurposeToMessageKey: Record<string, DefinedMessage> = {
  Essential: completeOptionsMessages.essentialLabel,
  Functional: completeOptionsMessages.functionalLabel,
  Analytics: completeOptionsMessages.analyticsLabel,
  Advertising: completeOptionsMessages.advertisingLabel,
  SaleOfInfo: completeOptionsMessages.saleOfInfoLabel,
};

// Encode the default purpose ordering
const ORDER_OF_PURPOSES = Object.keys(defaultPurposeToMessageKey);

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
    defaultPurposeToMessageKey,
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
    <div className="complete-options-container">
      <p id="consent-dialog-title" className="text-title text-title-center">
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

        <div className="toggles-container">
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
          {orderedSelections.map(([purpose, isChecked]) => (
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
            />
          ))}
        </div>
        <Button
          handleClick={handleSave}
          primaryText={formatMessage(completeOptionsMessages.saveButtonPrimary)}
        />
      </form>
    </div>
  );
}
