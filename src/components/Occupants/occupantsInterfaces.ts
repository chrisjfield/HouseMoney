import { RouteComponentProps } from 'react-router';
import { IComponentProps, IConnectedComponentProps } from '../../interfaces/componentInterfaces';

export interface IOccupant extends IOccupantDetails {
    email: string;
    displayName: string;
}

export interface IOccupantDetails extends IUserDetails {
    occupantId: number;
}

export interface IUserDetails {
    userId: string;
    token: string;
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

export interface IOccupantProps extends IOccupantStore, IComponentProps, RouteComponentProps<string> { }

export interface IOccupantStore extends IOccupantReducer, IConnectedComponentProps { }

export interface IOccupantReducer extends IHouseholdOccupants, ILoggedInOccupant { }

export interface ILogoutDetails {
    logoutReason: LogoutReason;
}

export enum LogoutReason {
    UserTriggered = 'UserTriggered',
    Timeout = 'Timeout',
    InvalidPassthrough = 'InvalidPassthrough',
}
