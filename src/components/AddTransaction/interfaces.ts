import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export interface IAddTransationProps extends IComponentProps {
    loggedInOccupant: IOccupant;
}

export interface IAddTransationState {
    occupantListReturned: boolean;
    occupantList: IAddTransactionUser[];
    addTransaction: IAddTransactionDetails;
    transactionAdded: boolean;
    transactionAdding: boolean;
    allChecked: boolean;
    error: string;
    currentDate: Date;
}

export interface IAddTransactionDetails { // ED! bring this into generic ones file
    GROSS: number|string;
    DATE: Date;
    REFERENCE: string;
}

export interface IAddTransactionUser extends IOccupant {
    checked: boolean;
}
