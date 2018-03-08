import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/occupantInterfaces';
    
export interface INavProps {
    dispatch: Dispatch<{}>;
    loggedInOccupant: IUserObject;
    isLoggedIn: boolean;
}

export interface INavState {}
