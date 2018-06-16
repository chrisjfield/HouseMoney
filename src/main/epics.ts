import { combineEpics } from 'redux-observable';
import addTransactionRequestEpic from '../components/AddTransaction/addTransactionEpic';
import balanceRequestEpic from '../components/Balance/balanceEpic';
import getHouseholdOccupantsRequestEpic from '../components/Occupants/occupantsEpic';
import getTransactionHistoryEpic from '../components/ViewTransactions/viewTransactionsEpic';

const combinedEpics = combineEpics(
    balanceRequestEpic,
    addTransactionRequestEpic,
    getHouseholdOccupantsRequestEpic,
    getTransactionHistoryEpic,
);

export default combinedEpics;
