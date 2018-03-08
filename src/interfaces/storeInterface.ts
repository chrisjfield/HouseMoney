import { IOccupantsProps } from '../components/Occupants/occupantsInterfaces';
import { IErrorMessageProps } from '../components/ErrorMessage/interfaces';

export interface IStore {
    occupantsReducer: IOccupantsProps;
    errorMessageReducer: IErrorMessageProps;
}
