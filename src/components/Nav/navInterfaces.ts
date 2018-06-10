import { Action, Dispatch } from 'redux';
import { ILoggedInOccupant } from '../Occupants/occupantsInterfaces';

export interface INavProps extends ILoggedInOccupant {
    dispatch: Dispatch<Action>;
}
