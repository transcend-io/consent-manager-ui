/* eslint-disable max-lines */
import { defineMessages } from '@transcend-io/internationalization';

export const messages = defineMessages('ui.src.messages', {
  consentTitle: {
    defaultMessage: 'Manage privacy preferences',
    description:
      'The title displayed when asking the user for specific opt out/in preferences.',
  },
  consentTitleToggleInfo: {
    defaultMessage: 'By checking the box, you agree to the storing of cookies on your device for the specified purpose',
    description:
      'The title displayed below ConsentTitle to clarify what checking the box means',
  },
  consentTitleAcceptAll: {
    defaultMessage: 'We use cookies',
    description:
      'The title displayed when asking the user to accept all data processing.',
  },
  completeOptionsInvertedTitle: {
    defaultMessage: 'Your Privacy Choices',
    description:
      'The title displayed in the CompleteOptionsInverted view state.',
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
    description:
      'The description displayed for the PrivacyPolicyNotice banner.',
  },
  consentTitlePrivacyPolicyNoticeWithCloseButton: {
    defaultMessage: 'Our Privacy Policy Has Changed',
    description:
      'The title displayed for the PrivacyPolicyNoticeWithCloseButton banner.',
  },
  privacyPolicyNoticeWithCloseButtonDescription: {
    defaultMessage:
      "We've updated your privacy policy. Click the link below to learn more about how we use your personal information.",
    description:
      'The description displayed for the PrivacyPolicyNoticeWithCloseButton banner.',
  },
  consentTitleDoNotSellExplainer: {
    defaultMessage: 'Your privacy choices',
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
  consentTitleAcceptOrRejectAdvertising: {
    defaultMessage: 'This website uses advertising',
    description:
      'The title displayed for the AcceptOrRejectAdvertising banner.',
  },
  acceptAdvertising: {
    defaultMessage: 'Okay',
    description:
      'The affirmative response for opting into advertising in the "AcceptOrRejectAdvertising" view state.',
  },
  rejectAdvertising: {
    defaultMessage: `Opt out of advertising`,
    description:
      'The negative response for opting out of advertising in the "AcceptOrRejectAdvertising" view state.',
  },
  acceptOrRejectAdvertisingDescription: {
    defaultMessage:
      'By clicking "Okay", you agree to the usage of your personal information for advertising purposes.',
    description:
      'The description displayed for the AcceptOrRejectAdvertising banner.',
  },
  privacyPolicyNoticeButton: {
    defaultMessage: 'Okay',
    description: 'Button to dismiss privacy policy notice.',
  },
  doNotSellOptedOut: {
    defaultMessage: `Successfully opted out.`,
    description:
      'Explainer text in DoNotSellExplainer banner when opted out of sale of data.',
  },
  close: {
    defaultMessage: 'Close consent manager',
    description: 'An accessible label for the button to close the modal',
  },
  switchLanguage: {
    defaultMessage: 'Switch language',
    description: 'An accessible label for the button to switch language',
  },
  doNotSellOptedIn: {
    defaultMessage: `Switch the toggle to opt out.`,
    description:
      'Explainer text in DoNotSellExplainer banner when opted in to sale of data.',
  },
  doNotSellDescription: {
    /* eslint-disable max-len */
    defaultMessage: `<p>We do not disclose your personal information to third parties in exchange for monetary consideration. In some instances, however, we may disclose your personal information to third parties in exchange for other valuable consideration, such as to enhance our product offerings, display online targeted advertising, and in other ways which you can read about in our Privacy Notice.</p><p>By opting out below, we will not disclose your personal information to third parties in exchange for valuable consideration.</p><p>Please note that choices related to opting out of the disclosure of your personal information to third parties for valuable consideration (e.g., information stored in cookies) are specific to the browser or device where you are making the election.</p>`,
    /* eslint-enable max-len */
    description: 'The description text for the the DoNotSellExplainer banner.',
  },
  noticeTitle: {
    defaultMessage: 'This website processes personal data',
    description: 'The Do Not Sell/Share notice title.',
  },
  saving: {
    defaultMessage: 'Saving...',
    description: 'The callback when preferences are being persisted.',
  },
  preferencesSaved: {
    defaultMessage: 'Preferences Saved!',
    description:
      'Confirmation that preferences are saved to an opted out state.',
  },
  preferencesSavedOptedIn: {
    defaultMessage: 'Preferences Saved!',
    description:
      'Confirmation that preferences are saved to an opted in state.',
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
  moreChoicesButtonPrimary: {
    defaultMessage: 'More choices',
    description:
      'Button text for redirecting the user to more granular consent choices.',
  },
  consentTitleAcceptAllRejectAllToggle: {
    defaultMessage: 'Your Privacy Choices',
    description:
      'The title displayed in the AcceptAllRejectAllToggle view state.',
  },
  acceptAllRejectAllToggleDescription: {
    defaultMessage:
      /* eslint-disable max-len */
      'By opting in below, you agree to the storing of cookies on your device for functional, analytics, and advertising purposes.',
    /* eslint-enable max-len */
    description:
      'The description text for the AcceptAllRejectAllToggle view state.',
  },
  consentTitleCompleteOptionsToggle: {
    defaultMessage: 'Privacy Settings',
    description: 'The title text for the CompleteOptionsToggles view state.',
  },
  consentTitleCompleteOptionsToggleDescription: {
    defaultMessage:
      'Below is an overview of the different technologies we use when processing your personal information.',
    description:
      'The description text for the CompleteOptionsToggles view state.',
  },
  modalAriaLabel: {
    defaultMessage: 'User data usage dialog',
    description:
      'The aria label used by screen readers for the modal. This is read when the modal is opened and focused.',
  },
  modalAriaDescription: {
    defaultMessage:
      'Please review the below information or selections regarding your user data usage.',
    description:
      'The aria description used by screen readers for the modal. This is read when the modal is opened and focused.',
  },
  acceptAllButtonAriaDescription: {
    defaultMessage: 'Accept all cookies and close dialog.',
    description:
      'The aria description read when the accept all button is focused.',
  },
  noticeButtonAriaDescription: {
    defaultMessage: 'Acknowledge and close dialog.',
    description: 'The aria description read when the ok button is focused.',
  },
  buttonGroupAriaDescription: {
    defaultMessage: 'Select consent and close dialog',
    description: 'Description for consent submission button groups.',
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

export const optOutDisclosureMessages = defineMessages(
  'ui.src.optOutDisclosure',
  {
    optOutHonored: {
      defaultMessage: 'Your opt-out request has been honored.',
      description:
        'Title message for acknowledging opt out preference has ben honored through 1-click option.',
    },
    optOutHonoredDescription: {
      defaultMessage:
        // eslint-disable-next-line max-len
        "We've received your request for this device or browser, and you have been opted out. Learn more about our data practices in our privacy policy.",
      description:
        'Description message for acknowledging opt out preference has ben honored through 1-click option.',
    },
    optOutHonoredGpc: {
      defaultMessage: 'Opt-out preference signal honored.',
      description:
        'Title message for acknowledging do not sell preference has ben honored through GPC.',
    },
  },
);

export const bottomMenuMessages = defineMessages('ui.src.bottomMenu', {
  backButtonText: {
    defaultMessage: 'Go back',
    description:
      'Hover text the back button in the footer of the consent banner language options.',
  },
  backButtonTooltip: {
    defaultMessage: 'Go back',
    description:
      'Main text for the back button in the footer of the consent banner language options.',
  },
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
  showPolicyButtonLanguageOptions: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the LanguageOptions UI.',
  },
  showPolicyButtonDoNotSellDisclosure: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the DoNotSellDisclosure UI.',
  },
  showPolicyButtonOptOutDisclosure: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in OptOutDisclosure UI.',
  },
  showPolicyButtonQuickOptions: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the QuickOptions UI.',
  },
  showPolicyButtonQuickOptions3: {
    defaultMessage: 'See our privacy notice',
    description:
      'Text for linking out to privacy policy in the QuickOptions3 UI.',
  },
  showPolicyButtonAcceptAll: {
    defaultMessage: 'See our privacy policy',
    description: 'Text for linking out to privacy policy in the AcceptAll UI.',
  },
  showPolicyButtonAcceptAllOrMoreChoices: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the AcceptAllOrMoreChoices UI.',
  },
  showPolicyButtonCompleteOptionsToggles: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the CompleteOptionsToggles UI.',
  },
  showPolicyButtonAcceptOrRejectAll: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the AcceptOrRejectAll UI.',
  },
  showPolicyButtonAcceptOrRejectAllOrMoreChoices: {
    defaultMessage: 'See our Privacy Notice',
    description:
      'Text for linking out to privacy policy in the AcceptOrRejectAllOrMoreChoices UI.',
  },
  showPolicyButtonAcceptOrRejectAnalytics: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the AcceptOrRejectAnalytics UI.',
  },
  showPolicyButtonAcceptOrRejectAdvertising: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the AcceptOrRejectAdvertising UI.',
  },
  showPolicyButtonAcceptAllRejectAllToggle: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the AcceptAllRejectAllToggle UI.',
  },
  showPolicyButtonNoticeAndDoNotSell: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the NoticeAndDoNotSell UI.',
  },
  showPolicyButtonDoNotSellExplainer: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the DoNotSellExplainer UI.',
  },
  showPolicyButtonPrivacyPolicyNotice: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the PrivacyPolicyNotice UI.',
  },
  showPolicyButtonPrivacyPolicyNoticeWithCloseButton: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the PrivacyPolicyNoticeWithCloseButton UI.',
  },
  showPolicyButtonCompleteOptions: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the CompleteOptions UI.',
  },
  showPolicyButtonCompleteOptionsInverted: {
    defaultMessage: 'See our privacy policy',
    description:
      'Text for linking out to privacy policy in the CompleteOptionsInverted UI.',
  },
  // END --- Privacy Policy Link Text, per ViewState
  showPolicyButtonLabel: {
    defaultMessage: 'Visit our privacy policy',
    description: 'Hover/alt for linking out to privacy policy.',
  },
  showSecondaryPolicyButton: {
    defaultMessage: 'Read more',
    description: 'Text for linking out to secondary policy.',
  },
  showSecondaryPolicyButtonLabel: {
    defaultMessage: 'Read more about your privacy choices',
    description: 'Hover/alt for linking out to secondary policy.',
  },
});

