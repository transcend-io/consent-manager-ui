import { defineMessages } from '@transcend-io/internationalization';

export const messages = defineMessages('ui.src.messages', {
  consentTitle: {
    defaultMessage: 'What can we use data for?',
    description:
      'The title displayed when asking the user for specific opt out/in preferences.',
  },
  consentTitleAcceptAll: {
    defaultMessage: 'We use cookies',
    description:
      'The title displayed when asking the user to accept all data processing.',
  },
  acceptAllDescription: {
    defaultMessage:
      // eslint-disable-next-line max-len
      'By clicking “Accept all”, you agree to the storing of cookies on your device for functional, analytics, and advertising purposes.',
    description:
      'The description displayed when asking the user to accept all data processing.',
  },
  consentTitlePrivacyPolicyNotice: {
    defaultMessage: 'Our Privacy Policy Has Changed',
    description: 'The title displayed for the PrivacyPolicyNotice banner.',
  },
  privacyPolicyNoticeDescription: {
    defaultMessage:
      "We've updated your privacy policy. Click the link below to learn more about how we use your personal information.",
    description: 'The title displayed for the PrivacyPolicyNotice banner.',
  },
  consentTitleDoNotSellExplainer: {
    defaultMessage: 'Do Not Sell or Share My Personal Information',
    description: 'The title displayed for the DoNotSellExplainer banner.',
  },
  consentTitleAcceptOrRejectAnalytics: {
    defaultMessage: 'This website uses analytics',
    description: 'The title displayed for the AcceptOrRejectAnalytics banner.',
  },
  acceptAnalytics: {
    defaultMessage: 'Okay',
    description:
      'The affirmative response for opting into analytics in the "AcceptOrRejectAnalytics" view state.',
  },
  rejectAnalytics: {
    defaultMessage: `Do not track`,
    description:
      'The negative response for opting out of analytics in the "AcceptOrRejectAnalytics" view state.',
  },
  acceptOrRejectAnalyticsDescription: {
    defaultMessage:
      'By clicking "Okay", you agree to the usage of your sensitive information for analytics purposes.',
    description:
      'The description displayed for the AcceptOrRejectAnalytics banner.',
  },
  privacyPolicyNoticeButton: {
    defaultMessage: 'Okay',
    description: 'Button to dismiss privacy policy notice.',
  },
  doNotSellOptedOut: {
    defaultMessage: `Currently opted out.`,
    description:
      'Explainer text in DoNotSellExplainer banner when opted out of sale of data.',
  },
  close: {
    defaultMessage: 'Dismiss',
    description: 'A button to close the modal',
  },
  doNotSellOptedIn: {
    defaultMessage: `Currently opted in.`,
    description:
      'Explainer text in DoNotSellExplainer banner when opted in to sale of data.',
  },
  doNotSellDescription: {
    /* eslint-disable max-len */
    defaultMessage: `<p>We do not disclose your personal information to third parties in exchange for monetary consideration. In some instances, however, we may disclose your personal information to third parties in exchange for other valuable consideration, such as to enhance our product offerings, offer display advertisements, and in other ways which you can read about in our Privacy Statement.</p>
    <p>By opting out below, we will not disclose your personal information to third parties in exchange for valuable consideration.</p>
    <p>Please note that by opting out of these types of disclosures, you may limit our ability to customize your experience with content that may be of interest to you.</p>
    <p>If you have an account with us, sign in to persist your opt-out.</p>
    <p>If you do not have an account, you may opt-out of the disclosure of your personal information to third parties for valuable consideration (e.g., information stored in cookies) from this web browser below.</p>`,
    /* eslint-enable max-len */
    description: 'The description text for the the DoNotSellExplainer banner.',
  },
  noticeTitle: {
    defaultMessage: 'This website processes personal data',
    description: 'The Do Not Sell/Share notice title.',
  },
  collapsedLabel: {
    defaultMessage: 'Privacy Settings',
    description:
      'The title displayed in the collapsed version of the consent manager.',
  },
  acceptAllButtonPrimary: {
    defaultMessage: 'Accept all',
    description: 'Button text for accepting all trackers.',
  },
  rejectAllButtonPrimary: {
    defaultMessage: 'Reject all',
    description: 'Button text for rejecting all trackers.',
  },
});

