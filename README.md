# Transcend Consent Manager reference UI

See [creating your own UI](https://transcend.notion.site/Creating-your-own-UI-8ae5151b74134f52b0ddd10b5ff077ba).

## Prerequisites

This package is distributed through npm and github package registries and assumes an installation of [npm and node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

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

This command will run a very simple HTML file defined in [./index.html](./index.html).
Any changes made to the [./index.html](./index.html) or [./src](./src/) will cause the page to auto-reload
without needing to restart the server.

### Playground View

![The Consent UI development playground](https://user-images.githubusercontent.com/7354176/187821040-5a4617fa-8c50-43c5-80af-5b4d18b344b4.png)

## View States

The default consent interface is built with flexibility to choose between different "view states". The following view states are supported:

### `QuickOptions`

![ViewState = QuickOptions](https://user-images.githubusercontent.com/10264973/188251089-4e1a8335-1f9a-45c0-8e15-34054a63ae3d.jpg)

### `CompleteOptions`

![ViewState = CompleteOptions](https://user-images.githubusercontent.com/10264973/188251095-7c7fd1b5-7748-4430-b7af-130e37db2dc5.jpg)

### `AcceptOrRejectAll`

![ViewState = AcceptOrRejectAll](https://user-images.githubusercontent.com/10264973/188251091-84dcb0af-0fc8-42ee-b742-466c55c61cdb.jpg)

### `DoNotSellDisclosure`

Unlike the other view states, this view state should be opened using `onClick={(event) => transcend.doNotSell(event)}`. This view state will opt the user out upon opening of the modal, while the other view states require an additional button to be clicked to ensure compliance.

![Screen Shot 2022-09-02 at 6 41 23 PM](https://user-images.githubusercontent.com/10264973/188251093-fa0646ff-7559-4cd3-94f3-f7e47c02e360.jpg)

### `NoticeAndDoNotSell`

**Deprecated: Use DoNotSellDisclosure for CPRA compliance**

![ViewState = DoNoNoticeAndDoNotSelltSellDisclosure](https://user-images.githubusercontent.com/10264973/188251092-0cdc45ab-82db-4c5d-918f-df41c55b3d3a.jpg)

### `AcceptAll`

**WARNING: This UI is a dark pattern and risks non-compliance. Use at own discretion.**

![ViewState = AcceptAll](https://user-images.githubusercontent.com/10264973/188251090-3b433f57-402a-4cd3-a5ca-c28c31675ae6.jpg)

### `LanguageOptions`

![ViewState = LanguageOptions](https://user-images.githubusercontent.com/10264973/188251088-527c227d-0674-46f6-b544-757d8ab2a539.jpg)

### `Collapsed`

![View State = Collapsed](https://user-images.githubusercontent.com/10264973/188251094-44748b4e-83f5-427f-ab0d-f67e06ddfa0c.jpg)
