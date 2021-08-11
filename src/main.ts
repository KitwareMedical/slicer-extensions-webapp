import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import Notifications from 'vue-notification';
import CompositionApi from '@vue/composition-api';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import bus from './plugins/bus';
import router from './router';
import { InstallState } from './lib/api/extension.service';

Vue.config.productionTip = false;
Vue.use(AsyncComputed);
Vue.use(Notifications);
Vue.use(CompositionApi);

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
    setExtensionButtonState(extensionName: string, installState: keyof typeof InstallState) {
      bus.$emit('extension-state-updated', extensionName, InstallState[installState]);
    },
  },
}).$mount('#app');

window.app = app;
