import { ActionsUnion, createAction } from '../../helpers/actionCreator';

const addError = (errorMessageText: string) => createAction(errorMessageActionTypes.ADD_ERROR, errorMessageText);
const removeError = () => createAction(errorMessageActionTypes.REMOVE_ERROR);

export const ErrorMessageActions = {
    addError,
    removeError,
};

export enum errorMessageActionTypes {
    ADD_ERROR = 'ADD_ERROR',
    REMOVE_ERROR = 'REMOVE_ERROR',
}

export type ErrorMessageActions = ActionsUnion<typeof ErrorMessageActions>;
