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

## View States

The default consent interface is built with flexibility to choose between different "view states". These can be viewed in the [Consent Manager UI playground here](https://consent-manager-ui.vercel.app/src/playground).
