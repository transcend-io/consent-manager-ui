import {
  PrivacyRegime,
  PrivacyRegimeEnum,
} from '@transcend-io/airgap.js-types';

// Making this an Object rather than an Array is a TypeScript hack to ensure we have all PrivacyRegimes included
const regimePrecedence: Record<PrivacyRegime, number> = {
  GDPR: 0,
  LGPD: 1,
  CPRA: 2,
  CDPA: 3,
  CPA: 4,
  Unknown: 5,
};

/**
 * Returns the PrivacyRegime with the highest precedence
 *
 * @param regimes - PrivacyRegimes to compare
 * @returns Highest precedence PrivacyRegime (or Unknown if no PrivacyRegimes match)
 */
export const getPrimaryRegime = (regimes: Set<PrivacyRegime>): PrivacyRegime =>
  Object.entries(regimePrecedence)
    .sort((a, b) => a[1] - b[1])
    .map(([regime]) => regime as PrivacyRegimeEnum)
    .find((regime) => regimes.has(regime)) || 'Unknown';
