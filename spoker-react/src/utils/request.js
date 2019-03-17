import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, options) {

  console.log('url:', url);
  console.log('options:', options);

  try {
    const response = await fetch(url, options);

    console.log('response', response);

    checkStatus(response);

    //await 异步回调方法。 以写同步的方式写异步回调
    const data = await response.json();
    
    console.log("in the request", data);

    const ret = {
      data,
      headers: {},
    };

    if (response.headers.get('x-total-count')) {
      ret.headers['x-total-count'] = response.headers.get('x-total-count');
    }

    return ret;
  } catch (error) {
    console.error(error);
    return {}
  }
}
