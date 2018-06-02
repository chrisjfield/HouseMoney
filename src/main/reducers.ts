import { combineReducers, Reducer } from 'redux';
import errorMessageReducer from '../components/ErrorMessage/errorMessageReducer';
import occupantsReducer from '../components/Occupants/occupantsReducer';
import { IStore } from '../interfaces/storeInterface';
import loadingReducer from '../components/Loading/loadingReducer';
import balanceReducer from '../components/Balance/balanceReducer';
import transactionsReducer from '../components/AddTransaction/transactionsReducer';
import viewTransactionsReducer from '../components/ViewTransactions/viewTransactionsReducer';
import houseSummaryReducer from '../components/HouseSummary/houseSummaryReducer';

const combinedReducers: Reducer<IStore> = combineReducers({
    occupantsReducer,
    errorMessageReducer,
    loadingReducer,
    balanceReducer,
    transactionsReducer,
    viewTransactionsReducer,
    houseSummaryReducer,
});

export default combinedReducers;
