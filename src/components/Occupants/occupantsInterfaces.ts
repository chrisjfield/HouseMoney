import { RouteComponentProps } from 'react-router';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';

export interface IOccupant {
    occupantId: number;
    userId: string;
    token: string;
    email: string;
    displayName: string;
}

export interface ILoggedInOccupantDetails {
    loggedInOccupant: IOccupant;
}

export interface ILoggedInOccupantFlag {
    isLoggedIn: boolean;
}

export interface IHouseholdOccupants {
    householdOccupantsArray: IOccupant[];
}

export interface ILoggedInOccupant extends ILoggedInOccupantDetails, ILoggedInOccupantFlag { }

export interface IOccupantProps extends IOccupantStore, IConnectedComponentProps, RouteComponentProps<string> { }

export interface IOccupantStore extends IHouseholdOccupants, ILoggedInOccupant { }

export interface ILogoutDetails {
    logoutReason: LogoutReason;
}

export enum LogoutReason {
    UserTriggered = 'UserTriggered',
    Timeout = 'Timeout',
    InvalidPassthrough = 'InvalidPassthrough',
}
