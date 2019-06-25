/* eslint no-mixed-operators:0 */
import { Observable } from 'rxjs';


export default (store) => {
  Observable.fromEvent(window, 'mousemove').subscribe(({ pageX, pageY }) => {
    const rangeX = (pageX / window.innerWidth * 2) - 1; // range [-1, 1]
    const rangeY = (pageY / window.innerHeight * 2) - 1; // range [-1, 1]
    store.commit('setMouseRange', { x: rangeX, y: rangeY });
  });
};

