import apiCall from "../../helpers/apiHelper";
import receiveUser from "../Nav/navActions";

export function editUser(USER) {
  const request = apiCall("PUT", "Users/UpdateUserDetails", USER);

  return dispatch => {
    return request.then(json => dispatch(receiveUser(USER, true)));
  };
}

export function deleteUser(emailAddress) {
  const request = apiCall(
    "DELETE",
    "Users/DeleteUser",
    null,
    "emailAddress=" + emailAddress
  );

  return dispatch => {
    return request.then(json => dispatch(receiveUser({}, false)));
  };
}
