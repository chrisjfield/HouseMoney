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
                creditorOccupantId,
                debtorOccupantId: element.occupantId,
                gross: dividedGross,
                reference: description,
                date: isoDate,
                enteredByOccupantId: creditorOccupantId,
            };
            return transaction;
        })
        .filter(x => x.debtorOccupantId !== x.creditorOccupantId);

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
