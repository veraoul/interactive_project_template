/* eslint max-len:0 */
/**
 * @author milkmidi
 * @version 1.0.5
 */
import { Observable } from 'rxjs';
import { getElementPosition } from './index';

const { fromEvent } = Observable;

export const resize = (debounceTime:number = 150):Observable => {
  const rxResize =
    fromEvent(window, 'resize')
      .debounceTime(debounceTime)
      .startWith(window)
      .map(() => ({ innerWidth: window.innerWidth, innerHeight: window.innerHeight }));

  const rxOrientationchange =
    fromEvent(window, 'orientationchange')
      .delay(500) // ios Line Webview issus
      .map(() => ({ innerWidth: window.innerWidth, innerHeight: window.innerHeight }));

  return Observable.merge(rxResize, rxOrientationchange)
    .distinctUntilChanged((prev, curr) =>
      (prev.innerWidth === curr.innerWidth) && (prev.innerHeight === curr.innerHeight));
};

export const scrollPercent = ():Observable =>
  Observable.fromEvent(window, 'scroll')
    .startWith(window)
    .map(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.clientHeight;
      const winHeight = window.innerHeight;
      return scrollTop / (docHeight - winHeight);
    });

const mouseEventToCoordinate = (mouseEvent:MouseEvent):{x:number, y:number} => {
  mouseEvent.preventDefault();
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };
};
const touchEventToCoordinate = (touchEvent:TouchEvent):{x:number, y:number} =>
// console.log(touchEvent.preventDefault);
  ({ x: touchEvent.changedTouches[0].clientX, y: touchEvent.changedTouches[0].clientY });

export const mouseDown = (el:HTMLElement) => {
  const mouseSource = fromEvent(el, 'mousedown').map(mouseEventToCoordinate);
  const touchSource = fromEvent(el, 'touchstart').map(touchEventToCoordinate);
  return mouseSource.merge(touchSource);
};

export const mouseMove = (el:HTMLElement) => {
  const mouseSource = fromEvent(el, 'mousemove').map(mouseEventToCoordinate);
  const touchSource = fromEvent(el, 'touchmove').map(touchEventToCoordinate);
  return mouseSource.merge(touchSource);
};

export const mouseUp = (el:HTMLElement) => {
  const mouseSource = fromEvent(el, 'mouseup').map(mouseEventToCoordinate);
  const touchSource = fromEvent(el, 'touchend').map(touchEventToCoordinate);
  return mouseSource.merge(touchSource);
};

/**
 * https://codepen.io/HunorMarton/post/handling-complex-mouse-and-touch-events-with-rxjs
 * @param {HTMLElement} el
 */
export const getMouseObservables = (el:HTMLElement):{start:Observable, move:Observable, end:Observable} => (
  {
    start: mouseDown(el),
    move: mouseMove(el),
    end: mouseUp(el),
  }
);

export const drag = (el:HTMLElement):Observable => {
  const { start, move, end } = getMouseObservables(el);
  return start.mergeMap(dragStartEvent =>
    move.takeUntil(end)
      .map((dragEvent) => {
        const x = dragEvent.x - dragStartEvent.x;
        const y = dragEvent.y - dragStartEvent.y;
        return { x, y };
      }));
};

export const drop = (el:HTMLElement):Observable => {
  const { start, end } = getMouseObservables(el);
  return start.mergeMap(dragStartEvent =>
    end.first()
      .map((dragEndEvent) => {
        const x = dragEndEvent.x - dragStartEvent.x;
        const y = dragEndEvent.y - dragStartEvent.y;
        return { x, y };
      }));
};

export const dragMovement = (el:HTMLElement):Observable => {
  const { start, move, end } = getMouseObservables(el);
  return start.mergeMap(() => {
    let prevX:number = 0;
    let prevY:number = 0;
    return move.map((dragMoveEvent) => {
      const x:number = prevX ? dragMoveEvent.x - prevX : 0;
      const y:number = prevY ? dragMoveEvent.y - prevY : 0;
      prevX = dragMoveEvent.x;
      prevY = dragMoveEvent.y;
      return { x, y };
    }).takeUntil(end);
  });
};

export const scrollSpy = (domName:string) => {
  let rxDom;
  if (typeof domName === 'string') {
    const querySectionDOM = Array.prototype.slice.call(document.querySelectorAll(domName));
    rxDom = Observable.of(querySectionDOM);
  } else if (Array.isArray(domName)) {
    rxDom = Observable.of(domName);
  } else {
    throw new Error('unknow type');
  }
  return fromEvent(window, 'scroll')
    .debounceTime(10)
    .startWith(-1)
    .withLatestFrom(rxDom, (main, dom) => dom)
    .map((doms) => {
      const scrollPosition = window.pageYOffset;
      for (let i = doms.length - 1; i >= 0; i--) {
        const element = doms[i];
        const { top } = getElementPosition(element);
        if (scrollPosition > top) {
          return i;
        }
      }
      return -1;
    })
    .distinctUntilChanged();
};
