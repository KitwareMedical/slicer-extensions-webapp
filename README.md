# slicer-extensions-webapp

## Overview

This project implements the Slicer extensions catalog site.

The extensions catalog provides Slicer users with a convenient way to access the extensions
previously uploaded on the extensions server (described below as the backend).

The extensions catalog can be browsed from the Slicer application using
the [extensions manager][extensions-manager] or using a regular browser at https://extensions.slicer.org

[extensions-manager]: https://slicer.readthedocs.io/en/latest/user_guide/extensions_manager.html

## Current deployments

| URL | Description |
|-----|-------------|
| https://extensions.slicer.org/ | Netlify deployment of the Slicer extensions catalog. |
| `https://slicer.kitware.com/`[<sup>1</sup>](#fn1) | Assets for Slicer legacy extensions catalog published to [slicer-kitware-com][branch-slicer-kitware-com] branch and served using the [slicer-extensions-legacy-webapp][slicer-extensions-legacy-webapp] Flask application hosted at Kitware. |

1. <span id="fn1"></span> Deployment will be available soon.

[branch-slicer-kitware-com]: https://github.com/KitwareMedical/slicer-extensions-webapp/tree/slicer-kitware-com
[slicer-extensions-legacy-webapp]: https://github.com/KitwareMedical/slicer-extensions-legacy-webapp

## Build-time environment config

| variable | description | default |
|----------|-------------|---------|
| VUE_APP_APP_ID | Girder extension store application ID | `5f4474d0e1d8c75dfc705482` |
| VUE_APP_BASE_URL | Base URL of backend, including '/api/v1' | https://slicer-packages.kitware.com/api/v1 |
| VUE_APP_GOOGLE_ANALYTICS_ID | Google Analytics ID | `UA-97117718-1` |
| VUE_APP_NETLIFY_CONTEXT | Name of the Netlify build's [deploy context][netlify-env-vars] | Initialized with the name of the Netlify build’s deploy context. |

[netlify-env-vars]: https://docs.netlify.com/configure-builds/environment-variables/#build-metadata

## Project setup

``` sh
yarn install
```

_Note: "unmet peer dependency" install warnings are expected. Learn more [here](https://github.com/KitwareMedical/slicer-extensions-webapp/issues/43#issuecomment-899549193)._

### Compiles and hot-reloads for development

``` sh
yarn serve
```

### Compiles and minifies for production

``` sh
yarn build
```

### Lints and fixes files

``` sh
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## License

It is covered by the Apache License, Version 2.0:

https://www.apache.org/licenses/LICENSE-2.0
