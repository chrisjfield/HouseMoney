import { ITransactionReducer } from '../components/AddTransaction/transactionsInterfaces';
import { IBalanceReducer } from '../components/Balance/balanceInterfaces';
import { IErrorMessageStore } from '../components/ErrorMessage/errorMessageInterfaces';
import { IHouseSummaryReducer } from '../components/HouseSummary/houseSummaryInterfaces';
import { ILoadingStore } from '../components/Loading/loadingInterfaces';
import { IOccupantStore } from '../components/Occupants/occupantsInterfaces';
import { IViewTransactionReducer } from '../components/ViewTransactions/viewTransactionsInterfaces';

export interface IStore {
    occupantsReducer: IOccupantStore;
    errorMessageReducer: IErrorMessageStore;
    loadingReducer: ILoadingStore;
    balanceReducer: IBalanceReducer;
    transactionsReducer: ITransactionReducer;
    viewTransactionsReducer: IViewTransactionReducer;
    houseSummaryReducer: IHouseSummaryReducer;
}
