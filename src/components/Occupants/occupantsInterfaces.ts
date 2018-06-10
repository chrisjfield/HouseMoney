import { RouteComponentProps } from 'react-router';
import { Action } from 'redux';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ActionType } from 'typesafe-actions';
import * as occupantsActions from './occupantsActions';

export interface IOccupant {
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

export type OccupantsActions = ActionType<typeof occupantsActions>;

export interface IReceiveOccupantAction extends Action, ILoggedInOccupant { }

export interface IReceiveHouseholdOccupantsAction extends Action, IHouseholdOccupants { }

export interface IOccupantProps extends IOccupantStore, IConnectedComponentProps, RouteComponentProps<string> { }

export interface IOccupantStore extends IHouseholdOccupants, ILoggedInOccupant { }

export interface IOccupantReducer extends ILoggedInOccupant, IHouseholdOccupants { }

export interface IHouseholdOccupants {
    householdOccupantsArray: IOccupant[];
}

export interface ILogoutDetails {
    logoutReason: LogoutReason;
}

export enum LogoutReason {
    UserTriggered = 'UserTriggered',
    Timeout = 'Timeout',
    InvalidPassthrough = 'InvalidPassthrough',
}
