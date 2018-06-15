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
            <Link to={houseMoneyRoutes.HouseSummary}
                style={{ textDecoration: 'none' }}
            >
                <MenuItem>House Summary</MenuItem>
            </Link>
            <Link to={houseMoneyRoutes.Balance}
                style={{ textDecoration: 'none' }}
            >
                <MenuItem>My Balance</MenuItem>
            </Link>
            <a
                style={{ textDecoration: 'none' }}
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
            <Link to={houseMoneyRoutes.AddTransaction}>
                <Tooltip id="tooltip-icon" title="Add Transaction">
                    <IconButton>
                        <Add />
                    </IconButton>
                </Tooltip>
            </Link>
            <Link to={houseMoneyRoutes.ViewTransactions}>
                <Tooltip id="tooltip-icon" title="View Transactions">
                    <IconButton>
                        <Pageview />
                    </IconButton>
                </Tooltip>
            </Link>
        </div>
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
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Typography variant="title" color="inherit">
                                House Money
                            </Typography>
                        </Link>
                        {this.props.isLoggedIn ? <LoggedInNavItems /> : <div />}
                    </Toolbar>
                </AppBar>
                {this.props.isLoggedIn ? <SwipeableDrawer
                    open={this.state.openSidebar}
                    onClose={this.toggleDrawer}
                    onOpen={this.toggleDrawer}
                >
                    <div style={{
                        minHeight: '64px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <IconButton
                            style={{
                                display: 'inline-flex',
                                marginLeft: '24px',
                            }}
                            aria-label="Menu"
                            onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" style={{
                            display: 'inline-flex',
                            paddingRight: '24px',
                            textDecoration: 'none',
                        }}>
                            <Typography variant="title">
                                House Money
                            </Typography>
                        </Link>
                    </div>
                    <LoggedInMenuOptions {...this.props} />
                </ SwipeableDrawer> : <div />}
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
