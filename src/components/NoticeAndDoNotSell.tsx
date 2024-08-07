import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { messages, noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState } from '../types';
import { useAirgap } from '../hooks';
import { Button } from './Button';
import { CONSENT_OPTIONS } from '../constants';

/**
 * Component showing 'okay' button for "do not sell my personal information" interface
 */
export function NoticeAndDoNotSell({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  const handleConfirm: JSX.MouseEventHandler<HTMLButtonElement> | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    // Confirm current consent
    airgap.setConsent(event, airgap.getConsent().purposes, CONSENT_OPTIONS);
    handleSetViewState('close');
  };

  return (
    <div className="column-content" role="none">
      <p
        id="consent-dialog-title"
        role="heading"
        className="text-title text-title-left"
      >
        {formatMessage(messages.noticeTitle)}
      </p>
      <Button
        primaryText={formatMessage(
          noticeAndDoNotSellMessages.confirmButtonPrimary,
        )}
        handleClick={handleConfirm}
        ariaDescription={formatMessage(messages.noticeButtonAriaDescription)}
        initialFocus
      />
    </div>
  );
}
