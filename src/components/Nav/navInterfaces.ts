import { Action, Dispatch } from 'redux';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export interface INavProps {
    dispatch: Dispatch<Action>;
    loggedInOccupant: IOccupant;
    isLoggedIn: boolean;
}
