import * as React from 'react';
import { IBalanceProps, IBalance, IBalanceOccupant } from './balanceInterfaces';
import { customTheme } from '../../themes';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import * as math from 'mathjs';

const BalanceList: React.StatelessComponent<IBalanceProps> = (props) => {
    const me = props.loggedInOccupant.occupantId;
    const balanceList = (<List>{
        props.balanceArray
            .filter((balanceItem: IBalance) =>
                balanceItem.creditorOccupantId === me && balanceItem.debtorOccupantId !== me)
            .map(BalanceItem)}
    </List>);
    return balanceList;
};

const BalanceItem: React.StatelessComponent<IBalance> = (balanceItem: IBalance) => {
    const debt = math.round(balanceItem.gross, 2);
    const debtor: IBalanceOccupant = { displayName: balanceItem.debtorDisplayName };
    let colorToSet;

    if (debt < 0) {
        colorToSet = customTheme.negativeColor;
    } else if (debt > 0) {
        colorToSet = customTheme.positiveColor;
    } else {
        colorToSet = customTheme.neutralColor;
    }

    const balanceElement = (
        <ListItem
            key={'Debt_' + debtor.displayName}
            style={{
                color: colorToSet,
                cursor: 'auto',
                width: 'auto',
                overflow: 'hidden',
            }}
            leftAvatar={
                <Avatar
                    key={'Avatar_' + debtor.displayName}
                    style={{ backgroundColor: colorToSet }}
                >
                    {debtor.displayName.charAt(0).toUpperCase()}
                </Avatar>
            }
            primaryText={debtor.displayName + ': £' + Number(math.abs(debt)).toFixed(2)}
        />
    );
    return balanceElement;
};

export default BalanceList;
