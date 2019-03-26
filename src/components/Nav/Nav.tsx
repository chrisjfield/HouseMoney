import AppBar from '@material-ui/core/AppBar/AppBar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { IStore } from '../../interfaces/storeInterface';
import LoggedInMenuOptions from './LoggedInMenuOptions';
import LoggedInNavItems from './LoggedInNavItems';
import { NavActions } from './navActions';
import { INavProps, INavState } from './navInterfaces';
import navStyles from './navStyles';

// TODO: Add back in user chip, but with different function, maybe this takes you to balance, home takes you to myHouse?
class Nav extends React.Component<INavProps, INavState> {
    toggleDrawer = (event: React.MouseEvent<HTMLElement>) => {
        const newState = !this.props.openSidebar;
        newState ? this.props.dispatch(NavActions.navOpened()) : this.props.dispatch(NavActions.navClosed());
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="secondary" aria-label="Menu" onClick={this.toggleDrawer}>
                            <MenuIcon color="secondary" />
                        </IconButton>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Typography variant="headline" color="secondary">
                                Money
                            </Typography>
                        </Link>
                        {this.props.isLoggedIn ? <LoggedInNavItems classes={this.props.classes} /> : <div />}
                    </Toolbar>
                </AppBar>
                {this.props.isLoggedIn ? <SwipeableDrawer
                    open={this.props.openSidebar}
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
                            color="secondary"
                            style={{
                                display: 'inline-flex',
                                marginLeft: '24px',
                            }}
                            aria-label="Menu"
                            onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Link to="/"
                            className={this.props.classes.navItem}
                            style={{
                                display: 'inline-flex',
                                paddingRight: '24px',
                            }}>
                            <Typography variant="headline">
                                Money
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

const mapStateToProps = (store: IStore) => {
    return {
        isLoggedIn: store.occupantsReducer.isLoggedIn,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        openSidebar: store.navReducer.navOpen,
    };
};

export default compose(withStyles(navStyles), connect(mapStateToProps))(Nav);
