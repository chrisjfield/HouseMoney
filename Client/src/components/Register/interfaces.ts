import { Dispatch } from 'redux';
import { IUserAuthenticationObject } from '../../interfaces/userInterfaces';
    
export interface IRegisterProps {
    dispatch: Dispatch<{}>;
    history: any;
}

export interface IRegisterState {
    registerUser: {
        email: string,
        password: string,
        confirmPassword: string,
        displayName: string,
    };
    loading: boolean;
    error: Error;
}

export interface IUserRegistrationObject extends IUserAuthenticationObject {
    updateProfile: Function;
}
