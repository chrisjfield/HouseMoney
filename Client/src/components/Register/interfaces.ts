import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IUserAuthenticationObject } from '../../interfaces/userInterfaces';
    
export interface IRegisterProps extends IComponentProps {
    registering: boolean;
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

export interface IRegisterUserObject extends IUserAuthenticationObject {
    confirmPassword: string;
}
