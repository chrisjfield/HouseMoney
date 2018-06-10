import { createAction } from '../../helpers/actionCreator';

export enum errorMessageActionTypes {
    ADD_ERROR = 'ADD_ERROR',
    REMOVE_ERROR = 'REMOVE_ERROR',
}

export const addError = (errorMessageText: string) => createAction(errorMessageActionTypes.ADD_ERROR, errorMessageText);
export const removeError = () => createAction(errorMessageActionTypes.REMOVE_ERROR);
