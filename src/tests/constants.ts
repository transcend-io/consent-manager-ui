export const MOCK_PURPOSES = {
  "Advertising": {
      "name": "Advertising",
      "description": "Helps us and others serve ads relevant to you.",
      "defaultConsent": true,
      "showInConsentManager": true,
      "configurable": true,
      "essential": false,
      "trackingType": "Advertising",
      // "optOutSignals": ["DNT"]
      "optOutSignals": []
  },
  "Analytics": {
      "name": "Analytics",
      "description": "Help us learn how our site is used and how it performs.",
      "defaultConsent": true,
      "showInConsentManager": true,
      "configurable": true,
      "essential": false,
      "trackingType": "Analytics",
      // "optOutSignals": ["DNT"]
      "optOutSignals": []
  },
  "CustomPurpose": {
      "name": "CustomPurpose",
      "description": "Spacey",
      "defaultConsent": true,
      "showInConsentManager": true,
      "configurable": true,
      "essential": false,
      "trackingType": "CustomPurpose",
      "optOutSignals": []
  },
  "Functional": {
      "name": "Functional",
      "description": "Personalization, autofilled forms, etc.",
      "defaultConsent": true,
      "showInConsentManager": true,
      "configurable": true,
      "essential": false,
      "trackingType": "Functional",
      // "optOutSignals": ["DNT"]
      "optOutSignals": []
  },
  "SaleOfInfo": {
      "name": "SaleOfInfo",
      "description": "Sale of personal information.",
      "defaultConsent": true,
      "showInConsentManager": true,
      "configurable": true,
      "essential": false,
      "trackingType": "SaleOfInfo",
      // "optOutSignals": ["DNT", "GPC"]
      "optOutSignals": []
  },
  "UniquePurpose": {
      "name": "UniquePurpose",
      "description": "Unique Purpose",
      "defaultConsent": true,
      "showInConsentManager": true,
      "configurable": true,
      "essential": false,
      "trackingType": "UniquePurpose",
      "optOutSignals": []
  }
} as const;