// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// global
import { messages, noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState } from '../types';
import { useAirgap } from '../hooks';

// local
import Button from './Button';
import ColumnContent from './ColumnContent';
import Title from './Title';

/**
 * Component showing 'okay' button for "do not sell my personal information" interface
 */
export default function NoticeAndDoNotSell({
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
    airgap.setConsent(event, airgap.getConsent().purposes);
    handleSetViewState('close');
  };

  return (
    <ColumnContent>
      <Title align="left">{formatMessage(messages.noticeTitle)}</Title>
      <Button
        primaryText={formatMessage(
          noticeAndDoNotSellMessages.confirmButtonPrimary,
        )}
        handleClick={handleConfirm}
      />
    </ColumnContent>
  );
}
