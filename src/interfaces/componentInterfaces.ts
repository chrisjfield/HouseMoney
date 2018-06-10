import { History } from 'history';
import { Action, Dispatch } from 'redux';
import { ILoggedInOccupantDetails } from '../components/Occupants/occupantsInterfaces';
import { ILoadingProps } from '../components/Loading/loadingInterfaces';

export interface IComponentProps {
    dispatch: Dispatch<Action>;
    history: History;
}

export interface IConnectedComponentProps extends IComponentProps, ILoggedInOccupantDetails, ILoadingProps { }
