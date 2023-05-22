import Vue from 'vue';
import Router, {
  Route,
} from 'vue-router';

import Catalog from '@/views/Catalog.vue';
import DataStore from '@/views/DataStore.vue';
import ExtensionDetails from '@/views/ExtensionDetails.vue';
import Home from '@/views/Home.vue';
import OperatingSystem from '@/views/OperatingSystem.vue';

Vue.use(Router);

function legacyAppStoreQueryToCatalogProps(route: Route) {
  return {
    category: route.query.category || 'All',
    revision: route.query.revision,
    os: route.query.os,
    arch: route.query.arch || 'amd64',
    legacy: true,
  };
}

function legacyAppStoreQueryToExtensionDetailsProps(route: Route) {
  return {
    baseName: route.query.baseName,
    revision: route.query.revision,
    os: route.query.os,
    arch: route.query.arch || 'amd64',
    id: route.query.extensionId || undefined,
    legacy: true,
  };
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/catalog',
      redirect: '/catalog/All',
    },
    {
      path: '/catalog/:category',
      name: 'OperatingSystem',
      component: OperatingSystem,
      props: true,
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
    {
      path: '/midas3/slicerappstore',
      name: 'Catalog Legacy',
      component: Catalog,
      props: legacyAppStoreQueryToCatalogProps,
    },
    {
      path: '/midas3/slicerappstore/extension/view',
      name: 'Extension Details Legacy',
      component: ExtensionDetails,
      props: legacyAppStoreQueryToExtensionDetailsProps,
    },
    {
      path: '/midas3/slicerdatastore',
      name: 'DataStore Browse Legacy',
      component: DataStore,
    },
    {
      path: '/midas3/slicerdatastore/user/login',
      name: 'DataStore Upload Legacy',
      component: DataStore,
    },
  ],
});
