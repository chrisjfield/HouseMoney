import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';
    
export interface INavProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
    isLoggedIn: boolean;
}

export interface INavState {}
