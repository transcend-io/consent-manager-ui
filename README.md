# Transcend Consent Manager reference UI

See [creating your own UI](https://docs.transcend.io/docs/consent-management/configuration/creating-your-own-ui).

## Playground

The default consent interface is built with flexibility to choose between different "view states". These can be viewed in the [Consent Manager UI playground here](https://consent-manager-ui.vercel.app/src/playground).

<img width="1468" alt="Screen Shot 2022-12-14 at 2 38 05 AM" src="https://user-images.githubusercontent.com/7354176/207547449-3519436f-2f2d-487f-b9d6-af8f803ff71f.png">

You can also run the playground locally with

```sh
yarn playground
```

## View States

The default consent interface is built with flexibility to choose between different "view states". The following view states are supported:

### `AcceptOrRejectAll`

Standard GDPR style banner for opting in or out of all purposes. Selecting "More Choices" gives the ability to opt in or out of specific purposes.

![ViewState = AcceptOrRejectAll, Web](https://user-images.githubusercontent.com/10264973/188251091-84dcb0af-0fc8-42ee-b742-466c55c61cdb.jpg)

![ViewState = AcceptOrRejectAll, Mobile](https://github.com/user-attachments/assets/fb8781d3-4cca-4f82-a1c1-b9c63440026a)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accept All             | Opts the user into all allowed purposes in current consent experience.                                                                                                                                                                                                                                           |
| Reject All             | Opts the user out of all allowed purposes in current consent experience. Essential is never opted out.                                                                                                                                                                                                           |
| More choices           | Redirects to the `CompleteOptions` view state. No purposes change.                                                                                                                                                                                                                                               |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `AcceptOrRejectAllOrMoreChoices`

Similar to `AcceptOrRejectAll`, but the "More Choices" button is a primary button.

![ViewState = AcceptOrRejectAllOrMoreChoices, Web](https://user-images.githubusercontent.com/10264973/221736879-13ebbca0-34d6-4424-b358-7c6a56a97737.png)

![ViewState = AcceptOrRejectAllOrMoreChoices, Mobile](https://github.com/user-attachments/assets/5ec492eb-2d7e-4dc5-868c-5caa128b4d54)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accept All             | Opts the user into all allowed purposes in current consent experience.                                                                                                                                                                                                                                           |
| Reject All             | Opts the user out of all allowed purposes in current consent experience. Essential is never opted out.                                                                                                                                                                                                           |
| More choices           | Redirects to the `CompleteOptions` view state. No purposes change.                                                                                                                                                                                                                                               |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `QuickOptions`

This banner is recommended for GDPR-like regimes where customers can opt in or out of multiple purposes with 1 click. Each button includes the purposes for all options to the left of that button. For example, "Analytics" button includes "Essential", "Functional" and "Analytics".

![ViewState = QuickOptions, Web](https://user-images.githubusercontent.com/10264973/188251089-4e1a8335-1f9a-45c0-8e15-34054a63ae3d.jpg)

![ViewState = QuickOptions, Mobile](https://github.com/user-attachments/assets/b463f224-fed4-41f4-a0b9-6d9af0fe622f)

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Only Essentials        | Opts the user out of all purpose types other than Essential. Essential is never opted out.                                                                                                                                                                                                                       |
| Functional             | Opts the user in to Functional, but opts out of Analytics and Advertising. Does not change SaleOfInfo.                                                                                                                                                                                                           |
| Analytics              | Opts the user in to Functional and Analytics, but opts out of Advertising. Does not change SaleOfInfo.                                                                                                                                                                                                           |
| Ads and Analytics      | Opts the user in to Functional and Analytics and Advertising. Does not change SaleOfInfo.                                                                                                                                                                                                                        |
| More choices           | Redirects to the `CompleteOptions` view state. No purposes change. Does not change SaleOfInfo.                                                                                                                                                                                                                   |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `QuickOptions3`

This banner is the same as `QuickOptions` but the Functional & Analytics buttons are combined into 1.

![ViewState = QuickOptions3, Web](https://user-images.githubusercontent.com/10264973/207575262-298e9ba1-84ba-4443-8d54-bc30f11c47af.jpg)

![ViewState = QuickOptions3, Mobile](https://github.com/user-attachments/assets/f7ab85e2-4e96-4b11-9da1-2a40a1e51897)

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Only Essentials        | Opts the user out of all purpose types other than Essential. Essential is never opted out.                                                                                                                                                                                                                       |
| Analytics              | Opts the user in to Functional and Analytics, but opts out of Advertising. Does not change SaleOfInfo.                                                                                                                                                                                                           |
| Ads and Analytics      | Opts the user in to Functional and Analytics and Advertising. Does not change SaleOfInfo.                                                                                                                                                                                                                        |
| More choices           | Redirects to the `CompleteOptions` view state. No purposes change. Does not change SaleOfInfo.                                                                                                                                                                                                                   |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `CompleteOptions`

This option is linked to in most other banners under the "More Choices" footer. This allows for explicit opting in or out of each purpose. If a user begins fully opted out, this UI requires clicking each checkbox to fully opt in.

![ViewState = CompleteOptions, Web](https://user-images.githubusercontent.com/10264973/188251095-7c7fd1b5-7748-4430-b7af-130e37db2dc5.jpg)

![ViewState = CompleteOptions, Mobile](https://github.com/user-attachments/assets/e4e9b6df-b696-479b-92fa-0fb5395698b5)

With optional description text:

![ViewState = CompleteOptions with description](https://user-images.githubusercontent.com/10264973/231072703-7cc9e7c7-a02e-4598-ad08-b5dc6d029165.png)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toggle Checkbox        | Checking the box opts the user in to a purpose, unchecking the box opts a user out of a purpose. Opt out changes are not applied until "Confirm" is clicked.                                                                                                                                                     |
| Confirm                | Applies the consent change event for any modified checkboxes.                                                                                                                                                                                                                                                    |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `CompleteOptionsInverted`

This option is similar to `CompleteOptions` but the checkboxes are inverted -- checking each box opts the user out of a purpose.

![ViewState = CompleteOptionsInverted, Web](https://user-images.githubusercontent.com/10264973/209087837-f1b4dc82-dd22-4279-aff0-15a239452b9c.jpg)

![ViewState = CompleteOptionsInverted, Mobile](https://github.com/user-attachments/assets/648973f8-a423-44dc-ab73-0617946a0400)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toggle Checkbox        | Checking the box opts the user out of a purpose, unchecking the box opts a user in to a purpose. Opt out changes are not applied until "Confirm" is clicked.                                                                                                                                                     |
| Confirm                | Applies the consent change event for any modified checkboxes.                                                                                                                                                                                                                                                    |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |
| Read more              | Redirects to the secondary policy specified using the `data-secondary-policy` data attribute.                                                                                                                                                                                                                    |

### `CompleteOptionsToggles`

This is a good banner style when you are using Transcend for [Preference Management](https://docs.transcend.io/docs/consent/reference/managed-preferences).

![ViewState = CompleteOptionsToggles, Web](https://github.com/transcend-io/consent-manager-ui/assets/10264973/94f85234-aad7-4596-969e-fd91af42f4ab)

![ViewState = CompleteOptionsToggles, Mobile](https://github.com/user-attachments/assets/34f240cb-142c-4f3f-bc0b-a114943f06d1)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toggle Switch          | Switching one of the toggles opts the user in or out of a purpose. Changes are applied immediately as the toggle is switched                                                                                                                                                                                     |
| X - Icon               | Closes the modal with no changes to purposes and no changes to consent confirmation.                                                                                                                                                                                                                             |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `DoNotSellDisclosure`

Unlike the other view states, this view state should be opened using `onClick={(event) => transcend.doNotSell(event)}`. Note: for React development, please use: `onClick={(event) => transcend.doNotSell(event.nativeEvent)}`. This view state will opt the user out upon opening of the modal, while the other view states require an additional button to be clicked to ensure compliance.

This is the recommended flow for US state laws with a do not sell requirement, as it allows for minimal friction in the opt-out process through a single click opt out.

![ViewState = DoNotSellDisclosure, Web](https://user-images.githubusercontent.com/10264973/188251093-fa0646ff-7559-4cd3-94f3-f7e47c02e360.jpg)

![ViewState = DoNotSellDisclosure, Mobile](https://github.com/user-attachments/assets/50ce9d2f-b821-4067-ba15-f99610678c7b)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| On Modal Open          | Opts the user out of the `SaleOfInfo` purpose.                                                                                                                                                                                                                                                                   |
| Okay                   | Closes the modal with no changes to purposes and no changes to consent confirmation.                                                                                                                                                                                                                             |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `OptOutDisclosure`

Unlike the other view states, this view state should be opened using `onClick={(event) => transcend.optOutNotice(event)}`. Note: for React development, please use: `onClick={(event) => transcend.optOutNotice(event.nativeEvent)}`. This view state will opt the user out of all purposes as soon as the modal opens, while the other view states require an additional button to be clicked to ensure compliance.

![ViewState = OptOutDisclosure](https://user-images.githubusercontent.com/10264973/224595781-1015e106-7e1b-4943-8d05-56007fc663ba.png)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| On Modal Open          | Opts the user out of all purposes.                                                                                                                                                                                                                                                                               |
| Okay                   | Closes the modal with no changes to purposes and no changes to consent confirmation.                                                                                                                                                                                                                             |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `DoNotSellExplainer`

This is a 2 click opt out for do not sell or share. This option is useful for companies that need to provide more context about what the opt-out means, and how the opt-out changes when the user is logged in or out.

![ViewState = DoNotSellExplainer](https://user-images.githubusercontent.com/10264973/209087742-cda43114-5502-4116-9b49-2e34fb0d28c3.jpg)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toggle Switch          | Opts the user in or out of the `SaleOfInfo` purpose.                                                                                                                                                                                                                                                             |
| X - Icon               | Closes the modal with no changes to purposes and no changes to consent confirmation.                                                                                                                                                                                                                             |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

## `PrivacyPolicyNotice`

This banner can be used to notify users of privacy policy changes. This banner does not collect consent preferences, however, it will save a consent timestamp for whenever the user acknowledges the policy change, and closes the modal.

![ViewState = PrivacyPolicyNotice, Web](https://user-images.githubusercontent.com/10264973/207575261-63a33c6e-6df0-4997-943c-806e48271cf8.jpg)

![ViewState = PrivacyPolicyNotice, Mobile](https://github.com/user-attachments/assets/366c0576-f3d7-4081-9442-8468892d4646)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Okay                   | Closes the modal with no changes to purposes, however, airgap.getConsent().confirmed is set to true to prevent the modal from re-showing.                                                                                                                                                                        |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

## `PrivacyPolicyNoticeWithCloseButton`

This banner can be used to notify users of privacy policy changes. It does not collect consent preferences, however, it will save a consent timestamp for whenever the user acknowledges the policy change, and closes the modal. This banner is similar to `PrivacyPolicyNotice`, however instead of using a button to close the modal - an X icon is used in the top right-hand corner of the modal.

![ViewState = PrivacyPolicyNoticeWithCloseButton, Web](https://github.com/transcend-io/consent-manager-ui/assets/10264973/54010d7f-905a-4014-8268-5915590b177b)

![ViewState = PrivacyPolicyNoticeWithCloseButton, Mobile](https://github.com/user-attachments/assets/569e6b83-d195-4d5e-9161-299008620ac1)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| X - Icon               | Closes the modal with no changes to purposes, however, airgap.getConsent().confirmed is set to true to prevent the modal from re-showing.                                                                                                                                                                        |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `NoticeAndDoNotSell`

**Deprecated: Use DoNotSellDisclosure or DoNotSellExplainer for CPRA compliance** This option adds too much friction, and would likely be ruled non-compliant.

![ViewState = DoNoNoticeAndDoNotSelltSellDisclosure](https://user-images.githubusercontent.com/10264973/188251092-0cdc45ab-82db-4c5d-918f-df41c55b3d3a.jpg)

#### Button Mapping

| Button Title                        | Callback Description                                                                                                                                                                                                                                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Okay                                | Closes the modal with no changes to purposes and no changes to consent confirmation.                                                                                                                                                                                                                             |
| Do Not Sell My Personal Information | Redirects to the `CompleteOptions` view state. No purposes change. Does not change SaleOfInfo.                                                                                                                                                                                                                   |
| See our Privacy Policy              | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `AcceptOrRejectAnalytics`

A banner that handles opting in or out of the `Analytics` tag.

![ViewState = AcceptOrRejectAnalytics, Web](https://user-images.githubusercontent.com/10264973/209070374-6a35ae9d-8d98-4042-88e0-4b6bc1eb7d1a.jpg)

![ViewState = AcceptOrRejectAnalytics, Mobile](https://github.com/user-attachments/assets/e7a36e7f-e384-43b9-8d3e-fa973fdd16e8)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Okay                   | Opts the user into `Analytics`.                                                                                                                                                                                                                                                                                  |
| Do not track           | Opts the user out of `Analytics`.                                                                                                                                                                                                                                                                                |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `AcceptOrRejectAdvertising`

A banner that handles opting in or out of the `Advertising` tag.

![ViewState = AcceptOrRejectAdvertising, Web](https://github.com/transcend-io/consent-manager-ui/assets/10264973/7e36df8c-4752-4a2d-8616-c68d91ea1250)

![ViewState = AcceptOrRejectAdvertising, Mobile](https://github.com/user-attachments/assets/5dabda6c-9c7c-4089-b47d-b0e9f5fd5de6)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Okay                   | Opts the user into `Advertising`.                                                                                                                                                                                                                                                                                |
| Opt out of advertising | Opts the user out of `Advertising`.                                                                                                                                                                                                                                                                              |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `AcceptAll`

**WARNING: In some jurisdictions this UI may be considered a dark pattern. Use at your own risk.** To learn more, head over to our blog post: [Demystifying dark patterns: A practical primer for CPRA compliance](https://transcend.io/blog/dark-patterns-cpra/).

![ViewState = AcceptAll, Web](https://user-images.githubusercontent.com/10264973/223242491-7bb813f4-86de-40b4-8283-08f8048b3444.png)

![ViewState = AcceptAll, Mobile](https://github.com/user-attachments/assets/e19d2e88-b8e1-4d5f-ae5d-b0f668401feb)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accept All             | Opts the user into all allowed purposes in current consent experience.                                                                                                                                                                                                                                           |
| More choices           | Redirects to the `CompleteOptions` view state. No purposes change.                                                                                                                                                                                                                                               |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `AcceptAllOrMoreChoices`

**WARNING: In some jurisdictions this UI may be considered a dark pattern. Use at your own risk.** To learn more, head over to our blog post: [Demystifying dark patterns: A practical primer for CPRA compliance](https://transcend.io/blog/dark-patterns-cpra/).

![ViewState = AcceptAllOrMoreChoices, Web](https://user-images.githubusercontent.com/10264973/221736031-2526a3a0-153b-484d-9067-c1072017d974.png)

![ViewState = AcceptAllOrMoreChoices, Mobile](https://github.com/user-attachments/assets/6a8ed143-07e2-4638-a661-8802c10d8967)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accept All             | Opts the user into all allowed purposes in current consent experience.                                                                                                                                                                                                                                           |
| More choices           | Redirects to the `CompleteOptions` view state. No purposes change.                                                                                                                                                                                                                                               |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `AcceptAllRejectAllToggle`

**WARNING: In some jurisdictions this UI may be considered a dark pattern. Use at your own risk.** To learn more, head over to our blog post: [Demystifying dark patterns: A practical primer for CPRA compliance](https://transcend.io/blog/dark-patterns-cpra/).

![ViewState = AcceptAllRejectAllToggle](https://github.com/transcend-io/consent-manager-ui/assets/10264973/a8a74188-5464-48fc-9720-d84e7f23c300)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toggle Switch          | Opts the user in or out of all purpose.                                                                                                                                                                                                                                                                          |
| X - Icon               | Closes the modal with no changes to purposes and no changes to consent confirmation.                                                                                                                                                                                                                             |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `LanguageOptions`

This is the view state that allows the user to select their language.

![ViewState = LanguageOptions](https://github.com/transcend-io/main/assets/10264973/186331ce-0448-42bc-843b-b5f7d4584f09)

#### Button Mapping

| Button Title           | Callback Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Each Language          | Each option changes the selected language for the modal, no purposes change.                                                                                                                                                                                                                                     |
| More choices           | Redirects to the `CompleteOptions` view state. No purposes change.                                                                                                                                                                                                                                               |
| See our Privacy Policy | Redirects to the privacy policy link specified in [Consent Display Settings](https://app.transcend.io/consent-manager/display-settings) or the [`data-privacy-policy`](https://docs.transcend.io/docs/consent/faq#how-can-i-customize-the-privacy-policy-link-when-hosting-on-multiple-domains?) data attribute. |

### `Collapsed`

![View State = Collapsed](https://user-images.githubusercontent.com/10264973/188251094-44748b4e-83f5-427f-ab0d-f67e06ddfa0c.jpg)

#### Button Mapping

| Button Title   | Callback Description                        |
| -------------- | ------------------------------------------- |
| Transcend Icon | Open's Transcend modal, no purposes change. |

## Prerequisites

This package is distributed through [npm](https://www.npmjs.com/package/@transcend-io/consent-manager-ui) and GitHub package registries and assumes an installation of [npm and node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Developing against this repository

1. Clone the repo

```sh
git clone git@github.com:transcend-io/consent-manager-ui.git
```

2. Install dependencies

```sh
yarn
```

3. Build the code and run the local version of the UI

```sh
yarn start
```

This command will run a very simple HTML file defined in ./index.html. Any changes made to the ./index.html or ./src will cause the page to auto-reload without needing to restart the server.

## Testing

This repository has [Jest](https://jestjs.io/) tests available for all view states. These unit tests help to ensure core functionality remains unchanged,
and run as part of the PR CI process. The test themselves include snapshots of the view state HTML to help prevent regressions in terms of UI logic or
DOM behavior.

To run these tests, pull down this repository and run

```sh
yarn test
```

For maintainers: if a change you're making introduces a diff, you can walk through the snapshot changes interactively and review diffs/update snapshots
on a case by case basis by running

```sh
yarn test:watch
```
