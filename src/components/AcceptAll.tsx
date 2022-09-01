// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// global
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';

// local
import Button from './Button';
import ColumnContent from './ColumnContent';
import Title from './Title';
import Paragraph from './Paragraph';

/**
 * Component showing "accept all" interface
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
    airgap.optIn(event);
    handleSetViewState('close');
  };

  return (
    <ColumnContent>
      <div>
        <div>
          <Title align="left">
            {formatMessage(messages.consentTitleAcceptAll)}
          </Title>
        </div>
        <div>
          <Paragraph>{formatMessage(messages.acceptAllDescription)}</Paragraph>
        </div>
      </div>
      <Button
        primaryText={formatMessage(messages.acceptAllButtonPrimary)}
        handleClick={handleAcceptAll}
      />
    </ColumnContent>
  );
}
