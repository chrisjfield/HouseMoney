import apiCall from "../../helpers/apiHelper";
import receiveUser from "../Nav/navActions";

export function postUser(USER) {
  const request = apiCall("POST", "Users/PostUser", USER);

  return dispatch => {
    return request.then(json => dispatch(receiveUser(USER, true)));
  };
}
