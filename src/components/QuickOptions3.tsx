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
  AnalyticsFunctional,
  Advertising,
}

/**
 * A set of buttons to choose a set of predefined options
 */
export function QuickOptions3({
  handleSetViewState,
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global UI view state variables */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const { airgap, buildStrictAuth } = useAirgap();

  // Opt in to all purposes
  const handleQuickOption = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
    selectedQuickOption: QuickOption,
  ): void => {
    event.preventDefault();
    const newConsent = airgap.getConsent();

    const consentsBySelectedQuickOption: Record<QuickOption, string[]> = {
      [QuickOption.Essential]: ['Essential'],
      [QuickOption.AnalyticsFunctional]: [
        'Essential',
        'Functional',
        'Analytics',
      ],
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

    airgap.setConsent(
      buildStrictAuth({ auth: event }),
      newConsent.purposes,
      CONSENT_OPTIONS,
    );
    handleSetViewState('close');
  };

  return (
    <div>
      <p
        id="consent-dialog-title"
        role="heading"
        className="text-title text-title-center"
      >
        {formatMessage(messages.consentTitle, globalUiVariables)}
      </p>
      <div
        className="column-content"
        role="group"
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
            quickOptionsMessages.functionalAnalyticsButtonPrimary,
            globalUiVariables,
          )}
          secondaryText={formatMessage(
            quickOptionsMessages.functionalAnalyticsButtonSecondary,
            globalUiVariables,
          )}
          handleClick={(event) =>
            handleQuickOption(event, QuickOption.AnalyticsFunctional)
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
