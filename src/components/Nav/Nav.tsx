import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Typography from '@material-ui/core/Typography/Typography';
import { Add, Home, Pageview } from '@material-ui/icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { getLogoutUrlWithDetails, logout } from '../Occupants/occupantsActions';
import { LogoutReason } from '../Occupants/occupantsInterfaces';
import { INavProps } from './navInterfaces';

// TODO: Add back in user chip, but with different function, maybe this takes you to balance, home takes you to myHouse?
const LoggedInMenuOptions: React.StatelessComponent<INavProps> = (props) => {
    return (
        <div>
            <Link // style={styles.menuItems}
                to={houseMoneyRoutes.HouseSummary}>
                <MenuItem>House Summary</MenuItem>
            </Link>

            <Link // style={styles.menuItems}
                to={houseMoneyRoutes.Balance}>
                <MenuItem>My Balance</MenuItem>
            </Link>

            <a
                // style={styles.menuItems}
                onClick={() => logout()}
                href={getLogoutUrlWithDetails(LogoutReason.UserTriggered)}>
                <MenuItem>Logout</MenuItem>
            </a>
        </div>
    );
};

const LoggedInNavItems: React.StatelessComponent = () => {
    return (
        <Menu
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            open={true} // TODO: Add stateful handler here
        >
            <Link // style={styles.menuItems}
                to={houseMoneyRoutes.AddTransaction}>
                <Tooltip id="tooltip-icon" title="Add Transaction">
                    <IconButton>
                        <Add />
                    </IconButton>
                </Tooltip>
            </Link>
            <Link // style={styles.menuItems}
                to={houseMoneyRoutes.ViewTransactions}>
                <Tooltip id="tooltip-icon" title="View Transactions">
                    <IconButton >
                        <Pageview />
                    </IconButton>
                </Tooltip>
            </Link>
        </Menu >
    );
};

const Nav: React.StatelessComponent<INavProps> = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link to="/">
                    <Tooltip id="tooltip-icon" title="Home">
                        <IconButton>
                            <Home />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Typography variant="title" color="inherit">
                    House Money
                </Typography>
                {props.isLoggedIn ?
                    <span>
                        <LoggedInNavItems />
                        <LoggedInMenuOptions {...props} />
                    </span> :
                    <span />
                }
            </Toolbar>
        </AppBar>
    );
};

// Retrieve data from store as props
const mapStateToProps = (store: IStore) => {
    return {
        isLoggedIn: store.occupantsReducer.isLoggedIn,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
    };
};

export default connect(mapStateToProps)(Nav);
