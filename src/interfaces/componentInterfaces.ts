import { History } from 'history';
import { Action, Dispatch } from 'redux';
import { ILoggedInOccupant } from '../components/Occupants/occupantsInterfaces';

export interface IComponentProps {
    dispatch: Dispatch<Action>;
    history: History;
}

export interface IConnectedComponentProps extends IComponentProps, ILoggedInOccupant { }
