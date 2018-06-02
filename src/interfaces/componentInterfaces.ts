import { History } from 'history';
import { Action, Dispatch } from 'redux';
import { ILoggedInOccupant } from '../components/Occupants/occupantsInterfaces';

export interface IComponentProps {
    dispatch: Dispatch<Action> | any; // TODO: ED! Figure out how to remove this any
    history: History;
}

export interface IConnectedComponentProps extends IComponentProps, ILoggedInOccupant { }
