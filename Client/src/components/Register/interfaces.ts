import { Dispatch } from 'redux';
import { UserAuthenticationObject } from '../../interfaces/userInterfaces';
    
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

export interface IUserRegistrationObject extends UserAuthenticationObject {
    updateProfile: Function;
}
