import { Dispatch } from 'redux';
    
export interface IErrorMessageProps {
    dispatch: Dispatch<{}>;
    errorMessageText: string;
}

export interface IErrorMessageState {
    errorMessageText: string;
}
