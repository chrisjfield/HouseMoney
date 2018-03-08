import { IComponentProps } from '../../interfaces/componentInterfaces';
import { ITransactionSummaryObject } from '../../interfaces/transactionInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';
    
export interface IHouseSummaryProps extends IComponentProps {
    loggedInOccupant: IOccupant;
}

export interface IHouseSummaryState {
    occupantDataReturned: boolean;
    occupantData: IOccupant[];
    gridDataReturned: boolean;
    gridData: ITransactionSummaryObject[]; // ED! Need to def these objs
}
