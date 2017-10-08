import { Dispatch } from 'redux';
    
export interface IRoutesProps {
    dispatch: Dispatch<{}>; // ED! These should be extended from another interface
    history: any;
    isLoggedIn: boolean;
}

export interface IRoutesState {}
