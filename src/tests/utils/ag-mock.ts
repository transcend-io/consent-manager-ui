import {
  ConsentOptions,
  TrackingConsent,
  TrackingConsentDetails,
  TrackingPurposesTypes,
} from '@transcend-io/airgap.js-types';
import { testWindow } from './render';

export const init = (purposeTypes: TrackingPurposesTypes): void => {
  const DEFAULT_CONSENT = {
    confirmed: false,
    prompted: false,
    timestamp: '',
    purposes: Object.fromEntries(
      Object.entries(purposeTypes).map(([key, purpose]) => [
        key,
        purpose.defaultConsent,
      ]),
    ) as TrackingConsent,
  };
  let consentCache: TrackingConsentDetails = JSON.parse(
    JSON.stringify(DEFAULT_CONSENT),
  );

  const getPurposeTypes = (): TrackingPurposesTypes => purposeTypes;
  const optIn = (): void => {
    const optedInEntries = Object.entries(consentCache.purposes).map(
      ([key]) => [key, true],
    );
    consentCache.purposes = Object.fromEntries(optedInEntries);
    consentCache.confirmed = true;
  };
  const optOut = (): void => {
    const optedOutEntries = Object.entries(consentCache.purposes).map(
      ([key]) => [key, false],
    );
    consentCache.purposes = Object.fromEntries(optedOutEntries);
    consentCache.confirmed = true;
  };
  const setConsent = (
    event: Event,
    purposes: TrackingConsent,
    options: ConsentOptions,
  ): void => {
    consentCache = {
      ...consentCache,
      confirmed: true,
      ...options,
      purposes: {
        ...consentCache.purposes,
        ...purposes,
      },
    } as TrackingConsentDetails;
  };
  const getConsent = (): TrackingConsentDetails => ({
    ...consentCache,
    purposes: { ...consentCache.purposes },
  });
  const getPrivacySignals = (): Set<'DNT' | 'GPC'> => new Set();
  const getRegimePurposes = (): Set<string> =>
    new Set(Object.keys(purposeTypes));
  const reset = (): void => {
    consentCache = JSON.parse(JSON.stringify(DEFAULT_CONSENT));
  };

  testWindow.airgap = {
    getPurposeTypes,
    optIn,
    optOut,
    setConsent,
    getConsent,
    getPrivacySignals,
    getRegimePurposes,
    reset,
  };
};
