import { combineEpics } from 'redux-observable';
import addTransactionRequestEpic from '../components/AddTransaction/addTransactionEpic';
import balanceRequestEpic from '../components/Balance/balanceEpic';

const combinedEpics = combineEpics(balanceRequestEpic, addTransactionRequestEpic);

export default combinedEpics;
