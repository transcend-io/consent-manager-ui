import type { TrackingPurposesTypes } from '@transcend-io/airgap.js-types';

export const defaultTrackingPurposes: TrackingPurposesTypes = {
  Advertising: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Advertising',
    description: 'Helps us and others serve ads relevant to you.',
    showInConsentManager: true,
    trackingType: 'Advertising',
  },
  Functional: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Functional',
    description: 'Personalization, autofilled forms, etc.',
    showInConsentManager: true,
    trackingType: 'Functional',
  },
  SaleOfInfo: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'SaleOfInfo',
    description: 'Sale of personal information.',
    showInConsentManager: true,
    trackingType: 'SaleOfInfo',
  },
  Analytics: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Analytics',
    description: 'Help us learn how our site is used and how it performs.',
    showInConsentManager: true,
    trackingType: 'Analytics',
  },
  Essential: {
    name: 'Essential',
    description: '',
    defaultConsent: true,
    configurable: false,
    essential: true,
    showInConsentManager: false,
  },
  Unknown: {
    name: 'Unknown',
    description: '',
    defaultConsent: false,
    configurable: false,
    essential: false,
    showInConsentManager: false,
  },
};