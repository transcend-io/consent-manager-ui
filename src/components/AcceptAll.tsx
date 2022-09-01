// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// main
import type { TrackingConsent } from '@transcend-io/airgap.js-types';

// global
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';

// local
import Button from './Button';
import ColumnContent from './ColumnContent';
import Title from './Title';

/**
 * Component showing "accept all" interface
 *
 * @param root0 - params
 * @returns JSX element
 */
export default function AcceptAll({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  // Opt in to all purposes
  const handleAcceptAll:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    const purposeTypes = airgap.getPurposeTypes();
    const consent: TrackingConsent = {};
    Object.keys(purposeTypes).forEach((purpose) => {
      consent[purpose] = true;
    });
    airgap.setConsent(event, consent);
    handleSetViewState('close');
  };

  return (
    <ColumnContent>
      Hello!
      <Title align="left">{formatMessage(messages.consentTitle)}</Title>
      <Button
        primaryText={formatMessage(messages.acceptAllButtonPrimary)}
        handleClick={handleAcceptAll}
      />
    </ColumnContent>
  );
}
