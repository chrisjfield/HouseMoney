export interface ITransactionObject {
    CREDITOR: string;
    DEBTOR: string;
    GROSS: number;
    DATE: Date;
    REFERENCE: string;
}

export interface ITransactionSummaryObject {
    USER: string;
}
