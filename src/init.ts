/**
 * 1. Get Airgap (it's already initialized by this point)
 * 2. Get final config
 * 3. When Airgap is ready, inject Preact App
 * 4. Expose transcend API to interact with Preact App
 */

import type {
  AirgapAPI,
  ConsentManagerAPI,
  TranscendAPI,
} from '@transcend-io/airgap.js-types';
import { injectConsentManagerApp } from './consent-manager';
import { injectCss } from './css';
import { logger } from './logger';
import { LOG_ENABLED, LOG_LEVELS, settings } from './settings';
import { throwOutside } from './utils/throw-outside';
import { VERSION } from './constants';

// eslint-disable-next-line no-restricted-globals, @typescript-eslint/no-explicit-any
const view = self as any;

/** Pre-setup reference to window.transcend */
export const transcendInit = view.transcend;
/** Pre-setup reference to window.airgap */
export const airgapInit = view.airgap;

/** transcend.ready() queue */
let readyQueue = transcendInit?.readyQueue;
if (Array.isArray(readyQueue)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (transcendInit as any).readyQueue;
  if (LOG_ENABLED) {
    logger.log('transcend.ready() queue = [', readyQueue, ']');
  }
} else {
  readyQueue = [];
}

// Promise which resolves when airgap.js core API is ready
export const airgapPromise = new Promise<AirgapAPI>((resolve) => {
  // Stub self.airgap.ready() queue if it doesn't exist
  // eslint-disable-next-line no-restricted-globals, @typescript-eslint/no-explicit-any
  ((self as any).airgap ??= {
    readyQueue: [],
    /**
     * Airgap.js ready listener registrar
     *
     * @param callback - Callback with airgap.js API passed as its first argument
     */
    ready(callback: (airgap: AirgapAPI) => void) {
      if (this.readyQueue) {
        this.readyQueue.push(callback);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(airgapInit as any),
  }).ready(resolve); // resolve promise when ready
});

/**
 * Initialize the Consent Manager UI and Transcend API
 */
export const init = async (): Promise<void> => {
  // handle embedding constraints
  const suppressUIDueToEmbeddingConstraints =
    // eslint-disable-next-line no-restricted-globals
    settings.uiAllowInEmbeds === 'off' && self !== top;
  if (suppressUIDueToEmbeddingConstraints) {
    return;
  }
  try {
    if (LOG_ENABLED) {
      logger.tag('Transcend', () => {
        logger.groupCollapsed(`Initializing Consent Manager UI v${VERSION}`);
      });
    }

    // Wait for airgap to be ready
    const airgap = await airgapPromise;

    // Inject the consent manager app and pull out the API methods
    const consentManagerAPI: ConsentManagerAPI =
      await injectConsentManagerApp(airgap);

    // Inject CSS into the application
    // TODO: This should probably be awaited but it breaks non-stubbed airgap inits
    // https://transcend.height.app/T-35913
    injectCss(settings.css || 'cm.css');

    // Create the Transcend API
    const transcend: TranscendAPI = Object.assign(consentManagerAPI, {
      readyQueue: [],
      ...(transcendInit.xdi ? { xdi: transcendInit.xdi } : {}),
      /**
       * Transcend Consent Manager ready listener registrar
       *
       * @param callback - Callback with Transcend Consent Manager
       *                   API passed as its first argument
       */
      ready(callback: (api: TranscendAPI) => void) {
        callback(transcend);
      },
    });

    // Export the initialized API for use by customer
    view.transcend = transcend;

    /* Clean up */
    // Remove this <script> tag we're executing in
    if (document.currentScript) {
      document.currentScript.remove();
    }

    if (LOG_ENABLED) {
      logger.tag('Transcend', () => {
        logger.log('Consent Manager UI ready');
      });

      logger.groupEnd();
    }

    // Process transcend.readyQueue
    if (readyQueue) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (readyQueue as any).forEach(
        (callback: (transcend: TranscendAPI) => void) => {
          try {
            callback(transcend);
          } catch (ex) {
            throwOutside(ex);
          }
        },
      );
      readyQueue.length = 0;
    }
  } catch (err) {
    if (LOG_LEVELS.has('error')) {
      logger.error.styled('color: #686868', err);
    }
  }
};
