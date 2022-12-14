import { h, JSX } from 'preact';
import { IntlProvider as _IntlProvider } from 'react-intl';
import {
  AirgapAPI,
  ConsentManagerAPI,
  ViewState,
} from '@transcend-io/airgap.js-types';
import { getMergedConfig } from '../config';
import {
  AirgapProvider,
  ConfigProvider,
  useLanguage,
  useViewState,
  viewStateIsClosed,
} from '../hooks';
import { apiEventName, LOG_LEVELS, settings } from '../settings';
import { Main } from './Main';
import { getPrimaryRegime } from '../regimes';
import { logger } from '../logger';
import { PRIVACY_SIGNAL_NAME } from '../privacy-signals';
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';
import { EmitEventOptions } from '../types';
import { CONSENT_MANAGER_SUPPORTED_LANGUAGES } from '../i18n';

// TODO: https://transcend.height.app/T-13483
// Fix IntlProvider JSX types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IntlProvider = _IntlProvider as any;

let promptSuppressionNoticeShown = false;

/**
 * Top layer concerned with data, not presentation
 */
export function App({
  airgap,
  appContainer,
}: {
  /** The Airgap API */
  airgap: AirgapAPI;
  /** Reference to the shadow root */
  appContainer: HTMLElement;
}): JSX.Element {
  // Active privacy regime
  const privacyRegime = getPrimaryRegime(airgap.getRegimes());

  // Consent manager configuration
  const config = getMergedConfig();

  // Language setup
  const { language, handleChangeLanguage, messages } = useLanguage({
    supportedLanguages: CONSENT_MANAGER_SUPPORTED_LANGUAGES,
    translationsLocation:
      // Order of priority:
      // 1. Take airgap.js data-messages
      // 2. Take consentManagerConfig.messages
      // 3. Look for translations locally
      settings.messages || config.messages || './translations',
  });

  // Active view state based on regime and config
  const { initialViewStateByPrivacyRegime, dismissedViewState } = config;
  const initialViewState: ViewState =
    initialViewStateByPrivacyRegime[privacyRegime];
  const { viewState, firstSelectedViewState, handleSetViewState, auth } =
    useViewState({
      initialViewState,
      dismissedViewState,
    });

  // Event listener for the API
  appContainer.addEventListener(apiEventName, (event) => {
    const {
      detail: { eventType, auth, locale, ...options },
    } = event as CustomEvent<EmitEventOptions>;
    // Special case: instant do not sell view (user clicks footer and the banner is just a confirmation of their choice)
    if (
      (options.viewState === ViewState.DoNotSellDisclosure ||
        eventType === 'doNotSell') &&
      !auth
    ) {
      throw new Error(
        `${ViewState.DoNotSellDisclosure} view state can only be initialized with auth. ` +
          `Please provide the onClick event like: onClick: (event) => transcend.doNotSell(event)`,
      );
    }

    // multiple events can change the language
    if (locale) {
      handleChangeLanguage(locale);
    }

    const eventHandlerByDetail: Record<keyof ConsentManagerAPI, () => void> = {
      setActiveLocale: () => null, // handled above
      viewStates: () => null, // should not be called
      doNotSell: () =>
        handleSetViewState(
          options.viewState || ViewState.DoNotSellDisclosure,
          auth,
        ),
      showConsentManager: () =>
        handleSetViewState(options.viewState || 'open', undefined, true),
      hideConsentManager: () => handleSetViewState('close'),
      toggleConsentManager: () =>
        handleSetViewState(
          viewStateIsClosed(viewState) ? 'open' : 'close',
          undefined,
          true,
        ),
      autoShowConsentManager: () => {
        const privacySignals = airgap.getPrivacySignals();
        const regimePurposes = airgap.getRegimePurposes();
        const applicablePrivacySignals =
          // Prompt was auto-suppressed with DNT+any regime or GPC+regimes with SaleOfInfo
          (privacySignals.has('DNT') && regimePurposes.size > 0) ||
          (privacySignals.has('GPC') && regimePurposes.has('SaleOfInfo'));
        const shouldShowNotice = !airgap.getConsent().confirmed;
        if (!shouldShowNotice) {
          if (
            applicablePrivacySignals &&
            !promptSuppressionNoticeShown &&
            LOG_LEVELS.has('warn')
          ) {
            logger.warn(
              'Tracking consent auto-prompt suppressed due to supported privacy signals:',
              [...privacySignals].map((signal) =>
                // expand supported privacy signals to their full names
                PRIVACY_SIGNAL_NAME.has(signal)
                  ? PRIVACY_SIGNAL_NAME.get(signal)
                  : signal,
              ),
              // eslint-disable-next-line max-len
              '\n\nSee https://docs.transcend.io/docs/consent/configuration/configuring-the-ui#user-privacy-signal-integration for more information.',
            );
            promptSuppressionNoticeShown = true;
          }
          return;
        }
        handleSetViewState('open', undefined, true);
      },
    };

    // Trigger event handler for this event
    eventHandlerByDetail[eventType]();
  });

  return (
    <IntlProvider
      locale={language}
      messages={messages || {}}
      // messages.ts are translated in english
      defaultLocale={ConsentManagerLanguageKey.En}
    >
      <ConfigProvider newConfig={config}>
        <AirgapProvider newAirgap={airgap}>
          {/** Ensure messages are loaded before any UI is displayed */}
          {messages ? (
            <Main
              modalOpenAuth={auth}
              viewState={viewState}
              supportedLanguages={CONSENT_MANAGER_SUPPORTED_LANGUAGES}
              firstSelectedViewState={firstSelectedViewState}
              handleSetViewState={handleSetViewState}
              handleChangeLanguage={handleChangeLanguage}
            />
          ) : null}
        </AirgapProvider>
      </ConfigProvider>
    </IntlProvider>
  );
}
