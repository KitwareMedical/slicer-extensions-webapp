process.env.VUE_APP_APP_ID = process.env.VUE_APP_APP_ID || '5aa3da37f3eb080001497b3d';
process.env.VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL || 'http://192.168.113.208:8080/api/v1';

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
};