export const completeOptionsMessages = defineMessages(
  'ui.src.completeOptions',
  {
    essentialLabel: {
      defaultMessage: 'Essential purposes',
      description: 'Text for essential purposes in CompleteOptions view state.',
    },
    functionalLabel: {
      defaultMessage: 'Functionality',
      description:
        'Text for functional purposes in CompleteOptions view state.',
    },
    analyticsLabel: {
      defaultMessage: 'Analytics',
      description: 'Text for analytics purposes in CompleteOptions view state.',
    },
    advertisingLabel: {
      defaultMessage: 'Advertising',
      description:
        'Text for advertising purposes in CompleteOptions view state.',
    },
    saleOfInfoLabel: {
      defaultMessage: 'Sale of personal information',
      description:
        'Text for sale of information purposes in CompleteOptions view state.',
    },
    saveButtonPrimary: {
      defaultMessage: 'Confirm',
      description: 'Confirm button text in CompleteOptions view state.',
    },
    essentialAriaLabel: {
      defaultMessage: 'Essential data collection cannot be turned off.',
      description:
        'Hover/alt text for disabled essential purposes in CompleteOptions view state.',
    },
    toggleDisable: {
      defaultMessage: 'Click to disable collection of data for this purpose',
      description:
        'Hover/alt text for disabled opt in/opt out checkboxes when user is opted in in CompleteOptions view state.',
    },
    toggleEnable: {
      defaultMessage: 'Click to enable collection of data for this purpose',
      description:
        'Hover/alt text for disabled opt in/opt out checkboxes when user is opted out in CompleteOptions view state.',
    },
    globalPrivacySignal: {
      defaultMessage:
        "Set automatically by your browser's Global Privacy Control signal.",
      description:
        'Text to display when Global Privacy Control (GPC) is respected.',
    },
    description: {
      defaultMessage: '-',
      description:
        'Freeform description text for the CompleteOptions consent banner.',
    },
  },
);

export const completeOptionsInvertedMessages = defineMessages(
  'ui.src.completeOptionsInverted',
  {
    description: {
      defaultMessage: '-',
      description:
        'Freeform description text for the CompleteOptionsInverted consent banner.',
    },
    functionalLabel: {
      defaultMessage: 'Opt out of Functional',
      description:
        'Text for functional purposes in CompleteOptionsInverted view state.',
    },
    analyticsLabel: {
      defaultMessage: 'Opt out of Analytics',
      description:
        'Text for analytics purposes in CompleteOptionsInverted view state.',
    },
    advertisingLabel: {
      defaultMessage: 'Opt out of Advertising',
      description:
        'Text for advertising purposes in CompleteOptionsInverted view state.',
    },
    saleOfInfoLabel: {
      defaultMessage: 'Do Not Sell/Share My Personal Information.',
      description:
        'Text for sale of information purposes in CompleteOptionsInverted view state.',
    },
  },
);
/* eslint-enable max-lines */
