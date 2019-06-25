// @flow
/* eslint no-new:0, max-len:0 */
import Vue from 'vue';
import Modal from './Modal.vue';

export type TypeModal = {
  showCloseButton: boolean,
  theme: 'light' | 'dark',
}


/**
 * @param {string|Object} component
 * @param {object} props
 * @param {HTMLElement} parent
 * @return {Vue}
 */
export const open = (component: Object | string, componentProps = {}, modalProp:TypeModal = {}, parent:HTMLElement) =>
  new Promise((resolve) => {
    const defaultParam = {
      programmatic: true,
      component,
    };
    const propsData = {
      ...defaultParam,
      ...modalProp,
      ...{
        componentProps,
      },
    };
    const ModalComponent = Vue.extend(Modal);
    const modal = new ModalComponent({
      parent,
      el: document.createElement('div'),
      propsData,
    });
    modal.$once('close', (...args) => {
      resolve(...args);
    });
  });

export default Modal;

