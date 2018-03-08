import { Dispatch } from 'redux';
import { History } from 'history';
import { ILoggedInOccupant } from '../components/Occupants/occupantsInterfaces';

export interface IComponentProps {
    dispatch: Dispatch<Function>;
    history: History;
}

export interface IConnectedComponentProps extends IComponentProps, ILoggedInOccupant { }
