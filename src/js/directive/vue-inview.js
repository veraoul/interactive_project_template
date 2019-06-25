/* eslint no-underscore-dangle:0 */
import inView from '@/util/inView';

/**
 * @augments milkmidi
 * @version 1.0.0
 * @example
 * <div v-inview="visibilityChangedHandler"></div>
 * <div v-inview="{
 * callback: visibilityChanged,
 * options: {
 *   threshold: 0.3,
 * },
 * }">
 */
type DirectiveBinding = {
  name:string,
  value:any,
  oldValue:string,
  expression:any,
  modifiers:Object,
}

export default {
  install(Vue) {
    if (this.installed) {
      return;
    }
    this.installed = true;
    Vue.directive('inview', {
      bind(el:HTMLElement, binding:DirectiveBinding) {
        const subscribe = inView(el).subscribe((visibility) => {
          binding.value(visibility);
        });
        el.__vue_inview__ = subscribe;
      },
      unbind(el:HTMLElement) {
        if (el.__vue_inview__) {
          el.__vue_inview__.unsubscribe();
          el.__vue_inview__ = null;
          delete el.__vue_inview__;
        }
      },
    });
  },
};

