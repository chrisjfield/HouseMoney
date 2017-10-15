import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface INavProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: IUserObject;
    isLoggedIn: boolean;
}

export interface INavState {}
