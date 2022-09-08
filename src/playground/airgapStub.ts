/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */

import { AirgapAPI } from '@transcend-io/airgap.js-types';

export const airgapStub: AirgapAPI = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ready: (callback) => callback(airgapStub),
  /** Queue of callbacks to dispatch once airgap is ready */
  readyQueue: [],
  /** Enqueue cross-domain data sync across all airgap bundle domains */
  sync: () => Promise.resolve(),
  /** Resolve airgap request overrides for a URL */
  resolve: () => 'Stub',
  /** Get tracking consent */
  getConsent: () => ({
    purposes: {
      Essential: true,
    },
    confirmed: true,
    timestamp: 'string',
  }),
  /** Set tracking consent */
  setConsent: (auth, consent) => true,
  /** Consents the user to all tracking purposes (requires recent UI interaction) */
  optIn: (auth) => true,
  /** Revokes consent for all tracking purposes (requires recent UI interaction) */
  optOut: (auth) => true,
  /** Returns true if the user is fully-opted in to all first-order tracking purposes */
  isOptedIn: () => true,
  /** Returns true if the user is fully-opted out to all first-order tracking purposes */
  isOptedOut: () => true,
  /** Resolve regime tracking purposes. If no regimes are provided, then the user's detected regimes are used */
  getRegimePurposes: (regimes) => new Set(['Essential']),
  /** Get initialized tracking purposes config */
  getPurposeTypes: () => ({
    Advertising: {
      defaultConsent: 'Auto',
      configurable: true,
      essential: false,
      name: 'Advertising',
      description: 'Helps us and others serve ads relevant to you.',
      showInConsentManager: true,
      trackingType: 'Advertising',
    },
    Functional: {
      defaultConsent: 'Auto',
      configurable: true,
      essential: false,
      name: 'Functional',
      description: 'Personalization, autofilled forms, etc.',
      showInConsentManager: true,
      trackingType: 'Functional',
    },
    SaleOfInfo: {
      defaultConsent: 'Auto',
      configurable: true,
      essential: false,
      name: 'SaleOfInfo',
      description: 'Sale of personal information.',
      showInConsentManager: true,
      trackingType: 'SaleOfInfo',
    },
    Analytics: {
      defaultConsent: 'Auto',
      configurable: true,
      essential: false,
      name: 'Analytics',
      description: 'Help us learn how our site is used and how it performs.',
      showInConsentManager: true,
      trackingType: 'Analytics',
    },
    Essential: {
      name: 'Essential',
      description: '',
      defaultConsent: true,
      configurable: false,
      essential: true,
      showInConsentManager: false,
    },
    Unknown: {
      name: 'Unknown',
      description: '',
      defaultConsent: false,
      configurable: false,
      essential: false,
      showInConsentManager: false,
    },
  }),
  /** Clear airgap queue & caches. Returns `true` on success. */
  clear: (auth) => true,
  /** Reset airgap queue and consent. Returns `true` on success. */
  reset: (auth, autoReload) => true,
  /** Get a list of legal regimes that are potentially applicable to the user */
  getRegimes: () => new Set(['GDPR']),
  /** Get a list of detected active user agent privacy signals */
  getPrivacySignals: () => new Set(['GPC']),
  /** airgap.js version number */
  version: '0',
  addEventListener: (type, callback, options) => null,
  dispatchEvent: (event) => true,
  removeEventListener: () => null,
};

/* eslint-enable jsdoc/require-returns */
/* eslint-enable jsdoc/require-param */
/* eslint-enable no-unused-vars */
/* eslint-enable @typescript-eslint/no-unused-vars */
