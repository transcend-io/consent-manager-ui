/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */

import { AirgapAPI } from '@transcend-io/airgap.js-types';
import { getPrivacySignalsFromLocalStorage } from './Environment';
import { appendConsentLog } from './helpers/consentLog';

const getPurposeTypes: AirgapAPI['getPurposeTypes'] = () => {
  const purposeTypes = localStorage.getItem('getPurposeTypes');
  if (!purposeTypes) {
    throw new Error('Missing purpose types!');
  }
  return JSON.parse(purposeTypes);
};

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
  getConsent: () => {
    const currentConsent = localStorage.getItem('currentConsent');
    if (currentConsent) {
      return JSON.parse(currentConsent);
    }

    const purposeTypes = getPurposeTypes();
    const purposes: Record<string, boolean> = {};
    Object.keys(purposeTypes).forEach((purpose) => {
      purposes[purpose] = true;
    });
    return {
      purposes,
      confirmed: true,
      timestamp: new Date().toISOString(),
    };
  },
  /** Set tracking consent */
  setConsent: (auth, consent) => {
    appendConsentLog(
      `airgap.setConsent(auth, ${JSON.stringify(consent, null, 2)})`,
    );
    return true;
  },
  /** Consents the user to all tracking purposes (requires recent UI interaction) */
  optIn: (auth) => {
    appendConsentLog(`airgap.optIn(auth)`);
    return true;
  },
  /** Revokes consent for all tracking purposes (requires recent UI interaction) */
  optOut: (auth) => {
    appendConsentLog(`airgap.optOut(auth)`);
    return true;
  },
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
  getPurposeTypes,
  /** Clear airgap queue & caches. Returns `true` on success. */
  clear: (auth) => true,
  /** Reset airgap queue and consent. Returns `true` on success. */
  reset: (auth, autoReload) => true,
  /** Get a list of legal regimes that are potentially applicable to the user */
  getRegimes: () => new Set(['GDPR']),
  /** Get a list of detected active user agent privacy signals */
  getPrivacySignals: () => getPrivacySignalsFromLocalStorage(),
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
