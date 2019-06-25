/* eslint max-len:0 */
import { TweenMax, Power2 } from 'gsap';
import { getElementPosition } from './';

/**
 *
 * @param {string|number} value
 * @param {number} offset
 * @param {number} duration
 * @return {Promise}
 */
export const smoothScroll = (value:string|number, offset:number = 0, duration:number = 0.35) => new Promise(((resolve) => {
  if (typeof value === 'string') {
    // eslint-disable-next-line
    value = getElementPosition(value).top;
  }
  TweenMax.to(
    window,
    duration,
    {
      scrollTo: {
        y: value + offset,
        autoKill: false,
      },
      ease: Power2.easeOut,
      onComplete: resolve,
    },
  );
}));
