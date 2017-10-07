import { Dispatch } from 'redux';
    
export interface ErrorMessageProps {
    dispatch: Dispatch<{}>;
    history: any;
    errorMessageText: string;
}

export interface ErrorMessageState {
    errorMessageText: string;
}
