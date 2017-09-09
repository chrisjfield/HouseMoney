import baseURL from '../appConfig';

class APIHelper {
  static apiCall(method, endpoint, body, urlParams) {
    let customheaders = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE" // additional available OPTIONS, PATCH,
      },
      headers = new Headers(customheaders),
      calledUrl = `${baseURL}${endpoint}`;

    if (urlParams) {
      calledUrl += `?${urlParams}`;
    }

    // ED! should probably make the api base url a config or something
    return fetch(calledUrl, {
      method: method,
      mode: "cors",
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    })
      .then(response => APIHelper.checkStatus(response))
      .catch(error => {
        throw error;
      });
    /* API needs to ret something useful on catch 
    - currently for posts that fail on pk just get internal server
    - catch could do something useful with this error in that case
    */
  }

  static checkStatus(response) {
    if (response.ok && response.status === 204) {
      return true;
    } else if (response.ok) {
      return response.json();
    } else {
      const error = new Error(response.statusText);
      throw error;
    }
  }
}

export default APIHelper.apiCall;
