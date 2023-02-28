import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing "accept all or more choices" interface
 */
export function AcceptAllOrMoreChoices({
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

  // redirect to more choices
  const handleMoreChoices:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    handleSetViewState('CompleteOptions');
  };

  return (
    <div className="column-content">
      <div>
        <div>
          <p className="text-title text-title-left">
            {formatMessage(messages.consentTitleAcceptAll)}
          </p>
        </div>
        <div>
          <p className="paragraph">
            {formatMessage(messages.acceptAllDescription)}
          </p>
        </div>
      </div>
      <div className="accept-or-reject-all-button-row">
        <Button
          primaryText={formatMessage(messages.acceptAllButtonPrimary)}
          handleClick={handleAcceptAll}
        />
        <Button
          primaryText={formatMessage(messages.moreChoicesButtonPrimary)}
          handleClick={handleMoreChoices}
        />
      </div>
    </div>
  );
}
