import { Action } from 'redux';

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

export interface IOccupantLoggedIn extends ILoggedInOccupant { }

export interface IReceiveOccupantAction extends Action, ILoggedInOccupant { }
