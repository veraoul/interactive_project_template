/**
 * @augments milkmidi
 * @version 1.0.0
 * @example
 * v-ga="'gaCode'"
 * v-ga.mounted="'mountedCode'"
 * v-ga.event="'gaEvent'"
 */
import { gaPage, gaEvent } from '@/util/ga';
// https://vuejs.org/v2/guide/custom-directive.html

type DirectiveBinding = {
  name:string,
  value:string,
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
    Vue.directive('ga', {
      bind(el:HTMLElement, binding:DirectiveBinding) {
        const gaFunAlias = binding.modifiers.event ? gaEvent : gaPage;
        if (binding.modifiers.mounted) {
          gaFunAlias(binding.value);
        } else {
          el.listener = () => gaFunAlias(binding.value);
          el.addEventListener('click', el.listener);
        }
      },
      unbind(el:HTMLElement) {
        if (el.listener) {
          el.removeEventListener('click', el.listener);
        }
      },
    });
  },
};

