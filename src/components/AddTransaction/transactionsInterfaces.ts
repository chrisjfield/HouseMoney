import { IComponentProps, IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant, IUserDetails } from '../Occupants/occupantsInterfaces';

export interface IAddTransationState {
    occupantsArray: IAddTransactionOccupant[];
    transactionDetails: ITransactionDetails;
    allChecked: boolean;
    transactionAdding: boolean;
    transactionAdded: boolean;
}

export interface IAddTransactionOccupant extends IOccupant {
    checked: boolean;
}

export interface ITransaction extends ITransactionDetails {
    creditorOccupantId: number;
    debtorOccupantId: number;
    enteredByOccupantId: number;
}

export interface ITransactionDetails {
    gross: number;
    reference: string;
    date: Date;
}

export interface ITransactionResponse extends ITransaction {
    transactionId: number;
}

export interface IAddTransactionRequest extends IUserDetails {
    transactionArray: ITransaction[];
}

export interface IAddTransactionProps extends IAddTransactionStore, IComponentProps { }

export interface IAddTransactionStore extends IAddTransactionReducer, IConnectedComponentProps {
    householdOccupantsArray: IAddTransactionOccupant[];
}

export interface IAddTransactionReducer {
    transactionsAdded: boolean;
}
