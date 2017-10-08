import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';
    
export interface LoginProps {
    dispatch: Dispatch<{}>;
    history: any;
    user: UserObject;
}

export interface LoginState {
    email: string;
    password: string;
    error: Error;
    loading: boolean;
}

export interface UserResponseObject {
    email: string;
    password: string;
    uid: string;
    displayName: string;
}
