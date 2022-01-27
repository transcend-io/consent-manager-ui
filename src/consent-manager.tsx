// external
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, render } from 'preact';

// main
import type {
  AirgapAPI,
  ConsentManagerAPI,
} from '@transcend-io/airgap.js-types';

// local
import App from './components/App';
import { logger } from './logger';
import { apiEventName } from './settings';
import { createHTMLElement } from './utils/create-html-element';

let interfaceInitialized = false;

// eslint-disable-next-line jsdoc/require-param
/**
 * Dispatcher for API events. API is called on globalThis.transcend and it triggers event listeners inside Preact
 */
// eslint-disable-next-line require-await
async function dispatchConsentManagerAPIEvent(
  element: HTMLElement,
  detail: keyof ConsentManagerAPI,
): Promise<void> {
  const event = new CustomEvent<keyof ConsentManagerAPI>(apiEventName, {
    detail,
  });
  element.dispatchEvent(event);
}

let consentManagerAPI: ConsentManagerAPI;

// eslint-disable-next-line jsdoc/require-param, jsdoc/require-returns
/**
 * Render the Preact app into a shadow DOM
 */
export const injectConsentManagerApp = (
  airgap: AirgapAPI,
): ConsentManagerAPI => {
  if (!interfaceInitialized) {
    interfaceInitialized = true;

    // The outer div to wrap the shadow root
    const consentManager = createHTMLElement('div');
    consentManager.style.position = 'fixed'; // so as not to affect position
    consentManager.style.zIndex = '83951225900329'; // high z-index to stay on top
    // 83951225900329..toString(36) === 'transcend'
    consentManager.id = 'transcend-consent-manager';

    try {
      const shadowRoot =
        consentManager?.attachShadow?.({ mode: 'closed' }) || consentManager;

      // Create an inner div for event listeners
      const appContainer = createHTMLElement('div');
      shadowRoot.appendChild(appContainer);

      // Don't inherit global styles
      const style = appContainer.appendChild(
        createHTMLElement<HTMLStyleElement>('style'),
      );

      // Append UI container to doc to activate style.sheet
      (document.documentElement || document).append(consentManager);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      style
        .sheet! // 1st rule so subsequent properties are reset
        .insertRule(':host { all: initial }');

      consentManagerAPI = {
        autoShowConsentManager: () =>
          dispatchConsentManagerAPIEvent(
            appContainer,
            'autoShowConsentManager',
          ),
        showConsentManager: () =>
          dispatchConsentManagerAPIEvent(appContainer, 'showConsentManager'),
        toggleConsentManager: () =>
          dispatchConsentManagerAPIEvent(appContainer, 'toggleConsentManager'),
        hideConsentManager: () =>
          dispatchConsentManagerAPIEvent(appContainer, 'hideConsentManager'),
      };

      // Render preact app inside the shadow DOM component
      render(<App airgap={airgap} appContainer={appContainer} />, shadowRoot);

      // Return the consent manager API
      return consentManagerAPI;
    } catch (error) {
      // Clean up
      consentManager.remove();
      interfaceInitialized = false;
      logger.error('Failed to initialize UI');
      throw error;
    }
  } else {
    // Already instantiated; return the API again
    return consentManagerAPI;
  }
};
