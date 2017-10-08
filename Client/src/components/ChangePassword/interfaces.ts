import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';
    
export interface ChangePasswordProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
}

export interface ChangePasswordState {
    passwordUpdate: {
        userId: string,
        CURRENTPASSWORD: string,
        NEWPASSWORD: string,
        NEWPASSWORDCONFIRM: string,
    };
    passwordUpdating: boolean;
    passwordUpdated: boolean;
}
