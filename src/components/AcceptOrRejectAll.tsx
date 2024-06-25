import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing "accept all" or "reject all"
 */
export function AcceptOrRejectAll({
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

  // Opt out of all non-essential purposes
  const handleRejectAll:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    airgap.optOut(event);
    handleSetViewState('close');
  };

  return (
    <div className="column-content" role="none">
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(messages.consentTitleAcceptAll)}
          </p>
        </div>
        <div>
          <p className="paragraph">
            <div
              role="paragraph"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.acceptAllDescription),
              }}
            />
          </p>
        </div>
      </div>
      <div
        className="accept-or-reject-all-button-row"
        role="group"
        aria-label={formatMessage(messages.buttonGroupAriaDescription)}
      >
        <Button
          primaryText={formatMessage(messages.acceptAllButtonPrimary)}
          handleClick={handleAcceptAll}
        />
        <Button
          primaryText={formatMessage(messages.rejectAllButtonPrimary)}
          handleClick={handleRejectAll}
          initialFocus
        />
      </div>
    </div>
  );
}
