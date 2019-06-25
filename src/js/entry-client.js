/* eslint no-underscore-dangle:0 */
import { createApp } from './app';

document.addEventListener('DOMContentLoaded', () => {
  const { app, router, store } = createApp();
  if (store && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  router.onReady(() => {
    app.$mount('#app');
  });
});
