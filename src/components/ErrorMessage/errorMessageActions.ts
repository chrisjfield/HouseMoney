// Export Actions
export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export function addError(errorMessageText: string) {
    return {
        errorMessageText,
        type: ADD_ERROR,
    };
}

export function removeError() {
    return {
        type: REMOVE_ERROR,
    };
}
