import { combineEpics } from 'redux-observable';
import routesEpic from 'src/components/Routes/routesEpic';
import addTransactionRequestEpic from '../components/AddTransaction/addTransactionEpic';
import balanceRequestEpic from '../components/Balance/balanceEpic';
import houseSummaryEpic from '../components/HouseSummary/houseSummaryEpic';
import getHouseholdOccupantsRequestEpic from '../components/Occupants/occupantsEpic';
import getTransactionHistoryEpic from '../components/ViewTransactions/viewTransactionsEpic';

const combinedEpics = combineEpics(
    balanceRequestEpic,
    addTransactionRequestEpic,
    getHouseholdOccupantsRequestEpic,
    getTransactionHistoryEpic,
    houseSummaryEpic,
    routesEpic,
);

export default combinedEpics;
