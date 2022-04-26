// main
import { defineMessages } from '@transcend-io/internationalization';

export const messages = defineMessages('ui.src.messages', {
  consentTitle: {
    defaultMessage: 'What can we use data for?',
  },
  noticeTitle: {
    defaultMessage: 'This website processes personal data',
  },
  collapsedLabel: {
    defaultMessage: 'Privacy Settings',
  },
  acceptAllButtonPrimary: {
    defaultMessage: 'Accept all',
  },
});

export const quickOptionsMessages = defineMessages('ui.src.quickOptions', {
  essentialsButtonPrimary: {
    defaultMessage: 'Only Essentials',
  },
  essentialsButtonSecondary: {
    defaultMessage: 'required to operate',
  },
  functionalButtonPrimary: {
    defaultMessage: 'Functional',
  },
  functionalButtonSecondary: {
    defaultMessage: 'extra site features',
  },
  analyticsButtonPrimary: {
    defaultMessage: 'Analytics',
  },
  analyticsButtonSecondary: {
    defaultMessage: 'helps us improve',
  },
  advertisingButtonPrimary: {
    defaultMessage: 'Advertising and Analytics',
  },
  advertisingButtonSecondary: {
    defaultMessage: 'personalize ads',
  },
});

export const noticeAndDoNotSellMessages = defineMessages(
  'ui.src.noticeAndDoNotSell',
  {
    confirmButtonPrimary: {
      defaultMessage: 'Okay',
    },
    doNotSellPrimary: {
      defaultMessage: 'Do Not Sell My Personal Information',
    },
    doNotSellLabel: {
      defaultMessage: 'Opt out of the sale of your personal information',
    },
  },
);

export const bottomMenuMessages = defineMessages('ui.src.bottomMenu', {
  moreChoicesButtonPrimary: {
    defaultMessage: 'More choices',
  },
  moreChoicesButtonLabel: {
    defaultMessage: 'Click to show more choices',
  },
  simplerChoicesButtonPrimary: {
    defaultMessage: 'Simpler choices',
  },
  simplerChoicesButtonLabel: {
    defaultMessage: 'Click to show simpler choices',
  },
  whatGetsTrackedButtonPrimary: {
    defaultMessage: 'What Gets Tracked',
  },
  whatGetsTrackedButtonLabel: {
    defaultMessage: 'Show me what gets tracked',
  },
  showPolicyButtonPrimary: {
    defaultMessage: 'Our Privacy Policy',
  },
  showPolicyButtonLabel: {
    defaultMessage: 'Visit our privacy policy',
  },
});

export const completeOptionsMessages = defineMessages(
  'ui.src.completeOptions',
  {
    essentialLabel: {
      defaultMessage: 'Essential purposes',
    },
    functionalLabel: {
      defaultMessage: 'Functionality',
    },
    analyticsLabel: {
      defaultMessage: 'Analytics',
    },
    advertisingLabel: {
      defaultMessage: 'Advertising',
    },
    saleOfInfoLabel: {
      defaultMessage: 'Sale of personal information',
    },
    saveButtonPrimary: {
      defaultMessage: 'Confirm',
    },
    essentialAriaLabel: {
      defaultMessage: 'Essential data collection cannot be turned off.',
    },
    toggleDisable: {
      defaultMessage: 'Click to disable collection of data for this purpose',
    },
    toggleEnable: {
      defaultMessage: 'Click to enable collection of data for this purpose',
    },
    globalPrivacySignal: {
      defaultMessage:
        "Set automatically by your browser's Global Privacy Control signal.",
    },
  },
);
