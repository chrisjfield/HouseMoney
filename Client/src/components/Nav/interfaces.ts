import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface INavProps extends IComponentProps {
    loggedInUser: IUserObject;
    isLoggedIn: boolean;
}

export interface INavState {}
