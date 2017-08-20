import apiCall from "../../helpers/apiHelper";
import receiveUser from "../Nav/navActions";

export function loginUser(LOGIN) {
  const request = apiCall(
    "GET",
    "Users/GetSingleUser",
    null,
    `emailAddress=${LOGIN.EMAILADDRESS}&password=${LOGIN.PASSWORD}`
  );

  return dispatch => {
    return request.then(json =>
      dispatch(getUser(LOGIN.EMAILADDRESS, LOGIN.PASSWORD))
    );
  };
}

export function getUser(emailAddress, password) {
  const request = apiCall(
    "GET",
    "Users/GetSingleUser",
    null,
    "emailAddress=" + emailAddress + "&password=" + password
  );

  return dispatch => {
    return request.then(json => dispatch(receiveUser(json, true)));
  };
}
