import { Action } from 'redux';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';

export interface IOccupant {
    householdId: number;
    occupantId: number;
    userId: string;
    token: string;
    email: string;
    displayName: string;
}

export interface ILoggedInOccupant {
    loggedInOccupant: IOccupant;
    isLoggedIn: boolean;
}

export interface IOccupantLoggedIn extends ILoggedInOccupant { } // TODO: ED! Sort this mess out! 

export interface IReceiveOccupantAction extends Action, ILoggedInOccupant { }

export interface IOccupantProps extends IConnectedComponentProps {
    location: URLSearchParams; // ED! This is dumb, must be a type somewhere!
}

interface URLSearchParams {
    search: string; // also, should this be a url search for pass through auth??
}

export interface IOccupantReducer extends ILoggedInOccupant {
    location: URLSearchParams; 
}
