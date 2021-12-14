// external
import { h, JSX } from 'preact';
import { IntlProvider } from 'react-intl';

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
  useRegime,
  useViewState,
  viewStateIsClosed,
} from '../hooks';
import { apiEventName } from '../settings';
import { CONSENT_MANAGER_TRANSLATIONS } from '../translations';

// local
import Main from './Main';

/**
 * Top layer concerned with data, not presentation
 *
 * @param root0
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
  const privacyRegime = useRegime(airgap);
  const { language, handleChangeLanguage } = useLanguage();

  // Config loader + dependent hook
  const config = getMergedConfig();
  const { initialViewStateByPrivacyRegime, dismissedViewState } = config;
  const initialViewState: ViewState =
    initialViewStateByPrivacyRegime[privacyRegime];
  const { viewState, handleSetViewState, wasDismissed } = useViewState({
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
      autoShowConsentManager: () => !wasDismissed && handleSetViewState('open'),
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
