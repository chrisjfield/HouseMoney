import { Action, Dispatch, ActionWithPayload } from 'redux';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export interface INavProps {
    dispatch: Dispatch<Action>;
    receiveOccupant: ActionWithPayload;
    loggedInOccupant: IOccupant;
    isLoggedIn: boolean;
}
