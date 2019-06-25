/**
 *@author milkmidi
 *@version 1.0.2
 */

export const getIEVersion = (): number => {
  const ua = window.navigator.userAgent;

  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return -1;
};


let fbWebView:boolean = false;
let lineWebView:boolean = false;
let uiwebview:boolean = false;

if (typeof window !== 'undefined' && typeof documnet !== 'undefined') {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const { standalone } = window.navigator;
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);
  fbWebView = /fbid|fbios|fblc|fb_iab|fb4a|fbav/.test(userAgent);
  lineWebView = /line/i.test(userAgent);
  uiwebview = false;
  if (ios) {
    if (!standalone && safari) {
      // iosType = 'ios browser';
    } else if (standalone && !safari) {
      // iosType = 'ios standalone';
    } else if (!standalone && !safari) {
      // iosType = 'ios uiwebview';
      uiwebview = true;
    }
  }
}


export const isWebView = ():boolean => uiwebview || fbWebView || lineWebView;
export const isFBWebView = ():boolean => fbWebView;
export const isLineWebView = ():boolean => lineWebView;
