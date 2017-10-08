import { Dispatch } from 'redux';
    
export interface IErrorMessageProps {
    dispatch: Dispatch<{}>;
    history: any;
    errorMessageText: string;
}

export interface IErrorMessageState {
    errorMessageText: string;
}
