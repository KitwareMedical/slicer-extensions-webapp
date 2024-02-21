process.env.VUE_APP_APP_ID = process.env.VUE_APP_APP_ID || '5f4474d0e1d8c75dfc705482';
process.env.VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL || 'https://slicer-packages.kitware.com/api/v1';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const date = require('date-and-time');

process.env.VUE_APP_BUILD_DATE = date.format(new Date(), 'YYYY-MM-DD');
process.env.VUE_APP_EXTENSION_DEFAULT_ICON_URL = process.env.VUE_APP_EXTENSION_DEFAULT_ICON_URL || 'https://raw.githubusercontent.com/Slicer/Slicer/main/Base/QTGUI/Resources/Icons/ExtensionDefaultIcon.png';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { gitDescribeSync } = require('git-describe');

process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash;
process.env.VUE_APP_GOOGLE_ANALYTICS_ID = process.env.VUE_APP_GOOGLE_ANALYTICS_ID || 'UA-97117718-1';
/* See https://docs.netlify.com/configure-builds/environment-variables/#build-metadata */
process.env.VUE_APP_NETLIFY_CONTEXT = process.env.CONTEXT;

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
};
