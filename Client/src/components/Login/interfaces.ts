import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';
    
export interface ILoginProps {
    dispatch: Dispatch<{}>;
    history: any;
    user: UserObject;
}

export interface ILoginState {
    email: string;
    password: string;
    error: Error;
    loading: boolean;
}
