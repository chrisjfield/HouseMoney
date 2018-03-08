import { Dispatch } from 'redux';
import { IOccupant } from '../Occupants/occupantsInterfaces';
    
export interface INavProps {
    dispatch: Dispatch<{}>;
    loggedInOccupant: IOccupant;
    isLoggedIn: boolean;
}
