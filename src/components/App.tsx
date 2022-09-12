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
import { EmitEventOptions } from '../types';

// TODO: https://transcend.height.app/T-13483
// Fix IntlProvider JSX types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IntlProvider = _IntlProvider as any;

let promptSuppressionNoticeShown = false;

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
  const { viewState, firstSelectedViewState, handleSetViewState, auth } =
    useViewState({
      initialViewState,
      dismissedViewState,
    });

  // Event listener for the API
  appContainer.addEventListener(apiEventName, (event) => {
    const {
      detail: { eventType, auth, ...options },
    } = event as CustomEvent<EmitEventOptions>;
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

    const eventHandlerByDetail: Record<keyof ConsentManagerAPI, () => void> = {
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
        handleSetViewState(viewStateIsClosed(viewState) ? 'open' : 'close'),
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
        handleSetViewState('open');
      },
    };

    // Trigger event handler for this event
    eventHandlerByDetail[eventType]();
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
              modalOpenAuth={auth}
              viewState={viewState}
              firstSelectedViewState={firstSelectedViewState}
              handleSetViewState={handleSetViewState}
              handleChangeLanguage={handleChangeLanguage}
            />
          </AirgapProvider>
        </ConfigProvider>
      </EmotionProvider>
    </IntlProvider>
  );
}
