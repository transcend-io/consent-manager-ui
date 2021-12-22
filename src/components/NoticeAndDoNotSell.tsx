// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// global
import { messages, noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState } from '../types';

// local
import Button from './Button';
import ColumnContent from './ColumnContent';
import Title from './Title';

/**
 * Component showing "accept all" interface
 *
 * @param root0
 */
export default function NoticeAndDoNotSell({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { formatMessage } = useIntl();

  return (
    <ColumnContent>
      <Title align="left">{formatMessage(messages.noticeTitle)}</Title>
      <Button
        primaryText={formatMessage(
          noticeAndDoNotSellMessages.confirmButtonPrimary,
        )}
        handleClick={() => handleSetViewState('close')}
      />
    </ColumnContent>
  );
}
