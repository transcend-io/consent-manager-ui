import { h, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import {
  messages,
  completeOptionsInvertedMessages,
  completeOptionsMessages,
} from '../messages';
import type { ConsentSelection, HandleSetViewState } from '../types';
import { getConsentSelections } from '../consent-selections';
import { DefinedMessage } from '@transcend-io/internationalization';
import { Button } from './Button';
import { GPCIndicator } from './GPCIndicator';
import { Toggle } from './Toggle';
import { CONSENT_OPTIONS } from '../constants';

// Mapping of purposes to the message translation key
const defaultPurposeToMessageKey: Record<string, DefinedMessage> = {
  Functional: completeOptionsInvertedMessages.functionalLabel,
  Analytics: completeOptionsInvertedMessages.analyticsLabel,
  Advertising: completeOptionsInvertedMessages.advertisingLabel,
  SaleOfInfo: completeOptionsInvertedMessages.saleOfInfoLabel,
};

/**
 * The model view where checking each checkbox represents an opt otu
 */
export function CompleteOptionsInverted({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const { airgap } = useAirgap();

  // Get the tracking purposes from Airgap for display
  const initialConsentSelections = getConsentSelections(airgap);
  const purposeToMessageKey: Record<string, DefinedMessage> = useMemo(
    () =>
      // the purpose type is unique for the bundle
      Object.keys(initialConsentSelections ?? {}).reduce(
        (allMessages, purposeType) => {
          const customPurposeMessageLabel = `purpose.${purposeType}`;
          const resolvedLabel =
            defaultPurposeToMessageKey[purposeType] ??
            Object.hasOwnProperty.call(messages, customPurposeMessageLabel);
          return resolvedLabel
            ? {
                ...allMessages,
                [purposeType]: resolvedLabel,
              }
            : allMessages;
        },
        {} as Record<string, DefinedMessage>,
      ),
    [initialConsentSelections],
  );
  const orderOfPurposes = useMemo(
    () => Object.keys(purposeToMessageKey),
    [purposeToMessageKey],
  );

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
    orderOfPurposes.indexOf(a) < 0 && orderOfPurposes.indexOf(b) > 0
      ? 1
      : orderOfPurposes.indexOf(b) < 0 && orderOfPurposes.indexOf(a) > 0
      ? -1
      : // order purposes based on order defined above
        orderOfPurposes.indexOf(a) - orderOfPurposes.indexOf(b),
  );

  return (
    <div className="complete-options-container">
      <p className="text-title text-title-center">
        {formatMessage(messages.completeOptionsInvertedTitle)}
      </p>
      <form className="complete-options-form">
        <GPCIndicator />
        <div className="toggles-container">
          {orderedSelections.map(([purpose, isChecked]) => (
            <Toggle
              key={purpose}
              invertLabels
              name={
                Object.hasOwnProperty.call(purposeToMessageKey, purpose)
                  ? formatMessage(purposeToMessageKey[purpose])
                  : purpose
              }
              initialToggleState={!isChecked}
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
