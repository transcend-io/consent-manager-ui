import { h, JSX } from 'preact';
import { IntlProvider as _IntlProvider } from 'react-intl';
import type {
  AirgapAPI,
  ConsentManagerAPI,
} from '@transcend-io/airgap.js-types';
import { AirgapProvider, useLanguage, useViewState } from '../hooks';
import { settings } from '../settings';
import { Main } from './Main';
import { getPrimaryRegime } from '../regimes';

import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';

import { makeConsentManagerAPI } from '../api';
import { TranscendEventTarget } from '../event-target';
import { useState } from 'preact/hooks';
import { MergedConsentManagerConfig } from '../types';

// TODO: https://transcend.height.app/T-13483
// Fix IntlProvider JSX types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IntlProvider = _IntlProvider as any;

// Create `transcend` eventTarget on the global scope so this isn't dereferenced on the next render of App
const eventTarget = new TranscendEventTarget();

/**
 * Top layer concerned with data, not presentation
 */
export function App({
  airgap,
  callback,
  defaultConfig,
}: {
  /** The Airgap API */
  airgap: AirgapAPI;
  /** A callback which passes the consent manager API out of Preact to be exposed on `window.transcend` */
  callback: (finalizedConsentManagerAPI: ConsentManagerAPI) => void;
  /** Default consent manager configuration */
  defaultConfig: MergedConsentManagerConfig;
}): JSX.Element {
  // Consent manager configuration
  const [{ config, supportedLanguages }, setConfig] = useState(defaultConfig);

  // Get the active privacy regime
  const privacyRegime = getPrimaryRegime(airgap.getRegimes());

  // Global variables used for message templates
  const [currentVariables, handleChangeUiVariables] = useState({});

  // Get default view states
  const { initialViewStateByPrivacyRegime, dismissedViewState } = config;
  const initialViewState =
    initialViewStateByPrivacyRegime[
      privacyRegime as keyof typeof initialViewStateByPrivacyRegime
    ] || 'Hidden';

  // View state controller. Defaults based on regime and config.
  const { viewState, firstSelectedViewState, handleSetViewState, auth } =
    useViewState({
      initialViewState,
      dismissedViewState,
      eventTarget,
      savedActiveElement:
        document.activeElement instanceof HTMLElement &&
        document.activeElement !== document.body
          ? document.activeElement
          : null,
    });

  // Language setup
  const { language, handleChangeLanguage, messages, htmlTagVariables } = useLanguage({
    supportedLanguages,
    translationsLocation:
      // Order of priority:
      // 1. Take airgap.js data-messages
      // 2. Take consentManagerConfig.messages
      // 3. Look for translations locally
      settings.messages || config.messages || './translations',
  });

  // Create the `transcend` API
  const consentManagerAPI = makeConsentManagerAPI({
    eventTarget,
    viewState,
    currentVariables,
    handleChangeUiVariables,
    handleChangeLanguage,
    activeLocale: language,
    handleSetViewState,
    handleChangePrivacyPolicy: (privacyPolicyUrl) =>
      setConfig({
        supportedLanguages,
        config: {
          ...config,
          privacyPolicy: privacyPolicyUrl,
        },
      }),
    handleChangeSecondaryPolicy: (privacyPolicyUrl) =>
      setConfig({
        supportedLanguages,
        config: {
          ...config,
          secondaryPolicy: privacyPolicyUrl,
        },
      }),
    airgap,
  });

  // Send this API up and out of Preact via this callback
  callback(consentManagerAPI);

  return (
    <IntlProvider
      locale={language}
      messages={messages || {}}
      // messages.ts are translated in english
      defaultLocale={ConsentManagerLanguageKey.En}
    >
      <AirgapProvider newAirgap={airgap}>
        {/** Ensure messages are loaded before any UI is displayed */}
        {messages ? (
          <Main
            globalUiVariables={{ ...currentVariables, ...htmlTagVariables }}
            airgap={airgap}
            modalOpenAuth={auth}
            viewState={viewState}
            config={config}
            supportedLanguages={supportedLanguages}
            firstSelectedViewState={firstSelectedViewState}
            handleSetViewState={handleSetViewState}
            handleChangeLanguage={handleChangeLanguage}
          />
        ) : null}
      </AirgapProvider>
    </IntlProvider>
  );
}
