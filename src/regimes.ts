import type { PrivacyRegime } from '@transcend-io/airgap.js-types';
import { settings } from './settings';

const { regimePrecedence = 'GDPR;LGPD;CPRA;CDPA;CPA;Unknown' } = settings;

// Making this an Object rather than an Array is a TypeScript hack to ensure we have all PrivacyRegimes included
const orderedRegimes: PrivacyRegime[] = regimePrecedence.split(/\s*;\s*/);

/**
 * Returns the PrivacyRegime with the highest precedence
 *
 * @param regimes - PrivacyRegimes to compare
 * @returns Highest precedence PrivacyRegime (or Unknown if no PrivacyRegimes match)
 */
export const getPrimaryRegime = (regimes: Set<PrivacyRegime>): PrivacyRegime =>
  orderedRegimes.find((regime) => regimes.has(regime)) || 'Unknown';
