import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import PageView from '@material-ui/icons/pageview';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as redux from 'redux';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { OccupantsActions, getLogoutUrlWithDetails, logout } from '../Occupants/occupantsActions';
import { LogoutReason } from '../Occupants/occupantsInterfaces';
import { INavProps } from './navInterfaces';
import styles from './styles';

// TODO: Add back in user chip, but with different function, maybe this takes you to balance, home takes you to myHouse?
const LoggedInMenuOptions: React.StatelessComponent<INavProps> = (props) => {
    return (
        <div>
            <Link style={styles.menuItems} to={houseMoneyRoutes.HouseSummary}>
                <MenuItem>House Summary</MenuItem>
            </Link>

            <Link style={styles.menuItems} to={houseMoneyRoutes.Balance}>
                <MenuItem>My Balance</MenuItem>
            </Link>

            <a style={styles.menuItems} onClick={() => logout()}
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
            <Link style={styles.menuItems} to={houseMoneyRoutes.AddTransaction}>
                <Tooltip id="tooltip-icon" title="Add Transaction">
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Link>
            <Link style={styles.menuItems} to={houseMoneyRoutes.ViewTransactions}>
                <Tooltip id="tooltip-icon" title="View Transactions">
                    <IconButton >
                        <PageView />
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
                            <HomeIcon />
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

const mapDispatchToProps = (dispatch: redux.Dispatch<redux.Action>) =>
    redux.bindActionCreators(OccupantsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
