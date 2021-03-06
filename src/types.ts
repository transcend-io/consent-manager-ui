// main
import type { TrackingPurpose, ViewState } from '@transcend-io/airgap.js-types';

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
  /** The first subtag, like "en" */
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
) => void;
