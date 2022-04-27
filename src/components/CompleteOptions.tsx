// external
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';

// main
import type { AirgapAPI } from '@transcend-io/airgap.js-types';

// global
import { useAirgap, useEmotion } from '../hooks';
import { messages } from '../messages';
import type { ConsentSelection, HandleSetViewState } from '../types';

// local
import Form from './Form';
import Title from './Title';

/**
 * Helper to get the tracking purposes for rendering
 */
function getConsentSelections(airgap: AirgapAPI): ConsentSelection {
  // Get the current consent state of Airgap from storage
  const consent = airgap.getConsent();

  // Prepare a mapping between purposes and consent selections from local storage
  const initialConsentSelections: ConsentSelection = {};

  // Get the purposes for processing configured for this organization.
  const purposeTypes = airgap.getPurposeTypes();
  const regimes = airgap.getRegimes();

  if (regimes.has('CPRA')) {
    // Notice + SaleOfInfo-only UI for CPRA
    const purpose = 'SaleOfInfo';
    initialConsentSelections[purpose] = !!consent.purposes[purpose];
  } else {
    // By default reflect airgap.getPurposeTypes API
    Object.keys(purposeTypes).forEach((purpose) => {
      const { configurable, showInConsentManager } = purposeTypes[purpose];

      if (showInConsentManager && configurable) {
        // For purposes that you can opt in/out of, prepare toggles
        initialConsentSelections[purpose] = !!consent.purposes[purpose];
      }
    });
  }

  return initialConsentSelections;
}

/**
 * The model view for "More Options" showing granular checkboxes and more info
 */
export default function CompleteOptions({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const { css, cx } = useEmotion();
  const { airgap } = useAirgap();

  // Get the tracking purposes from Airgap for display
  const initialConsentSelections = getConsentSelections(airgap);

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
    airgap.setConsent(event, newConsent.purposes);
    handleSetViewState('close');
  };

  const containerStyle = css`
    height: inherit;
    animation: fadeIn 200ms ease-in;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  return (
    <div className={cx(containerStyle)}>
      <Title>{formatMessage(messages.consentTitle)}</Title>
      <Form
        consentSelections={consentSelections}
        handleToggle={handleToggle}
        handleSave={handleSave}
      />
    </div>
  );
}
