import List from '@material-ui/core/List/List';
import * as React from 'react';
import { IBalance, IBalanceProps } from './balanceInterfaces';
import BalanceItem from './BalanceItem';

const BalanceList: React.StatelessComponent<IBalanceProps> = (props) => {
    const me = props.loggedInOccupant.occupantId;
    const balanceList = (
        <List>
            {props.balanceArray
                .filter((balance: IBalance) =>
                    balance.creditorOccupantId === me && balance.debtorOccupantId !== me)
                .map((balance: IBalance) =>
                    <BalanceItem
                        key={'Debt_' + balance.debtorOccupantId}
                        balance={balance}
                        classes={props.classes} />,
            )}
        </List>
    );
    return balanceList;
};

export default BalanceList;
