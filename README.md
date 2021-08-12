# slicer-extensions-webapp

## Build-time environment config

| variable | description | default |
|----------|-------------|---------|
| VUE_APP_APP_ID | Girder extension store application ID | `5f4474d0e1d8c75dfc705482` |
| VUE_APP_BASE_URL | Base URL of backend, including '/api/v1' | https://slicer-packages.kitware.com/api/v1 |
| VUE_APP_NETLIFY_CONTEXT | Name of the Netlify build's [deploy context][netlify-env-vars] | Initialized with the name of the Netlifuy build’s deploy context. |

[netlify-env-vars]: https://docs.netlify.com/configure-builds/environment-variables/#build-metadata

## Project setup

``` sh
yarn
```

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
