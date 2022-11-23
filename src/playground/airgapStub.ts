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
  resolve: (value) => value,
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
  getRegimePurposes: (regimes) =>
    regimes?.includes('GDPR') || regimes?.includes('LGPD')
      ? new Set(['Essential', 'Functional', 'Analytics', 'Advertising'])
      : regimes?.includes('CPRA') ||
        regimes?.includes('CPA') ||
        regimes?.includes('CDPA')
      ? new Set(['Essential', 'SaleOfInfo'])
      : new Set(['Essential']),
  /** Get initialized tracking purposes config */
  getPurposeTypes: () => {
    const purposeTypes = localStorage.getItem('getPurposeTypes');
    if (!purposeTypes) {
      throw new Error('Missing purpose types!');
    }
    return JSON.parse(purposeTypes);
  },
  /** Clear airgap queue & caches. Returns `true` on success. */
  clear: (auth) => true,
  /** Reset airgap queue and consent. Returns `true` on success. */
  reset: (auth, autoReload) => true,
  /** Get a list of legal regimes that are potentially applicable to the user */
  getRegimes: () => new Set(['GDPR']),
  /** Get a list of detected active user agent privacy signals */
  getPrivacySignals: () => {
    const privacySignalsString = localStorage.getItem('getPrivacySignals');
    if (!privacySignalsString) {
      throw new Error('Missing `getPrivacySignals` in localStorage!');
    }
    return new Set(JSON.parse(privacySignalsString));
  },
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
