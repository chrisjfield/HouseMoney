import apiCall from "../../helpers/apiHelper";

// Export Actions
export const RECEIVE_USER = "RECEIVE_USER";

export function postUser(USER) {
  const request = apiCall("POST", "Users/PostUser", USER);

  return dispatch => {
    return request.then(json => dispatch(receiveUser(USER, true)));
  };
}

function receiveUser(USER, isLoggedIn) {
  //ED! Need to add in a get user if needed here!
  return {
    type: RECEIVE_USER,
    USER,
    isLoggedIn,
    receivedAt: Date.now()
  };
}

export function loginUser(LOGIN) {
  const request = apiCall(
    "GET",
    "Users/GetSingleUser",
    null,
    `emailAddress=${LOGIN.EMAILADDRESS}&password=${LOGIN.PASSWORD}`
  );

  return dispatch => {
    return request.then(json => dispatch(receiveUser(LOGIN, true)));
  };
}

/* working api call
fetch(`http://localhost:58399/api/Users/GetUserInformation`)
        .then(response => response.json())
        .then(json => dispatch(receiveUser(USER, json)));
    }; 
*/
