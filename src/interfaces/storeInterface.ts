import { IOccupantProps } from '../components/Occupants/occupantsInterfaces';
import { IErrorMessageProps } from '../components/ErrorMessage/interfaces';
import { ILoadingProps } from '../components/Loading/loadingInterfaces';
import { IBalanceProps } from '../components/Balance/balanceInterfaces';
import { IAddTransactionProps } from '../components/AddTransaction/transactionsInterfaces';
import { IViewTransactionsProps } from '../components/ViewTransactions/viewTransactionsInterfaces';
import { IHouseSummaryProps } from '../components/HouseSummary/houseSummaryInterfaces';

export interface IStore {
    occupantsReducer: IOccupantProps;
    errorMessageReducer: IErrorMessageProps;
    loadingReducer: ILoadingProps;
    balanceReducer: IBalanceProps;
    transactionsReducer: IAddTransactionProps;
    viewTransactionsReducer: IViewTransactionsProps;
    houseSummaryReducer: IHouseSummaryProps;
}
