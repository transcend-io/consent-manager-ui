// external
import { useEffect } from 'preact/hooks';

// main
import type {
  AirgapAPI,
  PrivacyRegime,
  PrivacyRegimeEnum,
} from '@transcend-io/airgap.js-types';

// local
import { useStickyState } from './useStickyState';

/**
 * Set the privacy regime to use
 *
 * @param airgap - the Airgap API which has the getRegimes method
 * @returns the PrivacyRegime or null if there is no applicable regime
 */
export function useRegime(airgap: AirgapAPI): PrivacyRegime {
  const [privacyRegime, setPrivacyRegime] = useStickyState<PrivacyRegimeEnum>(
    PrivacyRegimeEnum.Unknown,
    'tcmPrivacyRegime',
  );

  useEffect(() => {
    /**
     * Sets the privacy regime based on Airgap's detection. Prioritizes GDPR.
     */
    async function setRegimes(): Promise<void> {
      const regimes = await airgap.getRegimes();

      // Making this an Object rather than an Array is a TypeScript hack to ensure we have all PrivacyRegimes included
      const regimePrecedence: Record<PrivacyRegime, number> = {
        GDPR: 0,
        LGPD: 1,
        CPRA: 2,
        CDPA: 3,
        CPA: 4,
        Unknown: 5,
      };

      const regimePrecedenceOrder: PrivacyRegimeEnum[] = Object.entries(
        regimePrecedence,
      )
        .sort((a, b) => a[1] - b[1])
        .map(([regime]) => regime as PrivacyRegimeEnum);

      // Choose one regime based on our precedence order
      // eslint-disable-next-line no-restricted-syntax
      for (const regime of regimePrecedenceOrder) {
        if (regimes.has(regime)) {
          setPrivacyRegime(regime);
          break;
        }
      }
    }
    setRegimes();
  }, [airgap, setPrivacyRegime]);

  return privacyRegime;
}
