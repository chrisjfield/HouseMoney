import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface IUserChipProps {
    dispatch: Dispatch<{}>; // ED! These should be extended from another interface
    history: any;
    user: IUserObject;
    styles: any;
}

export interface IUserChipState {}
