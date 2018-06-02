import { IAddTransactionStore } from '../components/AddTransaction/transactionsInterfaces';
import { IBalanceStore } from '../components/Balance/balanceInterfaces';
import { IErrorMessageStore } from '../components/ErrorMessage/errorMessageInterfaces';
import { IHouseSummaryStore } from '../components/HouseSummary/houseSummaryInterfaces';
import { ILoadingStore } from '../components/Loading/loadingInterfaces';
import { IOccupantStore } from '../components/Occupants/occupantsInterfaces';
import { IViewTransactionsStore } from '../components/ViewTransactions/viewTransactionsInterfaces';

export interface IStore {
    occupantsReducer: IOccupantStore;
    errorMessageReducer: IErrorMessageStore;
    loadingReducer: ILoadingStore;
    balanceReducer: IBalanceStore;
    transactionsReducer: IAddTransactionStore;
    viewTransactionsReducer: IViewTransactionsStore;
    houseSummaryReducer: IHouseSummaryStore;
}
