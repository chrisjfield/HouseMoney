import { History } from 'history';
import { Action, Dispatch } from 'redux';
import { ILoadingProps } from '../components/Loading/loadingInterfaces';
import { ILoggedInOccupantDetails } from '../components/Occupants/occupantsInterfaces';

export interface IComponentProps {
    dispatch: Dispatch<Action>;
    history: History;
}

export interface IConnectedComponentProps extends ILoggedInOccupantDetails, ILoadingProps { }
