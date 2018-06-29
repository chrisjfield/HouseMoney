import IconButton from '@material-ui/core/IconButton/IconButton';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Add from '@material-ui/icons/Add';
import Pageview from '@material-ui/icons/Pageview';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { INavMenuProps } from './navInterfaces';

const LoggedInNavItems: React.StatelessComponent<INavMenuProps> = (props) => {
    const { classes } = props;
    return (
        <div style={{ marginLeft: 'auto', marginRight: '0' }}>
            <Tooltip id="tooltip-icon" title="Add Transaction">
                <Link to={houseMoneyRoutes.AddTransaction}
                    className={classes.navItem}>
                    <IconButton color="secondary">
                        <Add color="secondary" />
                    </IconButton>
                </Link>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="View Transactions">
                <Link to={houseMoneyRoutes.ViewTransactions}
                    className={classes.navItem}>
                    <IconButton color="secondary">
                        <Pageview color="secondary" />
                    </IconButton>
                </Link>
            </Tooltip>
        </div>
    );
};

export default LoggedInNavItems;
