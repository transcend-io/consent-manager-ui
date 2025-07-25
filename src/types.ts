import type {
  TrackingPurpose,
  ViewState,
  AirgapAuth,
  AirgapAuthMap,
  ConsentManagerConfig,
} from '@transcend-io/airgap.js-types';
import { ConsentManagerSupportedTranslationValue } from '@transcend-io/internationalization';
import { ObjByString } from '@transcend-io/type-utils';

/**
 * Disclosure of a tracking purpose
 */
export interface Disclosure {
  /** Tracking purpose name */
  name: string;
  /** Tracking purpose description (used in Consent Manager UI) */
  description: string;
}

/**
 * Mapping between a disclosure and the purpose it's describing
 */
export type DisclosureMap = {
  /** The purpose for tracking and the disclosure of it */
  [purpose in TrackingPurpose]: Disclosure;
};

/**
 * For each tracking purpose, whether the toggle button is on/off (not enforced until they hit save)
 */
export type ConsentSelection = {
  [purpose in TrackingPurpose]: boolean;
};

/**
 * The language locale
 */
export interface Language {
  /** The first sub-tag, like "en" */
  primaryLanguage: string;
  /** The whole language tag, like en-US or fr-FR */
  extendedLanguage: string;
}

/**
 * Possible requests for the next view state
 */
export type RequestedViewState = ViewState | 'back' | 'open' | 'close';

/**
 * Handler for setting next view state
 */
export type HandleSetViewState = (
  requestedViewState: RequestedViewState,
  auth?: AirgapAuth,
  resetFirstSelectedViewState?: boolean,
) => void;

/**
 * Handler for setting auth
 */
export type HandleSetAuth = (key: AirgapAuthMap['key']) => void;

/**
 * Handler for setting user language
 */
export type HandleSetLanguage = (
  language: ConsentManagerSupportedTranslationValue,
) => void;

/**
 * Handler for changing UI variables
 */
export type HandleChangeUiVariables = (variables: ObjByString) => void;

/**
 * Handler for changing the privacy policy link
 */
export type HandleChangePrivacyPolicy = (privacyPolicyLink: string) => void;

export interface MergedConsentManagerConfig {
  /** Merged config */
  config: ConsentManagerConfig;
  /** Languages split out separately for type-safety and preserving raw value */
  supportedLanguages: ConsentManagerSupportedTranslationValue[];
}
