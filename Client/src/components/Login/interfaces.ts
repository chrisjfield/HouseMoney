import { Action } from 'redux';
import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IUserObject, IUserAuthenticationObject } from '../../interfaces/userInterfaces';
    
export interface ILoginProps extends IComponentProps {
    user: IUserObject;
    loggingIn: boolean;
}

export interface ILoginState {
    user: IUserAuthenticationObject;
    error: Error;
    loading: boolean;
}

export interface ILoginAction extends Action {
    loading: boolean;
}
