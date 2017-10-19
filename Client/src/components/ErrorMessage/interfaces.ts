import { IComponentProps } from '../../interfaces/componentInterfaces';
    
export interface IErrorMessageProps extends IComponentProps {
    errorMessageText: string;
}

export interface IErrorMessageState {
    errorMessageText: string;
}
