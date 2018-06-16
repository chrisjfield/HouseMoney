import * as math from 'mathjs';
import { IAddTransactionOccupant, ITransaction } from './transactionsInterfaces';

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
