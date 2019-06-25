import Vuex from 'vuex';

export default (store:Vuex.Store) => {
  /* store.watch(state => state.route, (newVal) => {
    store.commit('navHide', newVal.query.nav === '0');
    store.commit('appDrawerHide', true);
  });
  store.watch(state => state.appDrawerHide, (newVal) => {
    if (newVal) {
      document.body.classList.add('appDrawerHide');
    } else {
      document.body.classList.remove('appDrawerHide');
    }
  }); */
};
