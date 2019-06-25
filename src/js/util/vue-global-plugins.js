// import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx';
import SimpleVueValidation from 'simple-vue-validator';
// import { sync } from 'vuex-router-sync';
// import vueGa from '@/directive/vue-ga';
import vueRipple from '@/directive/vue-ripple';

// const DEV_MODE = process.env.NODE_ENV === 'development';
const getName = component => (component.$options.$name || component.$options.name || '?');

export default {
  install(Vue) {
    if (this.installed) {
      return;
    }
    this.installed = true;
    // sync(store, router);
    Vue.use(SimpleVueValidation);
    // Vue.use(vueGa);
    // Vue.use(vueRipple, { color: '#be9ad7' });
    Vue.use(VueRx);
    Vue.mixin({
      data: () => ({
      }),
      created() {
        console.log(`%c created ${getName(this)} `, 'background:darkgreen;color:white');
      },

      mounted() {
        console.log(`%c mounted ${getName(this)} `, 'background:darkblue;color:white');
      },

      destroyed() {
        console.log(`%c destoryed ${getName(this)} `, 'background:darkred;color:white');
      },

      methods: {},
    });
  },
};

