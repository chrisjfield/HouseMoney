import { IAddTransactionReducer } from '../components/AddTransaction/transactionsInterfaces';
import { IBalanceReducer } from '../components/Balance/balanceInterfaces';
import { IErrorMessageReducer } from '../components/ErrorMessage/errorMessageInterfaces';
import { IHouseSummaryReducer } from '../components/HouseSummary/houseSummaryInterfaces';
import { ILoadingReducer } from '../components/Loading/loadingInterfaces';
import { IOccupantReducer } from '../components/Occupants/occupantsInterfaces';
import { IViewTransactionsReducer } from '../components/ViewTransactions/viewTransactionsInterfaces';

export interface IStore {
    occupantsReducer: IOccupantReducer;
    errorMessageReducer: IErrorMessageReducer;
    loadingReducer: ILoadingReducer;
    balanceReducer: IBalanceReducer;
    transactionsReducer: IAddTransactionReducer;
    viewTransactionsReducer: IViewTransactionsReducer;
    houseSummaryReducer: IHouseSummaryReducer;
}
