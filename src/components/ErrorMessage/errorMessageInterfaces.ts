import { Action, Dispatch } from 'redux';

export interface IErrorMessageProps extends IErrorMessageStore {
    dispatch: Dispatch<Action>;
}

export interface IErrorMessageState extends IErrorMessageStore { }

export interface IErrorMessageStore {
    errorMessageText: string;
}

export interface IErrorMessageAction extends Action, IErrorMessageState { } // TODO: Remove these and use the auto action types! (somehow?)
