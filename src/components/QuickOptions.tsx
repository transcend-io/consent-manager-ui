// external
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// global
import { useAirgap, useConfig, useEmotion } from '../hooks';
import { messages, quickOptionsMessages } from '../messages';
import type { HandleSetViewState } from '../types';

// local
import Button from './Button';
import Title from './Title';

/**
 * The possible quick options
 */
enum QuickOption {
  Essential,
  Functional,
  Analytics,
  Advertising,
}

// eslint-disable-next-line jsdoc/require-returns, jsdoc/require-param
/**
 * A set of buttons to choose a set of predefined options
 */
export default function QuickOptions({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { config } = useConfig();
  const { formatMessage } = useIntl();
  const { airgap } = useAirgap();
  const { css, cx } = useEmotion();

  const buttonSetStyle = css`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;

    @media (min-width: ${config.breakpoints.tablet}) {
      flex-direction: row;
    }

    /* Fade in */
    animation: fadeIn 150ms;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  // Opt in to all purposes
  const handleQuickOption = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
    selectedQuickOption: QuickOption,
  ): void => {
    event.preventDefault();
    const newConsent = airgap.getConsent();

    const consentsBySelectedQuickOption: Record<QuickOption, string[]> = {
      [QuickOption.Essential]: ['Essential'],
      [QuickOption.Functional]: ['Essential', 'Functional'],
      [QuickOption.Analytics]: ['Essential', 'Functional', 'Analytics'],
      [QuickOption.Advertising]: [
        'Essential',
        'Functional',
        'Analytics',
        'Advertising',
      ],
    };

    Object.keys(newConsent.purposes).forEach((purpose) => {
      newConsent.purposes[purpose] =
        consentsBySelectedQuickOption[selectedQuickOption].includes(purpose);
    });

    airgap.setConsent(event, newConsent.purposes);
    handleSetViewState('close');
  };

  return (
    <div>
      <Title>{formatMessage(messages.consentTitle)}</Title>
      <div className={cx(buttonSetStyle)}>
        <Button
          primaryText={formatMessage(
            quickOptionsMessages.essentialsButtonPrimary,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.essentialsButtonSecondary,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.Essential)
          }
        />
        <Button
          primaryText={formatMessage(
            quickOptionsMessages.functionalButtonPrimary,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.functionalButtonSecondary,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.Functional)
          }
        />
        <Button
          primaryText={formatMessage(
            quickOptionsMessages.analyticsButtonPrimary,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.analyticsButtonSecondary,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.Analytics)
          }
        />
        <Button
          primaryText={formatMessage(
            quickOptionsMessages.advertisingButtonPrimary,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.advertisingButtonSecondary,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.Advertising)
          }
        />
      </div>
    </div>
  );
}
