import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ILoadingProps } from '../Loading/loadingInterfaces';
import { IOccupant, ILoggedInOccupantDetails } from '../Occupants/occupantsInterfaces';

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

export interface ITransactionReducer {
    transactionsAdded: boolean;
}

export interface IAddTransactionProps extends IConnectedComponentProps, IAddTransactionStore { }

export interface IAddTransactionStore extends ITransactionReducer, ILoggedInOccupantDetails, ILoadingProps {
    householdOccupantsArray: IAddTransactionOccupant[];
}
