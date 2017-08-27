// Export Actions
export const ADD_ERROR = "ADD_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";

export function addError(error) {
  return {
    type: ADD_ERROR,
    payload: error
  };
}

export function removeError(error) {
  return {
    type: REMOVE_ERROR,
    payload: error
  };
}
