# Transcend Consent Manager reference UI

See [creating your own UI](https://transcend.notion.site/Creating-your-own-UI-8ae5151b74134f52b0ddd10b5ff077ba).

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

## Playground

The default consent interface is built with flexibility to choose between different "view states". These can be viewed in the [Consent Manager UI playground here](https://consent-manager-ui.vercel.app/src/playground).

<img width="1468" alt="Screen Shot 2022-12-14 at 2 38 05 AM" src="https://user-images.githubusercontent.com/7354176/207547449-3519436f-2f2d-487f-b9d6-af8f803ff71f.png">

You can also run the playground locally with

```sh
yarn playground`
```

## View States

The default consent interface is built with flexibility to choose between different "view states". The following view states are supported:

### `AcceptOrRejectAll`

Standard GDPR style banner for opting in or out of all purposes. Selecting "More Choices" gives the ability to opt in or out of specific purposes.

![ViewState = AcceptOrRejectAll](https://user-images.githubusercontent.com/10264973/188251091-84dcb0af-0fc8-42ee-b742-466c55c61cdb.jpg)

### `QuickOptions`

This banner is recommended for GDPR-like regimes where customers can opt in or out of multiple purposes with 1 click. Each button includes the purposes for all options to the left of that button. For example, "Analytics" button includes "Essential", "Functional" and "Analytics".

![ViewState = QuickOptions](https://user-images.githubusercontent.com/10264973/188251089-4e1a8335-1f9a-45c0-8e15-34054a63ae3d.jpg)

### `QuickOptions3`

This banner is the same as `QuickOptions` but the Functional & Analytics buttons are combined into 1.

![ViewState = QuickOptions3](https://user-images.githubusercontent.com/10264973/207575262-298e9ba1-84ba-4443-8d54-bc30f11c47af.jpg)

### `CompleteOptions`

This option is linked to in most other banners under the "More Choices" footer. This allows for explicit opting in or out of each purpose. If a user begins fully opted out, this UI requires clicking each checkbox to fully opt in.

![ViewState = CompleteOptions](https://user-images.githubusercontent.com/10264973/188251095-7c7fd1b5-7748-4430-b7af-130e37db2dc5.jpg)

### `DoNotSellDisclosure`

Unlike the other view states, this view state should be opened using `onClick={(event) => transcend.doNotSell(event)}`. Note: for React development, please use: `onClick={(event) => transcend.doNotSell(event.nativeEvent)}`. This view state will opt the user out upon opening of the modal, while the other view states require an additional button to be clicked to ensure compliance.

This is the recommended flow for US state laws with a do not sell requirement, as it allows for minimal friction in the opt-out process through a single click opt out.

![ViewState = DoNotSellDisclosure](https://user-images.githubusercontent.com/10264973/188251093-fa0646ff-7559-4cd3-94f3-f7e47c02e360.jpg)

### `DoNotSellExplainer`

This is a 2 click opt out for do not sell or share. This option is useful for companies that need to provide more context about what the opt-out means, and how the opt-out changes when the user is logged in or out.

![ViewState = DoNotSellExplainer](https://user-images.githubusercontent.com/10264973/207575258-892081eb-4dd5-4436-b926-517e6e74715f.jpg)

## `PrivacyPolicyNotice`

This banner can be used to notify users of privacy policy changes. This banner does not collect consent preferences, however, it will save a consent timestamp for whenever the user acknowledges the policy change, and closes the modal.

![ViewState = PrivacyPolicyNotice](https://user-images.githubusercontent.com/10264973/207575261-63a33c6e-6df0-4997-943c-806e48271cf8.jpg)

### `NoticeAndDoNotSell`

**Deprecated: Use DoNotSellDisclosure or DoNotSellExplainer for CPRA compliance** This option adds too much friction, and would likely be ruled non-compliant.

![ViewState = DoNoNoticeAndDoNotSelltSellDisclosure](https://user-images.githubusercontent.com/10264973/188251092-0cdc45ab-82db-4c5d-918f-df41c55b3d3a.jpg)

### `AcceptAll`

**WARNING: This UI is a dark pattern and risks non-compliance. Use at own discretion.**

![ViewState = AcceptAll](https://user-images.githubusercontent.com/10264973/188251090-3b433f57-402a-4cd3-a5ca-c28c31675ae6.jpg)

### `LanguageOptions`

This is the view state that allows the user to select their language.

![ViewState = LanguageOptions](https://user-images.githubusercontent.com/10264973/188251088-527c227d-0674-46f6-b544-757d8ab2a539.jpg)

### `Collapsed`

![View State = Collapsed](https://user-images.githubusercontent.com/10264973/188251094-44748b4e-83f5-427f-ab0d-f67e06ddfa0c.jpg)
