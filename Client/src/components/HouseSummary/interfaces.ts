import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/userInterfaces';
    
export interface IHouseSummaryProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: IUserObject;
}

export interface IHouseSummaryState {
    userDataReturned: boolean;
    userData: IUserObject[];
    gridDataReturned: boolean;
    gridData: object; // ED! Need to def these objs
}

export interface ITransactionSummaryObject { // ED!  Shared with Balance - collate these two
    USER: string;
    OTHERS: string;
    TOTAL: number;
}
