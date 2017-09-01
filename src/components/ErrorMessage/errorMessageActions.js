// Export Actions
export const ADD_ERROR = "ADD_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";

export function addError(errorMessageText) {
  return {
    type: ADD_ERROR,
    payload: errorMessageText
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR
  };
}
