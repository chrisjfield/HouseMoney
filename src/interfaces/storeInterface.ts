import { IOccupantProps } from '../components/Occupants/occupantsInterfaces';
import { IErrorMessageProps } from '../components/ErrorMessage/interfaces';

export interface IStore {
    occupantsReducer: IOccupantProps;
    errorMessageReducer: IErrorMessageProps;
}
