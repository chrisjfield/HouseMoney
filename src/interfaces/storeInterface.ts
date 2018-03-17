import { IOccupantProps } from '../components/Occupants/occupantsInterfaces';
import { IErrorMessageProps } from '../components/ErrorMessage/interfaces';
import { ILoadingProps } from '../components/Loading/loadingInterfaces';

export interface IStore {
    occupantsReducer: IOccupantProps;
    errorMessageReducer: IErrorMessageProps;
    loadingReducer: ILoadingProps;
}
