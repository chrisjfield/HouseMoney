import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';
    
export interface IChangePasswordProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
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
