import Vue from 'vue';
import Router from 'vue-router';

import Catalog from '@/views/Catalog.vue';
import ExtensionDetails from '@/views/ExtensionDetails.vue';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/catalog/:category/:revision/:os/:arch?',
      name: 'Catalog',
      component: Catalog,
      props: true,
    },
    {
      path: '/view/:baseName/:revision/:os/:arch?',
      name: 'Extension Details',
      component: ExtensionDetails,
      props: true,
    },
  ],
});
