import { combineEpics } from 'redux-observable';
import balanceEpic from '../components/Balance/balanceEpic';

const combinedEpics = combineEpics(balanceEpic);

export default combinedEpics;
