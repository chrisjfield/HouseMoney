import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface IChangePasswordProps extends IComponentProps {
    loggedInUser: IUserObject;
}

export interface IChangePasswordState {
    passwordUpdate: {
        userId: string,
        CURRENTPASSWORD: string,
        NEWPASSWORD: string,
        NEWPASSWORDCONFIRM: string, // ED! need to sort this out as part of the user interfaces tidy up
    };
    passwordUpdating: boolean;
    passwordUpdated: boolean;
}
