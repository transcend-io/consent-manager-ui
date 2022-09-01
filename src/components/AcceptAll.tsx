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
  const { css, cx } = useEmotion();
  const { config } = useConfig();

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

  const paragraphStyle = css`
    color: ${config.theme.fontColor};
    font-size: 14px;
    margin: 0 0 18px 0;

    @media (min-width: ${config.breakpoints.tablet}) {
      margin: 18px 18px 0 0;
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
          <p className={cx(paragraphStyle)}>
            {formatMessage(messages.acceptAllDescription)}
          </p>
        </div>
      </div>
      <Button
        primaryText={formatMessage(messages.acceptAllButtonPrimary)}
        handleClick={handleAcceptAll}
      />
    </ColumnContent>
  );
}
