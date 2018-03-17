import * as React from 'react';
import { IBalanceProps, IBalance, IBalanceOccupant } from './balanceInterfaces';
import { customTheme } from '../../themes';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

const BalanceList: React.StatelessComponent<IBalanceProps> = (props) => {
    const me = props.loggedInOccupant.occupantId;
    const balanceList = (<List>{
        props.balance.filter((balanceItem: IBalance) => {
            balanceItem.USER === me.toString() && balanceItem.OTHERS !== me.toString();
        }, // will probably get rid of to string ^ when hooking up to new api
        ).map(BalanceItem)}
    </List>);
    return balanceList;
};

const BalanceItem: React.StatelessComponent<IBalance> = (balance: IBalance) => {
    const debt = math.round(balance.TOTAL, 2);
    const debtor: IBalanceOccupant = { email: balance.OTHERS, displayName: '' };
    let colorToSet;

    if (debt < 0) {
        colorToSet = customTheme.negativeColor;
    } else if (debt > 0) {
        colorToSet = customTheme.positiveColor;
    } else {
        colorToSet = customTheme.neutralColor;
    }

    const balanceItem = (
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
    return balanceItem;
};

export default BalanceList;
