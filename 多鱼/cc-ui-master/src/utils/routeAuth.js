import * as storage from './browserStorage.js';

export const authenticated = (sss) => {

  const pathName = sss.location.pathname;
  let usr = null;
  if (window.localStorage.getItem('usr') !== 'null' && window.localStorage.getItem('usr') !== 'undefined' && window.localStorage.getItem('usr') !== '') {
    usr = JSON.parse(storage.get('usr'));
  }
  if (pathName === '/login' && usr) {
    return false;
  } else if (pathName === '/login' && !usr) {
    return true;
  } else if (!usr) {
    return false;
  } else {
    return true;
  }
};
