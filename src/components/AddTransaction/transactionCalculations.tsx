import { ITransaction, IAddTransactionOccupant } from './transactionsInterfaces';
import * as math from 'mathjs';

export function createTransactionArray(
    debtorArray: IAddTransactionOccupant[],
    creditorOccupantId: number,
    dividedGross: number,
    isoDate: Date,
    description: string,
) {
    const payday: ITransaction[] = debtorArray
        .map((element: IAddTransactionOccupant) => {
            const transaction = {
                debtor: element.occupantId,
                creditor: creditorOccupantId,
                gross: dividedGross,
                reference: description,
                date: isoDate,
                enteredBy: creditorOccupantId,
            };
            return transaction;
        })
        .filter(x => x.debtor !== x.creditor);

    // TODO: Can you bind this ED!? Or maybe what is calling these two? something from Functional Programming
    return payday;
}

export function divideValueBetweenDebtors(value: number, numberOfDebtors: number) {
    const dividedGross: number = math
        .chain(value)
        .divide(numberOfDebtors)
        .round(2)
        .done();
    return dividedGross;
}
