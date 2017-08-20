import apiCall from "../../helpers/apiHelper";
import receiveUser from "../Nav/navActions";

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
