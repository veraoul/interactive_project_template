
import { resize } from '@/util/rxUtil';

export default (store) => {
  resize().subscribe(() => {
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    store.commit('setMobile', mobile);
    store.commit('setWindowSize');
  });
};

