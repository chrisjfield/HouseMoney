import AppBar from '@material-ui/core/AppBar/AppBar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Typography from '@material-ui/core/Typography/Typography';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Add from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Pageview from '@material-ui/icons/Pageview';
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
        <List>
            <Tooltip id="tooltip-icon" title="Add a transaction" placement="top">
                <Link to={houseMoneyRoutes.AddTransaction}
                    style={{ textDecoration: 'none' }}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <Add />
                        </ListItemIcon>
                        <ListItemText primary="Add" />
                    </ListItem>
                </Link>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="View previous transactions" placement="top">
                <Link to={houseMoneyRoutes.ViewTransactions}
                    style={{ textDecoration: 'none' }}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <Pageview />
                        </ListItemIcon>
                        <ListItemText primary="View" />
                    </ListItem>
                </Link>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="Your balance, also the home page" placement="top">
                <Link to={houseMoneyRoutes.Balance}
                    style={{ textDecoration: 'none' }}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <AccountBalance />
                        </ListItemIcon>
                        <ListItemText primary="Balance" />
                    </ListItem>
                </Link>
            </Tooltip>
            <Divider />
            <Tooltip id="tooltip-icon" title="An overview of all debts in the household" placement="top">
                <Link to={houseMoneyRoutes.HouseSummary}
                    style={{ textDecoration: 'none' }}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <AccountBalance />
                        </ListItemIcon>
                        <ListItemText primary="Summary" />
                    </ListItem>
                </Link>
            </Tooltip>
            <Divider />
            <Tooltip id="tooltip-icon" title="See you again soon" placement="top">
                <ListItem button href={getLogoutUrlWithDetails(LogoutReason.UserTriggered)}
                    onClick={() => logout()}
                    style={{ textDecoration: 'none' }}
                >
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </Tooltip>
        </List>
    );
};

const LoggedInNavItems: React.StatelessComponent = () => {
    return (
        <div style={{ marginLeft: 'auto', marginRight: '0' }}>
            <Tooltip id="tooltip-icon" title="Add Transaction">
                <Link to={houseMoneyRoutes.AddTransaction}>
                    <IconButton>
                        <Add />
                    </IconButton>
                </Link>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="View Transactions">
                <Link to={houseMoneyRoutes.ViewTransactions}>
                    <IconButton>
                        <Pageview />
                    </IconButton>
                </Link>
            </Tooltip>
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
                    <Divider />
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
