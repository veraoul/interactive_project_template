/* eslint no-mixed-operators:0, max-len:0, no-bitwise:0, no-underscore-dangle:0 */
/**
 * @author milkmidi
 * @version 1.0.0
 * @example
 *  v-ripple
 */

const AVAILABLE_POSITIONS = ['relative', 'absolute', 'fixed'];
const checkAvailablePositions = (el:HTMLElement) => AVAILABLE_POSITIONS.indexOf(window.getComputedStyle(el).position) > -1;

export default {
  install(Vue, options = { color: '#ffffff' }) {
    if (this.installed) {
      return;
    }
    this.installed = true;
    const RIPPLE_COLOR = `${options.color}66`;
    Vue.directive('ripple', {
      bind(el:HTMLElement) {
        el.__listener__ = (event) => {
          if (!checkAvailablePositions(el)) {
            return;
          }
          if (el.getAttribute('disabled') || el.classList.contains('disabled')) {
            return;
          }
          const ripplerContainer = el.querySelector('.ripple-container');
          const {
            left: boundLeft,
            top: boundTop,
            width: boundWidth,
            height: boundHeight,
          } = el.getBoundingClientRect();
          if (ripplerContainer) {
            ripplerContainer.remove();
          }
          const rippleContainer = document.createElement('div');
          rippleContainer.style.width = `${boundWidth}px`;
          rippleContainer.style.height = `${boundHeight}px`;
          rippleContainer.className = 'ripple-container';
          el.appendChild(rippleContainer);

          // fixed the bug
          const maxLength = boundWidth > boundHeight ? boundWidth : boundHeight;
          const circleD = (maxLength * 2) | 0;
          const circleDHelf = (circleD / 2) | 0;

          const ripple = document.createElement('span');
          let x = event.offsetX;
          let y;
          if (x !== undefined) {
            y = event.offsetY;
          } else {
            x = event.clientX - boundLeft;
            y = event.clientY - boundTop;
          }
          ripple.style.width = `${circleD}px`;
          ripple.style.height = `${circleD}px`;
          ripple.style.left = `${x - circleDHelf}px`;
          ripple.style.top = `${y - circleDHelf}px`;
          ripple.style.background = RIPPLE_COLOR;
          ripple.className = 'ripple-container__circle';

          rippleContainer.appendChild(ripple);
          ripple.addEventListener('animationend', () => {
            rippleContainer.remove();
          }, false);
        };
        el.addEventListener('mousedown', el.__listener__);
      },
      unbind(el:HTMLElement) {
        if (el.__listener__) {
          el.removeEventListener('mousedown', el.__listener__);
          el.__listener__ = null;
          delete el.__listener__;
        }
      },
    });
  },
};

