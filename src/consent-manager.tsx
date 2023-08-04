import { h, render } from 'preact';
import type {
  AirgapAPI,
  ConsentManagerAPI,
} from '@transcend-io/airgap.js-types';
import { App } from './components/App';
import { logger } from './logger';
import { createHTMLElement } from './utils/create-html-element';

// The `transcend` API: methods which we'll create inside Preact and pass back out here via callback
let consentManagerAPI: ConsentManagerAPI | null = null;

// The Preact app container, inside the shadow DOM
let appContainer: HTMLElement;
export const getAppContainer = (): HTMLElement | undefined => appContainer;

/**
 * Render the Preact app into a shadow DOM
 */
export const injectConsentManagerApp = async (
  airgap: AirgapAPI,
): Promise<ConsentManagerAPI> => {
  // The interface hasn't initialized yet
  if (consentManagerAPI === null) {
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
      appContainer ??= createHTMLElement('div');
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

      // Wait for the instantiated Consent Manager API from Preact
      consentManagerAPI = await new Promise<ConsentManagerAPI>((resolve) => {
        // Render Preact app inside the shadow DOM component
        render(
          <App
            airgap={airgap}
            callback={(finalizedConsentManagerAPI: ConsentManagerAPI): void => {
              resolve(finalizedConsentManagerAPI);
            }}
          />,
          appContainer,
        );
      });

      if (consentManagerAPI === null) {
        throw new Error('Expected Consent Manager API to have initialized.');
      }

      // Return the consent manager API, now that it's been created in Preact and set in the App render callback
      return consentManagerAPI;
    } catch (error) {
      // Clean up
      consentManager.remove();
      logger.error('Failed to initialize UI');
      throw error;
    }
  } else {
    // Already instantiated; return the API again
    return consentManagerAPI;
  }
};