export const quickOptionsMessages = defineMessages('ui.src.quickOptions', {
  essentialsButtonPrimary: {
    defaultMessage: 'Only Essentials',
    description:
      'Primary button text for selecting only essential data flows/cookies.',
  },
  essentialsButtonSecondary: {
    defaultMessage: 'required to operate',
    description:
      'Secondary button text for selecting only essential data flows/cookies.',
  },
  functionalButtonPrimary: {
    defaultMessage: 'Functional',
    description:
      'Primary button text for selecting functional and essential data flows/cookies.',
  },
  functionalButtonSecondary: {
    defaultMessage: 'extra site features',
    description:
      'Secondary button text for selecting functional and essential data flows/cookies.',
  },
  functionalAnalyticsButtonPrimary: {
    defaultMessage: 'Analytics',
    description:
      'Primary button text for selecting functional, analytics, and essential data flows/cookies.',
  },
  functionalAnalyticsButtonSecondary: {
    defaultMessage: 'extra site features',
    description:
      'Secondary button text for selecting functional, analytics, and essential data flows/cookies.',
  },
  analyticsButtonPrimary: {
    defaultMessage: 'Analytics',
    description:
      'Primary button text for selecting functional, essential, and analytics data flows/cookies.',
  },
  analyticsButtonSecondary: {
    defaultMessage: 'helps us improve',
    description:
      'Secondary button text for selecting functional, essential, and analytics data flows/cookies.',
  },
  advertisingButtonPrimary: {
    defaultMessage: 'Ads and Analytics',
    description:
      'Primary button text for selecting functional, essential, analytics and advertising data flows/cookies.',
  },
  advertisingButtonSecondary: {
    defaultMessage: 'helps us personalize ads',
    description:
      'Secondary button text for selecting functional, essential, analytics and advertising data flows/cookies.',
  },
});

export const noticeAndDoNotSellMessages = defineMessages(
  'ui.src.noticeAndDoNotSell',
  {
    confirmButtonPrimary: {
      defaultMessage: 'Okay',
      description: 'OK button text for the Do Not Sell/Share experience.',
    },
    doNotSellPrimary: {
      defaultMessage: 'Do Not Sell My Personal Information',
      description:
        'Do Not Sell notice in the footer of the Do Not Sell/Share experience.',
    },
    doNotSellLabel: {
      defaultMessage: 'Opt out of the sale of your personal information',
      description:
        'Hover/alt text for Do Not Sell notice in footer of the Do Not Sell/Share experience.',
    },
    doNotSellHonored: {
      defaultMessage: 'Your opt-out request has been honored.',
      description:
        'Title message for acknowledging do not sell preference has ben honored through click.',
    },
    doNotSellHonoredDescription: {
      defaultMessage:
        // eslint-disable-next-line max-len
        "We've received your request for this device or browser, and we will no longer sell or share your data with third parties. Learn more about our data practices in our privacy policy.",
      description:
        'Description message for acknowledging do not sell preference has ben honored through click.',
    },
    doNotSellHonoredGpc: {
      defaultMessage: 'Opt-out preference signal honored.',
      description:
        'Title message for acknowledging do not sell preference has ben honored through GPC.',
    },
  },
);

export const bottomMenuMessages = defineMessages('ui.src.bottomMenu', {
  moreChoicesButtonPrimary: {
    defaultMessage: 'More choices',
    description: 'Text for selecting specific more opt out choices.',
  },
  moreChoicesButtonLabel: {
    defaultMessage: 'Click to show more choices',
    description: 'Hover/alt text for selecting specific privacy choices.',
  },
  simplerChoicesButtonPrimary: {
    defaultMessage: 'Simpler choices',
    description: 'Text for selecting simpler opt out choices.',
  },
  simplerChoicesButtonLabel: {
    defaultMessage: 'Click to show simpler choices',
    description: 'Hover/alt text for selecting simpler opt out choices.',
  },
  showPolicyButtonPrimary: {
    defaultMessage: 'See Our Privacy Policy',
    description: 'Text for linking out to privacy policy.',
  },
  showPolicyButtonLabel: {
    defaultMessage: 'Visit our privacy policy',
    description: 'Hover/alt for linking out to privacy policy.',
  },
});

export const completeOptionsMessages = defineMessages(
  'ui.src.completeOptions',
  {
    essentialLabel: {
      defaultMessage: 'Essential purposes',
      description: 'Text for essential purposes.',
    },
    functionalLabel: {
      defaultMessage: 'Functionality',
      description: 'Text for functional purposes.',
    },
    analyticsLabel: {
      defaultMessage: 'Analytics',
      description: 'Text for analytics purposes.',
    },
    advertisingLabel: {
      defaultMessage: 'Advertising',
      description: 'Text for advertising purposes.',
    },
    saleOfInfoLabel: {
      defaultMessage: 'Sale of personal information',
      description: 'Text for sale of information purposes.',
    },
    saveButtonPrimary: {
      defaultMessage: 'Confirm',
      description: 'Confirm button text.',
    },
    essentialAriaLabel: {
      defaultMessage: 'Essential data collection cannot be turned off.',
      description: 'Hover/alt text for disabled essential purposes.',
    },
    toggleDisable: {
      defaultMessage: 'Click to disable collection of data for this purpose',
      description:
        'Hover/alt text for disabled opt in/opt out checkboxes when user is opted in.',
    },
    toggleEnable: {
      defaultMessage: 'Click to enable collection of data for this purpose',
      description:
        'Hover/alt text for disabled opt in/opt out checkboxes when user is opted out.',
    },
    globalPrivacySignal: {
      defaultMessage:
        "Set automatically by your browser's Global Privacy Control signal.",
      description:
        'Text to display when Global Privacy Control (GPC) is respected.',
    },
  },
);
