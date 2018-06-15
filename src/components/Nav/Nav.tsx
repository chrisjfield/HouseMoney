import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Typography from '@material-ui/core/Typography/Typography';
import { Add, Pageview } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { getLogoutUrlWithDetails, logout } from '../Occupants/occupantsActions';
import { LogoutReason } from '../Occupants/occupantsInterfaces';
import { INavProps, INavState } from './navInterfaces';

// TODO: Add back in user chip, but with different function, maybe this takes you to balance, home takes you to myHouse?
const LoggedInMenuOptions: React.StatelessComponent<INavProps> = (props) => {
    return (
        <div className="sidebar">
            <HomeButton />
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
        <div style={{ marginLeft: 'auto', marginRight: '0' }}>
            <Link
                to={houseMoneyRoutes.AddTransaction}>
                <Tooltip id="tooltip-icon" title="Add Transaction">
                    <IconButton>
                        <Add />
                    </IconButton>
                </Tooltip>
            </Link>
            <Link
                to={houseMoneyRoutes.ViewTransactions}>
                <Tooltip id="tooltip-icon" title="View Transactions">
                    <IconButton>
                        <Pageview />
                    </IconButton>
                </Tooltip>
            </Link>
        </div>
    );
};

const HomeButton: React.StatelessComponent = () => {
    return (
        <Link to="/">
            <Typography variant="title" color="inherit">
                House Money
            </Typography>
        </Link>
    );
};

class Nav extends React.Component<INavProps, INavState> {
    constructor(props: INavProps) {
        super(props);

        this.state = {
            openSidebar: false,
        };
    }

    toggleDrawer = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ openSidebar: !this.state.openSidebar });
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <HomeButton />
                        {this.props.isLoggedIn ? <LoggedInNavItems /> : <div />}
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.openSidebar}
                    onClose={this.toggleDrawer}
                    onOpen={this.toggleDrawer}
                    >
                    {this.props.isLoggedIn && this.state.openSidebar ? <LoggedInMenuOptions {...this.props} /> : <div />}
                </ SwipeableDrawer>
            </ div>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: IStore) => {
    return {
        isLoggedIn: store.occupantsReducer.isLoggedIn,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
    };
};

export default connect(mapStateToProps)(Nav);
