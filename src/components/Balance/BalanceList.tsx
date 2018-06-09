import Avatar from '@material-ui/core/Avatar/Avatar';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import * as math from 'mathjs';
import React from 'react';
import { customTheme } from '../../themes';
import { IBalance, IBalanceOccupant, IBalanceProps } from './balanceInterfaces';

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
            }}>
            <ListItemText primary={debtor.displayName + ': £' + Number(math.abs(debt)).toFixed(2)} />
            <ListItemIcon>
                <Avatar
                    key={'Avatar_' + debtor.displayName}
                    style={{ backgroundColor: colorToSet }}>
                    {debtor.displayName.charAt(0).toUpperCase()}
                </Avatar>
            </ListItemIcon>
        </ListItem>
    );
    return balanceElement;
};

export default BalanceList;
