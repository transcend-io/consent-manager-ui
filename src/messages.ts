// main
import { defineMessages } from '@transcend-io/internationalization';

export const messages = defineMessages('ui.src.messages', {
  consentTitle: {
    defaultMessage: 'What can we use data for?',
    description:
      'The title displayed when asking the user for specific opt out/in preferences.',
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
      'Seconary button text for selecting functional, essential, analytics and advertising data flows/cookies.',
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
        'We’ve received your request for this device or browser, and we will no longer sell or share your data with third parties. Learn more about our data practices in our privacy policy.',
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
