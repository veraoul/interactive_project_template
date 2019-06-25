

import Vue from 'vue';
import '@/util/polyfill';
import App from '@/container/App';
import './util/init';
import vueGlobalPlugins from '@/util/vue-global-plugins';
import router from './router';
import store from './store';


vueGlobalPlugins.install(Vue);

export function createApp() {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });
  return { app, router, store };
}
