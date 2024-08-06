const MOCK_PURPOSES_BASE = {
  Advertising: {
    name: 'Advertising',
    description: 'Helps us and others serve ads relevant to you.',
    showInConsentManager: true,
    configurable: true,
    essential: false,
    trackingType: 'Advertising',
    // optOutSignals: ["DNT"]
    optOutSignals: [],
  },
  Analytics: {
    name: 'Analytics',
    description: 'Help us learn how our site is used and how it performs.',
    showInConsentManager: true,
    configurable: true,
    essential: false,
    trackingType: 'Analytics',
    // optOutSignals: ["DNT"]
    optOutSignals: [],
  },
  CustomPurpose: {
    name: 'CustomPurpose',
    description: 'Spacey',
    showInConsentManager: true,
    configurable: true,
    essential: false,
    trackingType: 'CustomPurpose',
    optOutSignals: [],
  },
  Functional: {
    name: 'Functional',
    description: 'Personalization, autofilled forms, etc.',
    showInConsentManager: true,
    configurable: true,
    essential: false,
    trackingType: 'Functional',
    // optOutSignals: ["DNT"]
    optOutSignals: [],
  },
  SaleOfInfo: {
    name: 'SaleOfInfo',
    description: 'Sale of personal information.',
    showInConsentManager: true,
    configurable: true,
    essential: false,
    trackingType: 'SaleOfInfo',
    // optOutSignals: ["DNT", "GPC"]
    optOutSignals: [],
  },
  UniquePurpose: {
    name: 'UniquePurpose',
    description: 'Unique Purpose',
    showInConsentManager: true,
    configurable: true,
    essential: false,
    trackingType: 'UniquePurpose',
    optOutSignals: [],
  },
}

export const MOCK_PURPOSES_OPTED_OUT = Object.fromEntries(
  Object.entries(MOCK_PURPOSES_BASE)
    .map(([key, purpose]) => [key, { ...purpose, defaultConsent: false }])
);

export const MOCK_PURPOSES_OPTED_IN = Object.fromEntries(
  Object.entries(MOCK_PURPOSES_BASE)
    .map(([key, purpose]) => [key, { ...purpose, defaultConsent: true }])
);
