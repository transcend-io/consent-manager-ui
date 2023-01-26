import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { CONSENT_OPTIONS } from '../constants';
import { useAirgap } from '../hooks';
import { messages, quickOptionsMessages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * The possible quick options
 */
enum QuickOption {
  Essential,
  Functional,
  Analytics,
  Advertising,
}

/**
 * A set of buttons to choose a set of predefined options
 */
export function QuickOptions({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const { airgap } = useAirgap();

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

    airgap.setConsent(event, newConsent.purposes, CONSENT_OPTIONS);
    handleSetViewState('close');
  };

  return (
    <div>
      <p className="text-title text-title-center">
        {formatMessage(messages.consentTitle)}
      </p>
      <div className="column-content">
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
