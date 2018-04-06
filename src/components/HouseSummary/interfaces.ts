import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export interface IHouseSummaryProps extends IConnectedComponentProps { }

export interface IHouseSummaryState {
    occupantDataReturned: boolean;
    occupantData: IOccupant[];
    gridDataReturned: boolean;
    gridData: ITransactionSummaryObject[]; // ED! Need to def these objs
}

export interface ITransactionSummaryObject {
    creditor: number;
    debtor: number;
    gross: number;
}
