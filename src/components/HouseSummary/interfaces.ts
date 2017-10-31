import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IUserObject } from '../../interfaces/userInterfaces';
import { ITransactionSummaryObject } from '../../interfaces/transactionInterfaces';
    
export interface IHouseSummaryProps extends IComponentProps {
    loggedInUser: IUserObject;
}

export interface IHouseSummaryState {
    userDataReturned: boolean;
    userData: IUserObject[];
    gridDataReturned: boolean;
    gridData: ITransactionSummaryObject[]; // ED! Need to def these objs
}
