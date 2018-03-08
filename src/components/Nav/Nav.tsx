import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AddButton from 'material-ui/svg-icons/content/add';
import ViewButton from 'material-ui/svg-icons/action/pageview';
import Menu from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import styles from './styles';
import { INavProps } from './interfaces';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { handleLogOut } from '../../helpers/loginHelper';

const LoggedOutMenuOptions: React.StatelessComponent = () => {
    return null;
};

const LoggedInMenuOptions: React.StatelessComponent<INavProps> = (props) => {
    return (
      <div>
        <Link style={styles.menuItems} to={houseMoneyRoutes.HouseSummary}>
          <MenuItem>House Summary</MenuItem>
        </Link>

        <Link style={styles.menuItems} to={houseMoneyRoutes.Balance}>
          <MenuItem>My Balance</MenuItem>
        </Link>

        <a style={styles.menuItems} onClick={() => handleLogOut()}>
          <MenuItem>Logout</MenuItem>
        </a>
      </div>
    );
};

const LoggedInNavItems: React.StatelessComponent = () => {
    return (
      <ToolbarGroup>
        <Link style={styles.menuItems} to={houseMoneyRoutes.AddTransaction}>
          <IconButton tooltip="Add Transaction">
            <AddButton />
          </IconButton>
        </Link>

        <Link style={styles.menuItems} to={houseMoneyRoutes.ViewTransactions}>
          <IconButton tooltip="View Transactions">
            <ViewButton />
          </IconButton>
        </Link>
      </ToolbarGroup>
    );
};

const LoggedOutNavItems: React.StatelessComponent = () => {
    return null;
};

const Nav: React.StatelessComponent<INavProps> = (props) => {
    return (
      <Toolbar>
        <ToolbarGroup>
          <Link to="/">
            <IconButton tooltip="Home">
              <ActionHome />
            </IconButton>
          </Link>
          <ToolbarTitle text="House Money" />
        </ToolbarGroup>
        <ToolbarGroup>
          {props.isLoggedIn
            ? <LoggedInNavItems />
            : <LoggedOutNavItems />}

          <IconMenu
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            iconButtonElement={
              <IconButton tooltip="Menu">
                <Menu />
              </IconButton>
            }
          >
            {props.isLoggedIn
              ? <LoggedInMenuOptions {...props}/>
              : <LoggedOutMenuOptions />}
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
};

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    return {
        isLoggedIn: store.navReducer.isLoggedIn,
        loggedInOccupant: store.navReducer.loggedInOccupant,
    };
};

export default connect(mapStateToProps)(Nav);
