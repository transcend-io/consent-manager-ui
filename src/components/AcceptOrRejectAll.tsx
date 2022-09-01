// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// global
import { useAirgap, useConfig, useEmotion } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';

// local
import Button from './Button';
import ColumnContent from './ColumnContent';
import Title from './Title';
import Paragraph from './Paragraph';

/**
 * Component showing "accept all" or "reject all"
 */
export default function AcceptOrRejectAll({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();
  const { config } = useConfig();
  const { css, cx } = useEmotion();

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

  const buttonRowStyle = css`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (min-width: ${config.breakpoints.tablet}) {
      flex-direction: row;

      button:not(:first-of-type) {
        margin-left: 10px;
      }
    }
  `;

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
      <div className={cx(buttonRowStyle)}>
        <Button
          primaryText={formatMessage(messages.acceptAllButtonPrimary)}
          handleClick={handleAcceptAll}
        />
        <Button
          primaryText={formatMessage(messages.rejectAllButtonPrimary)}
          handleClick={handleRejectAll}
        />
      </div>
    </ColumnContent>
  );
}
