import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import Notifications from 'vue-notification';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;
Vue.use(AsyncComputed);
Vue.use(Notifications);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');

declare global {
  interface Window {
    app: {
      createNotice(message: string, duration: number, type: string): void;
    };
  }
}

window.app.createNotice = (message, duration, state = 'success') => {
  let type = state;
  if (state === 'warning') {
    type = 'warn';
  }
  Vue.notify({
    type,
    text: message,
    duration,
  });
};
