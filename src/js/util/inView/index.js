/**
 * @author Markvann
 * @version 1.0.0
 */

import { Observable } from 'rxjs/Rx';

export type InViewType = {
  threshold: number,
  offset: {
    top:number,
    left: number,
    right: number,
    bottom: number,
  }
}

const DEFAULT_OPTIONS:InViewType = {
  offset: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  threshold: 0,
};

const checkView = (element:HTMLElement, options):boolean => {
  const { top, left, right, bottom, width, height } = element.getBoundingClientRect();

  const intersection = {
    top: bottom,
    left: right,
    right: window.innerWidth - left,
    bottom: window.innerHeight - top,
  };

  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height,
  };

  return intersection.top > (options.offset.top + threshold.y)
    && intersection.left > (options.offset.left + threshold.x)
    && intersection.right > (options.offset.right + threshold.x)
    && intersection.bottom > (options.offset.bottom + threshold.y);
};

const scroll:Observable = Observable.fromEvent(window, 'scroll');
const resize:Observable = Observable.fromEvent(window, 'resize');
const loaded:Observable = Observable.fromEvent(window, 'load');
const mutate:Observable = Observable.create((observer) => {
  if (!window.MutationObserver) {
    observer.complete();
    return;
  }
  window.addEventListener('DOMContentLoaded', () => {
    new MutationObserver(observer.next)
      .observe(document.body, {
        attributes: true,
        chilkList: true,
        subtree: true,
      });
    observer.next();
  });
});

const source:Observable = Observable
  .of(scroll, resize, loaded, mutate)
  .concatAll()
  .debounceTime(100);

/**
 * @param {HTMLElement|strint} element
 */
export default (element:HTMLElement | string, options:InViewType = {}):Observable => {
  const ele:HTMLElement = typeof element === 'string'
    ? document.querySelector(element)
    : element;

  const customOptions:InViewType = { ...DEFAULT_OPTIONS, ...options };
  return source.map(() => checkView(ele, customOptions))
    .startWith(checkView(ele, customOptions))
    .distinctUntilChanged();
};
