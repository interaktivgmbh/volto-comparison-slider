# volto-comparison-slider

A Volto add-on that provides an image comparison slider block for before/after image comparisons.

[![Code analysis checks](https://github.com/interaktivgmbh/volto-comparison-slider/actions/workflows/code.yml/badge.svg)](https://github.com/interaktivgmbh/volto-comparison-slider/actions/workflows/code.yml)
[![Unit tests](https://github.com/interaktivgmbh/volto-comparison-slider/actions/workflows/unit.yml/badge.svg)](https://github.com/interaktivgmbh/volto-comparison-slider/actions/workflows/unit.yml)

## Features

- Interactive before/after image comparison slider
- Horizontal and vertical orientation support
- Customizable handle (icon or text)
- Configurable initial slider position
- Optional labels for before/after images
- Full keyboard accessibility (arrow keys, Home/End)
- Touch and mouse support
- Responsive design

## Installation

To install your project, you must choose the method appropriate to your version of Volto.


### Volto 18 and later

Add `@interaktivgmbh/volto-comparison-slider` to your `package.json`:

```json
"dependencies": {
    "@interaktivgmbh/volto-comparison-slider": "*"
}
```

Add `@interaktivgmbh/volto-comparison-slider` to your `volto.config.js`:

```javascript
const addons = ['@interaktivgmbh/volto-comparison-slider'];
```

### Volto 17 and earlier

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @interaktivgmbh/volto-comparison-slider
cd my-volto-project
```

Add `@interaktivgmbh/volto-comparison-slider` to your package.json:

```JSON
"addons": [
    "@interaktivgmbh/volto-comparison-slider"
],

"dependencies": {
    "@interaktivgmbh/volto-comparison-slider": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start volto with:

```
yarn start
```

## Usage

After installation, a new block type "Comparison Slider" will be available in the Volto block chooser.

### Block Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Before Image | The image shown on the left/top side | - |
| After Image | The image shown on the right/bottom side | - |
| Before Label | Label text for the before image | "Before" |
| After Label | Label text for the after image | "After" |
| Show Labels | Toggle visibility of labels | true |
| Initial Position | Starting position of the slider (0-100%) | 50 |
| Orientation | Horizontal or vertical slider | Horizontal |
| Handle Type | Icon or text handle | Icon |
| Handle Text | Custom text for text handle | "DRAG" |

### Keyboard Navigation

- **Arrow Left/Right** (horizontal) or **Arrow Up/Down** (vertical): Move slider by 1%
- **Shift + Arrow**: Move slider by 10%
- **Home**: Move slider to 0%
- **End**: Move slider to 100%

## Test installation

Visit http://localhost:3000/ in a browser, login, and check the awesome new features.


## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha).


### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 22
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1.  Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:interaktivgmbh/volto-comparison-slider.git
    cd volto-comparison-slider
    ```

2.  Install this code base.

    ```shell
    make install
    ```


### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Cypress in interactive mode
ci-acceptance-test               Run cypress tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner.

```shell
make acceptance-test
```

## License

The project is licensed under the MIT license.

## Credits and acknowledgements 🙏

Generated using [Cookieplone (0.9.10)](https://github.com/plone/cookieplone) and [cookieplone-templates (dd13073)](https://github.com/plone/cookieplone-templates/commit/dd13073d34447056d6992461d8da29447d62c029) on 2026-01-27 11:05:38.723456. A special thanks to all contributors and supporters!
