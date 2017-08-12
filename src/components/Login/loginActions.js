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
    return request.then(json => dispatch(receiveUser(LOGIN, true)));
  };
}
