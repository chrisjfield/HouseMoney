import { Action } from 'redux';

export interface IOccupant {
    householdId: number;
    occupantId: number;
    userId: string;
    token: string;
    email: string;
    displayName: string;
}

export interface IOccupantsProps {
    loggedInOccupant: IOccupant;
    isLoggedIn: boolean;
}

export interface IOccupantLoggedIn extends IOccupantsProps { }

export interface IReceiveOccupantAction extends Action, IOccupantsProps { }
