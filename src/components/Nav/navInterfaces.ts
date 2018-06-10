import { Action, Dispatch, AnyAction } from 'redux';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export interface INavProps {
    dispatch: Dispatch<Action>;
    receiveOccupant: AnyAction;
    loggedInOccupant: IOccupant;
    isLoggedIn: boolean;
}
