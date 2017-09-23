// Export Actions
export const RECEIVE_USER = "RECEIVE_USER";

function receiveUser(USER, isLoggedIn) {
  //ED! Need to add in a get user if needed here!
  return {
    type: RECEIVE_USER,
    USER,
    isLoggedIn,
    receivedAt: Date.now()
  };
}

export default receiveUser;
