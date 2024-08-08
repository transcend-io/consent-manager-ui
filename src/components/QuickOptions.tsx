import { ObjByString } from '@transcend-io/type-utils';
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
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global UI view state variables */
  globalUiVariables: ObjByString;
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
      <p
        id="consent-dialog-title"
        className="text-title text-title-center"
        role="heading"
      >
        {formatMessage(messages.consentTitle, globalUiVariables)}
      </p>
      <div
        role="group"
        className="column-content"
        aria-label={formatMessage(
          messages.buttonGroupAriaDescription,
          globalUiVariables,
        )}
      >
        <Button
          primaryText={formatMessage(
            quickOptionsMessages.essentialsButtonPrimary,
            globalUiVariables,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.essentialsButtonSecondary,
            globalUiVariables,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.Essential)
          }
          initialFocus
        />
        <Button
          primaryText={formatMessage(
            quickOptionsMessages.functionalButtonPrimary,
            globalUiVariables,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.functionalButtonSecondary,
            globalUiVariables,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.Functional)
          }
        />
        <Button
          primaryText={formatMessage(
            quickOptionsMessages.analyticsButtonPrimary,
            globalUiVariables,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.analyticsButtonSecondary,
            globalUiVariables,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.Analytics)
          }
        />
        <Button
          primaryText={formatMessage(
            quickOptionsMessages.advertisingButtonPrimary,
            globalUiVariables,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.advertisingButtonSecondary,
            globalUiVariables,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.Advertising)
          }
        />
      </div>
    </div>
  );
}
