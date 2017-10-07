// Export Actions
export const RECEIVE_USER = "RECEIVE_USER";

function receiveUser(user, isLoggedIn) {
  return {
    type: RECEIVE_USER,
    user,
    isLoggedIn,
    receivedAt: Date.now()
  };
}

export default receiveUser;
