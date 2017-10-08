import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';
    
export interface IHouseSummaryProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
}

export interface IHouseSummaryState {
    userDataReturned: boolean;
    userData: UserObject[];
    gridDataReturned: boolean;
    gridData: object; // ED! Need to def these objs
}

export interface ITransactionSummaryObject { // ED!  Shared with Balance - collate these two
    USER: string;
    OTHERS: string;
    TOTAL: number;
}
