// external
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';

// global
import { useAirgap, useEmotion } from '../hooks';
import { messages } from '../messages';
import type { ConsentSelection, HandleSetViewState } from '../types';

// local
import Form from './Form';
import Title from './Title';
import { getConsentSelections } from '../consent-selections';

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
