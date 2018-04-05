import { IOccupantProps } from '../components/Occupants/occupantsInterfaces';
import { IErrorMessageProps } from '../components/ErrorMessage/interfaces';
import { ILoadingProps } from '../components/Loading/loadingInterfaces';
import { IBalanceProps } from '../components/Balance/balanceInterfaces';
import { ITransactionProps } from '../components/AddTransaction/transactionsInterfaces';

export interface IStore {
    occupantsReducer: IOccupantProps;
    errorMessageReducer: IErrorMessageProps;
    loadingReducer: ILoadingProps;
    balanceReducer: IBalanceProps;
    transactionsReducer: ITransactionProps;
}
