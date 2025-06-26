/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */

import type { AirgapAPI } from '@transcend-io/airgap.js-types';
import { defaultTrackingPurposes } from './defaults';
import { getPrivacySignalsFromLocalStorage } from './Environment';
import { appendConsentLog } from './helpers/consentLog';

const getPurposeTypes: AirgapAPI['getPurposeTypes'] = () => {
  const purposeTypes = localStorage.getItem('getPurposeTypes');
  if (!purposeTypes) {
    return defaultTrackingPurposes;
  }
  return JSON.parse(purposeTypes ?? {});
};

const AIRGAP_STATUS = {
  protection: false,
  csp: false,
  monitoring: false,
  telemetry: false,
};

// TODO: https://transcend.height.app/T-37618 - improve stub definition for new prototypes
export const airgapStub: AirgapAPI = {
  isAllowed: () => Promise.resolve(false),
  isCookieAllowed: () => Promise.resolve(false),
  isRequestAllowed: () => Promise.resolve(false),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPurposes: () => Promise.resolve({} as any),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRequestPurposes: () => Promise.resolve({} as any),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCookiePurposes: () => Promise.resolve({} as any),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export: () => ({}) as any,
  isConsented: () => true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overrideCookies: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watchCookies: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ready: (callback) => callback(airgapStub),
  /** Queue of callbacks to dispatch once airgap is ready */
  readyQueue: [],
  toggle: () => {
    AIRGAP_STATUS.protection = !AIRGAP_STATUS.protection;
    return true;
  },
  status: AIRGAP_STATUS,
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
  setConsent: (auth, consent = {}, options = {}) => {
    appendConsentLog(
      `airgap.setConsent(auth, ${JSON.stringify(
        consent,
        null,
        2,
      )}, ${JSON.stringify(options, null, 2)})`,
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
    regimes?.has('GDPR') || regimes?.has('LGPD')
      ? new Set(['Essential', 'Functional', 'Analytics', 'Advertising'])
      : regimes?.has('CPRA') || regimes?.has('CPA') || regimes?.has('CDPA')
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
  setPrompted: (state) => Promise.resolve(),
};

/* eslint-enable jsdoc/require-returns */
/* eslint-enable jsdoc/require-param */
/* eslint-enable no-unused-vars */
/* eslint-enable @typescript-eslint/no-unused-vars */
