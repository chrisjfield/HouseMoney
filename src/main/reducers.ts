import { AnyAction, combineReducers, Reducer } from 'redux';
import transactionsReducer from '../components/AddTransaction/transactionsReducer';
import balanceReducer from '../components/Balance/balanceReducer';
import errorMessageReducer from '../components/ErrorMessage/errorMessageReducer';
import houseSummaryReducer from '../components/HouseSummary/houseSummaryReducer';
import loadingReducer from '../components/Loading/loadingReducer';
import navReducer from '../components/Nav/navReducer';
import occupantsReducer from '../components/Occupants/occupantsReducer';
import viewTransactionsReducer from '../components/ViewTransactions/viewTransactionsReducer';
import { IStore } from '../interfaces/storeInterface';

const combinedReducers: Reducer<IStore, AnyAction> = combineReducers({
    occupantsReducer,
    errorMessageReducer,
    loadingReducer,
    balanceReducer,
    transactionsReducer,
    viewTransactionsReducer,
    houseSummaryReducer,
    navReducer,
});

export default combinedReducers;
