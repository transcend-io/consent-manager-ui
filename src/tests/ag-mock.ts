import {
  AirgapAPI,
  ConsentOptions,
  TrackingConsent,
  TrackingConsentDetails,
  TrackingPurposesTypes
} from '@transcend-io/airgap.js-types';

export const init = (purposeTypes: TrackingPurposesTypes): void => {
  let consentCache: TrackingConsentDetails = {
    confirmed: false,
    prompted: false,
    timestamp: '',
    purposes: Object.fromEntries(
      Object.entries(purposeTypes)
        .map(([key, purpose]) => ([key, purpose.defaultConsent]))
    ) as TrackingConsent
  }

  const getPurposeTypes = (): TrackingPurposesTypes => purposeTypes;
  const optIn = (): void => {
    const optedInEntries = Object.entries(consentCache.purposes).map(([key]) => ([key, true]))
    consentCache.purposes = Object.fromEntries(optedInEntries)
  }
  const optOut = (): void => {
    const optedOutEntries = Object.entries(consentCache.purposes).map(([key]) => ([key, false]))
    consentCache.purposes = Object.fromEntries(optedOutEntries)
  }
  const setConsent = (event: Event, purposes: TrackingConsent, options: ConsentOptions): void => {
    consentCache = {
      ...consentCache,
      ...options,
      purposes: {
        ...consentCache.purposes,
        ...purposes
      }
    } as TrackingConsentDetails
  }
  const getConsent = (): TrackingConsentDetails => ({
      ...consentCache,
      purposes: { ...consentCache.purposes }
    });
  const getPrivacySignals = (): Set<"DNT" | "GPC"> => new Set()
  const getRegimePurposes = (): Set<string> => new Set(Object.keys(purposeTypes));

  window.airgap = {
    getPurposeTypes,
    optIn,
    optOut,
    setConsent,
    getConsent,
    getPrivacySignals,
    getRegimePurposes,
  } as unknown as AirgapAPI
}
