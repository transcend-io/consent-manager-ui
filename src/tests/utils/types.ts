import {
  ConsentOptions,
  TrackingConsent,
  TrackingConsentDetails,
  TrackingPurposesTypes
} from '@transcend-io/airgap.js-types';
import { TranslatedMessages } from '@transcend-io/internationalization';

export interface TestWindowBase extends Window {
  /** Jest setup variables */
  JEST_SETUP_VARS: {
    /** Cached english messages read from en.json */
    messages: TranslatedMessages
  } & Record<string, unknown>;
}

/** Window type for jest testing extending the test window base type. This is necessary bc the airgap types are incompatible */
export type TestWindow = Omit<TestWindowBase, 'airgap'> & {
  /** mock ag object */
  airgap: {
    /** mock getPurposeTypes fxn */
    getPurposeTypes: () => TrackingPurposesTypes
    /** mock optIn fxn */
    optIn: () => void
    /** mock optOut fxn */
    optOut: () => void
    /** mock setConsent fxn */
    setConsent: (event: Event, purposes: TrackingConsent, options: ConsentOptions) => void
    /** mock getConsent fxn */
    getConsent: () => TrackingConsentDetails
    /** mock getPrivacySignals fxn */
    getPrivacySignals: () => Set<"DNT" | "GPC">
    /** mock getRegimePurposes fxn */
    getRegimePurposes: () => Set<string>
    /** mock reset fxn */
    reset: () => void
  }
}
