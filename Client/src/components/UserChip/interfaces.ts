import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';
    
export interface IUserChipProps {
    dispatch: Dispatch<{}>; // ED! These should be extended from another interface
    history: any;
    user: UserObject;
}

export interface IUserChipState {}
