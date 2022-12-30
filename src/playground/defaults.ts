import type {
  TrackingPurposesTypes,
  ConsentManagerConfig,
} from '@transcend-io/airgap.js-types';
import { DEFAULT_VIEW_STATE_BY_PRIVACY_REGIME_COPIED } from '../config';

export const defaultConfig: ConsentManagerConfig = {
  css: './build/cm.css',
  messages: '',
  theme: {
    primaryColor: '#3333FF',
    fontColor: '#010101',
  },
  breakpoints: {
    tablet: '640px',
    desktop: '1024px',
  },
  initialViewStateByPrivacyRegime: DEFAULT_VIEW_STATE_BY_PRIVACY_REGIME_COPIED,
  privacyPolicy: 'https://example.com/privacy',
  dismissedViewState: 'Collapsed',
  secondaryPolicy: '',
};

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
