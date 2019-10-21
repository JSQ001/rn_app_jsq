import { createHashHistory } from 'history';
import * as stroge from '../utils/browserStorage';
const history = createHashHistory();


async function parseJSON(response) {
  const data = await response.json();
  return parseCount(response, data);
}

function checkStatus(response) {
  if (response && (response.status === 401 || response.status === 502)) {
    stroge.clear();
    history.push('/login');
  }

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseCount(response, data) {
  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }
  return ret;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  let cOptions = options;
  if (!cOptions) {
    cOptions = {};
  }
  if (!cOptions.credentials) {
    cOptions.credentials = 'same-origin';
  }
  if(url.indexOf('/login') === -1){
    const headersa = cOptions.headers ? cOptions.headers : {};
    cOptions.headers = {
      ...headersa,
      'X-Requested-With': 'XMLHttpRequest'
    };
  }

  // const response = await fetch(url, cOptions);
  //
  //   checkStatus(response);
  //
  //   const data = await response.json();
  //
  //   const ret = {
  //         data,
  //         headers: {},
  //       };
  //   }else{
  //   }
  //
  //   return ret;

  return fetch(url, cOptions)
    .then(checkStatus)
    .catch(err => {
      if (err !== undefined){
        //message.warning(`网络连接失败：${err.toString()}`)
      }else{
        //message.warning(`网络连接失败`)
      }
      // notification.open({
      //   message: '网络连接失败',
      //   description: err.toString(),
      //   duration: 0,
      //   icon: <Icon type="meh" style={{ color: 'gold' }} />,
      // });
      return err })
    .then(parseJSON)
    //.then(({ data, headers }) => ({ data, headers }))
    //.catch(err => ({ err }));
    .catch(error => {
      //message.error(`JSON 解析失败：${error.toString()}`)
      return error
    });
}

// export default async function request(url, options) {
//   // const ssotoken = getCookie('sso_token');
//   // const authJeader = getAuthHeader(ssotoken);
//   let cOptions = options;
//   if (!cOptions) {
//     cOptions = {};
//   }
//   if (!cOptions.credentials) {
//     cOptions.credentials = 'same-origin';
//   }
//   const response = await fetch(url, cOptions);

//   checkStatus(response);

//   const data = await response.json();

//   const ret = {
//     data,
//     headers: {},
//   };

//   if (response.headers.get('x-total-count')) {
//     ret.headers['x-total-count'] = response.headers.get('x-total-count');
//   }

//   return ret;
// }
