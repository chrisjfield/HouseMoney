import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface ILoginProps {
    dispatch: Dispatch<{}>;
    history: any;
    user: IUserObject;
}

export interface ILoginState {
    email: string;
    password: string;
    error: Error;
    loading: boolean;
}
