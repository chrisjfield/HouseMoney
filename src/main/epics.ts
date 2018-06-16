import { combineEpics } from 'redux-observable';
import addTransactionRequestEpic from '../components/AddTransaction/addTransactionEpic';
import balanceRequestEpic from '../components/Balance/balanceEpic';
import getHouseholdOccupantsRequestEpic from '../components/Occupants/occupantsEpic';

const combinedEpics = combineEpics(balanceRequestEpic, addTransactionRequestEpic, getHouseholdOccupantsRequestEpic);

export default combinedEpics;
