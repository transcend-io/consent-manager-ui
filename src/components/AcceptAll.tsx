import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing "accept all" interface
 */
export function AcceptAll({
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
    airgap.optIn(event);
    handleSetViewState('close');
  };

  return (
    <div className="column-content">
      <div>
        <p className="text-title text-title-left">
          {formatMessage(messages.consentTitleAcceptAll)}
        </p>
        <p className="paragraph">
          {formatMessage(messages.acceptAllDescription)}
        </p>
      </div>
      <Button
        primaryText={formatMessage(messages.acceptAllButtonPrimary)}
        handleClick={handleAcceptAll}
      />
    </div>
  );
}
