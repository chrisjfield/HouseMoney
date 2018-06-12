import { Action, Dispatch } from 'redux';

export interface IErrorMessageProps extends IErrorMessageStore {
    dispatch: Dispatch<Action>;
}

export interface IErrorMessageState extends IErrorMessageStore { }

export interface IErrorMessageStore extends IErrorMessageReducer { }

export interface IErrorMessageReducer {
    errorMessageText: string;
}
