import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import * as math from 'mathjs';
import * as React from 'react';
import { IBalanceItemProps, IBalanceOccupant } from './balanceInterfaces';
import balanceStyles from './balanceStyles';

const BalanceItem: React.StatelessComponent<IBalanceItemProps> = (props) => {
    const debt = math.round(props.balance.gross, 2);
    const debtor: IBalanceOccupant = { displayName: props.balance.debtorDisplayName };
    let balanceItemClass;

    if (debt < 0) {
        balanceItemClass = props.classes.balanceItemNegative;
    } else if (debt > 0) {
        balanceItemClass = props.classes.balanceItemPositive;
    } else {
        balanceItemClass = props.classes.balanceItemNeutral;
    }

    const balanceElement = (
        <ListItem
            key={'Debt_' + debtor.displayName}
            style={{
                cursor: 'auto',
                width: 'auto',
            }}
            className={balanceItemClass}
        >
            <ListItemText primary={debtor.displayName + ': £' + Number(math.abs(debt)).toFixed(2)} />
            <ListItemIcon>
                <Avatar
                    key={'Avatar_' + debtor.displayName}
                    className={balanceItemClass}
                >
                    {debtor.displayName.charAt(0).toUpperCase()}
                </Avatar>
            </ListItemIcon>
        </ListItem>
    );
    return balanceElement;
};

export default withStyles(balanceStyles)(BalanceItem);
