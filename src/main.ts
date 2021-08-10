import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import Notifications from 'vue-notification';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;
Vue.use(AsyncComputed);
Vue.use(Notifications);

const app = new Vue({
  vuetify,
  router,
  render: (h) => h(App),
  methods: {
    createNotice(message: string, duration: number, state: string) {
      let type = state;
      if (state === 'warning') {
        type = 'warn';
      }
      Vue.notify({
        type,
        text: message,
        duration,
      });
    },
    search(q: string) {
      /* See https://github.com/vuejs/vetur/issues/1754#issuecomment-595256501 */
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const view = this.$root.$children[0].$refs.view as any;
      view.query = q;
    },
  },
}).$mount('#app');

declare global {
  interface Window {
    app: Vue;
  }
}

window.app = app;
