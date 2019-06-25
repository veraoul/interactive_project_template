/* eslint no-console:0 */
const gaPath = '/';
const gaID = 'UA-xxxxxxxxx-x';
export const gaPage = (page:string):void => {
  if (!page) {
    return;
  }
  gtag('config', gaID, {
    page_path: `${gaPath}${page}.html`,
  });
  console.log(`%c gaPage ${gaPath}${page}.html `, 'background:dimgray;color:cyan');
  /* const url = `${gaPath}${page}.html`;
  dataLayer.push({
    event: 'Pageview',
    url,
  });
  console.log(`%c GAPV ${url} `, 'background:dimgray;color:cyan'); */
};


export const gaEvent = (label:string) => {
  gtag('event', 'click', {
    event_category: 'site',
    event_label: `${gaPath}${label}`,
  });
  console.log(`%c gaEvent label: ${gaPath}${label}`, 'background:dimgray;color:yellow');
};
