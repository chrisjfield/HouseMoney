import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import AccountBalance from '@material-ui/icons/AccountBalance';
import AccountBox from '@material-ui/icons/AccountBox';
import Add from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Pageview from '@material-ui/icons/Pageview';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { getLogoutUrlWithDetails, logout } from '../Occupants/occupantsCommon';
import { LogoutReason } from '../Occupants/occupantsInterfaces';
import { INavMenuProps } from './navInterfaces';

const LoggedInMenuOptions: React.StatelessComponent<INavMenuProps> = (props) => {
    const { classes } = props;
    return (
        <List>
            <Tooltip id="tooltip-icon" title="Add a transaction" placement="top">
                <Link to={houseMoneyRoutes.AddTransaction}
                    className={classes.navItem}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <Add color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Add" />
                    </ListItem>
                </Link>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="View previous transactions" placement="top">
                <Link to={houseMoneyRoutes.ViewTransactions}
                    className={classes.navItem}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <Pageview color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="View" />
                    </ListItem>
                </Link>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="Your balance, also the home page" placement="top">
                <Link to={houseMoneyRoutes.Balance}
                    className={classes.navItem}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <AccountBox color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Balance" />
                    </ListItem>
                </Link>
            </Tooltip>
            <Divider />
            <Tooltip id="tooltip-icon" title="An overview of all debts in the household" placement="top">
                <Link to={houseMoneyRoutes.HouseSummary}
                    className={classes.navItem}
                >
                    <ListItem button>
                        <ListItemIcon >
                            <AccountBalance color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Summary" />
                    </ListItem>
                </Link>
            </Tooltip>
            <Divider />
            <Tooltip id="tooltip-icon" title="See you again soon" placement="top">
                <ListItem button
                    href={getLogoutUrlWithDetails(LogoutReason.UserTriggered)}
                    onClick={() => logout()}
                    className={classes.navItem}
                >
                    <ListItemIcon>
                        <ExitToApp color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </Tooltip>
        </List>
    );
};

export default LoggedInMenuOptions;
