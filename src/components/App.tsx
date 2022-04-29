// external
import { h, JSX } from 'preact';
import { IntlProvider as _IntlProvider } from 'react-intl';

// main
import {
  AirgapAPI,
  ConsentManagerAPI,
  ViewState,
} from '@transcend-io/airgap.js-types';

// global
import { getMergedConfig } from '../config';
import {
  AirgapProvider,
  ConfigProvider,
  EmotionProvider,
  useLanguage,
  useViewState,
  viewStateIsClosed,
} from '../hooks';
import { apiEventName, LOG_LEVELS } from '../settings';
import { CONSENT_MANAGER_TRANSLATIONS } from '../translations';

// local
import Main from './Main';
import { getPrimaryRegime } from '../regimes';
import { logger } from '../logger';
import { PRIVACY_SIGNAL_NAME } from '../privacy-signals';
import { getConsentSelections } from '../consent-selections';

// TODO: https://transcend.height.app/T-13483
// Fix IntlProvider JSX types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IntlProvider = _IntlProvider as any;

/**
 * Top layer concerned with data, not presentation
 */
export default function App({
  airgap,
  appContainer,
}: {
  /** The Airgap API */
  airgap: AirgapAPI;
  /** Reference to the shadow root */
  appContainer: HTMLElement;
}): JSX.Element {
  // Hooks
  const privacyRegime = getPrimaryRegime(airgap.getRegimes());
  const { language, handleChangeLanguage } = useLanguage();

  // Config loader + dependent hook
  const config = getMergedConfig();
  const { initialViewStateByPrivacyRegime, dismissedViewState } = config;
  const initialViewState: ViewState =
    initialViewStateByPrivacyRegime[privacyRegime];
  const { viewState, handleSetViewState } = useViewState({
    initialViewState,
    dismissedViewState,
  });
  // Set whether we're in opt-in consent mode or give-notice mode
  const mode =
    initialViewState === ViewState.NoticeAndDoNotSell ? 'NOTICE' : 'CONSENT';

  // Event listener for the API
  appContainer.addEventListener(apiEventName, (event) => {
    const { detail } = event as CustomEvent<keyof ConsentManagerAPI>;
    const eventHandlerByDetail: Record<keyof ConsentManagerAPI, () => void> = {
      showConsentManager: () => handleSetViewState('open'),
      hideConsentManager: () => handleSetViewState('close'),
      toggleConsentManager: () =>
        handleSetViewState(viewStateIsClosed(viewState) ? 'open' : 'close'),
      autoShowConsentManager: () => {
        const privacySignals = airgap.getPrivacySignals();
        let applicablePrivacySignals = privacySignals.has('DNT');
        // Only suppress auto-prompt with GPC if SaleOfInfo is the only displayed tracking purpose
        // This applies to CPRA-like regimes
        if (!applicablePrivacySignals && privacySignals.has('GPC')) {
          const consentSelections = Object.keys(getConsentSelections(airgap));
          if (
            consentSelections.length === 1 &&
            consentSelections[0] === 'SaleOfInfo'
          ) {
            applicablePrivacySignals = true;
          }
        }
        const shouldShowNotice =
          !airgap.getConsent().confirmed && !applicablePrivacySignals;
        if (!shouldShowNotice) {
          if (applicablePrivacySignals && LOG_LEVELS.has('warn')) {
            logger.warn(
              'Tracking consent auto-prompt suppressed due to supported privacy signals:',
              [...privacySignals].map((signal) =>
                // expand supported privacy signals to their full names
                PRIVACY_SIGNAL_NAME.has(signal)
                  ? PRIVACY_SIGNAL_NAME.get(signal)
                  : signal,
              ),
            );
          }
          return;
        }
        handleSetViewState('open');
      },
    };

    // Trigger event handler for this event
    eventHandlerByDetail[detail]();
  });

  return (
    <IntlProvider
      locale={language}
      messages={CONSENT_MANAGER_TRANSLATIONS[language]}
      defaultLocale="en"
    >
      <EmotionProvider>
        <ConfigProvider newConfig={config}>
          <AirgapProvider newAirgap={airgap}>
            <Main
              viewState={viewState}
              mode={mode}
              handleSetViewState={handleSetViewState}
              handleChangeLanguage={handleChangeLanguage}
            />
          </AirgapProvider>
        </ConfigProvider>
      </EmotionProvider>
    </IntlProvider>
  );
}
