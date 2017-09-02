import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import receiveUser from "./navActions";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import AddButton from "material-ui/svg-icons/content/add";
import ViewButton from "material-ui/svg-icons/action/pageview";
import Menu from "material-ui/svg-icons/navigation/menu";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import ActionHome from "material-ui/svg-icons/action/home";
import UserChip from "../UserChip";
import history from "../../main/history";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      menuItems: {
        textDecoration: "none",
        color: "#BDBDBD"
      },
      toolbar: {
        backgroundColor: "#004989",
        color: "#BDBDBD"
      },
      userChip: {
        display: "block",
        height: "100%",
        width: "100%",
        margin: "0 auto"
      }
    };
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(receiveUser({}, false));
    history.push("/Login");
  };

  getLoggedOutMenuOptions() {
    return (
      <div>
        <Link style={this.styles.menuItems} to="/Login">
          <MenuItem>Login </MenuItem>
        </Link>

        <Link style={this.styles.menuItems} to="/Register">
          <MenuItem> Sign Up</MenuItem>
        </Link>
      </div>
    );
  }

  getLoggedInMenuOptions() {
    return (
      <div>
        <Link style={this.styles.menuItems} to="/MyAccount">
          <MenuItem>
            <UserChip
              user={this.props.loggedInUser}
              styles={this.styles.userChip}
            />
          </MenuItem>
        </Link>

        <Link style={this.styles.menuItems} to="/HouseSummary">
          <MenuItem>House Summary</MenuItem>
        </Link>

        <Link style={this.styles.menuItems} to="/Balance">
          <MenuItem>My Balance</MenuItem>
        </Link>

        <a style={this.styles.menuItems} onClick={this.handleLogout}>
          <MenuItem>Logout</MenuItem>
        </a>
      </div>
    );
  }

  getLoggedInNavItems() {
    return (
      <ToolbarGroup>
        <Link style={this.styles.menuItems} to="/AddTransaction">
          <IconButton tooltip="Add Transaction">
            <AddButton />
          </IconButton>
        </Link>

        <Link style={this.styles.menuItems} to="/ViewTransactions">
          <IconButton tooltip="View Transactions">
            <ViewButton />
          </IconButton>
        </Link>
      </ToolbarGroup>
    );
  }

  getLoggedOutNavItems() {
    return undefined;
  }

  render() {
    return (
      <Toolbar style={this.styles.toolbar}>
        <ToolbarGroup>
          <Link to="/">
            <IconButton tooltip="Home">
              <ActionHome />
            </IconButton>
          </Link>
          <ToolbarTitle text="House Money" />
        </ToolbarGroup>
        <ToolbarGroup>
          {this.props.isLoggedIn
            ? this.getLoggedInNavItems()
            : this.getLoggedOutNavItems()}

          <IconMenu
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            targetOrigin={{ horizontal: "right", vertical: "top" }}
            iconButtonElement={
              <IconButton tooltip="Menu">
                <Menu />
              </IconButton>
            }
          >
            {this.props.isLoggedIn
              ? this.getLoggedInMenuOptions()
              : this.getLoggedOutMenuOptions()}
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return {
    isLoggedIn: store.navReducer.isLoggedIn,
    loggedInUser: store.navReducer.loggedInUser
  };
};

export default connect(mapStateToProps)(Nav);
