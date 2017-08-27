import apiCall from "../../helpers/apiHelper";
import receiveUser from "../Nav/navActions";
import { ADD_ERROR } from "../ErrorMessage/errorMessageActions";

export function loginUser(LOGIN) {
  const request = apiCall(
    "GET",
    "Users/GetSingleUser",
    null,
    `emailAddress=${LOGIN.EMAILADDRESS}&password=${LOGIN.PASSWORD}`
  );

  return dispatch => {
    return request
      .then(json =>
        dispatch(
          receiveUser(
            {
              EMAILADDRESS: json.EMAILADDRESS,
              FIRSTNAME: json.FIRSTNAME,
              SURNAME: json.SURNAME
            },
            true
          )
        )
      )
      .catch(error => {
        console.log(error);
        dispatch(receiveUser({}, false));

        // Dispatch the generic "global errors" action
        // This is what makes its way into state.errors
        dispatch({ type: ADD_ERROR, error: error });
      });
  };
}
