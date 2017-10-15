import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface IChangePasswordProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: IUserObject;
}

export interface IChangePasswordState {
    passwordUpdate: {
        userId: string,
        CURRENTPASSWORD: string,
        NEWPASSWORD: string,
        NEWPASSWORDCONFIRM: string,
    };
    passwordUpdating: boolean;
    passwordUpdated: boolean;
}
