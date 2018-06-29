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
    let balanceTextClass;

    if (debt < 0) {
        balanceItemClass = props.classes.balanceItemNegative;
        balanceTextClass = props.classes.balanceTextNegative;
    } else if (debt > 0) {
        balanceItemClass = props.classes.balanceItemPositive;
        balanceTextClass = props.classes.balanceTextPositive;
    } else {
        balanceItemClass = props.classes.balanceItemNeutral;
        balanceTextClass = props.classes.balanceTextNeutral;
    }

    const balanceElement = (
        <ListItem
            key={'Debt_' + debtor.displayName}
            style={{
                cursor: 'auto',
                width: 'auto',
                display: 'inline-flex',
            }}
        >
            <ListItemText
                primary={debtor.displayName}
                disableTypography={true}
                className={balanceTextClass}
            />
            <ListItemText
                primary={'£' + Number(math.abs(debt)).toFixed(2)}
                disableTypography={true}
                className={balanceTextClass}
            />
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
