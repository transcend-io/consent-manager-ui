import type { AirgapAPI } from '@transcend-io/airgap.js-types';

export const arePrivacySignalsApplicable = (
  airgap: AirgapAPI,
  signals: ('GPC' | 'DNT')[],
): boolean => {
  const privacySignals = airgap.getPrivacySignals();
  const regimePurposes = airgap.getRegimePurposes();
  const consent = airgap.getConsent().purposes;
  return signals.some(
    (signal) =>
      privacySignals.has(signal) &&
      [...regimePurposes].some(
        (purpose) =>
          consent[purpose] === false &&
          airgap.getPurposeTypes()[purpose]?.optOutSignals?.includes?.(signal),
      ),
  );
};
