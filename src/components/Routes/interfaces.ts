import { IOccupant } from '../Occupants/occupantsInterfaces';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';

export interface IRoutesProps extends IConnectedComponentProps {
    isLoggedIn: boolean;
    loggedInOccupant: IOccupant;
}

export interface IRoutesComponent {
    occupantAuthed: Function;
}
