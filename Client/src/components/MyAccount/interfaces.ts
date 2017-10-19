import { Action } from 'redux';
import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface IMyAccountProps extends IComponentProps {
    loggedInUser: IUserObject;
    editing: boolean;
    deleting: boolean;
}

export interface IMyAccountState {
    userUpdate: IUserObject;
    userEditing: boolean;
    userEdited: boolean;
    userDeleting: boolean;
    error: Error;
}

export interface IMyAccountAction extends Action {
    editing: boolean;
}

export interface IMyAccountReducerState {
    editing: boolean;
    deleting: boolean;
}
