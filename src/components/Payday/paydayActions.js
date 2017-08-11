import apiCall from "../../helpers/apiHelper";

// Export Actions
export const RECEIVE_PAYDAY_USER_LIST = "RECEIVE_PAYDAY_USER_LIST";

export function getUserList() {
  const request = apiCall("GET", "Users/GetUserInformation");

  return dispatch => {
    return request.then(json => dispatch(receiveUserList(json)));
  };
}

function receiveUserList(PAYDAY_USER_LIST) {
  return {
    type: RECEIVE_PAYDAY_USER_LIST,
    PAYDAY_USER_LIST,
    receivedAt: Date.now()
  };
}
