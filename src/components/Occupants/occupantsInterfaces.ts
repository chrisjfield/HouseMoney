import { Action } from 'redux';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { RouteComponentProps } from 'react-router';

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

export interface IReceiveOccupantAction extends Action, ILoggedInOccupant { }

export interface IOccupantProps extends IConnectedComponentProps, RouteComponentProps<string> {}

export interface IOccupantReducer extends ILoggedInOccupant { }
