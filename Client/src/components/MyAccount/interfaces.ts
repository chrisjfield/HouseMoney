import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';
    
export interface IMyAccountProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
    editing: boolean;
    deleting: boolean;
}

export interface IMyAccountState {
    userUpdate: {
        currentUser: string,
        email: string,
        displayName: string,
    };
    userEditing: boolean;
    userEdited: boolean;
    userDeleting: boolean;
    error: Error;
}
