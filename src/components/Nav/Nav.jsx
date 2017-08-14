import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import receiveUser from "./navActions";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Menu from "material-ui/svg-icons/navigation/menu";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import ActionHome from "material-ui/svg-icons/action/home";

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
      }
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { dispatch } = this.props;
    dispatch(receiveUser({}, false));
  }

  getLoggedOutOptions() {
    return (
      <div>
        <MenuItem>
          <Link style={this.styles.menuItems} to="/Login">
            Login
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={this.styles.menuItems} to="/Register">
            Sign Up
          </Link>
        </MenuItem>
      </div>
    );
  }

  getLoggedInOptions() {
    return (
      <div>
        <MenuItem>
          <Link style={this.styles.menuItems} to="/Stacks">
            Stacks
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={this.styles.menuItems} to="/Balance">
            Balance
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={this.styles.menuItems} to="/Details">
            Account
          </Link>
        </MenuItem>

        <MenuItem>
          <a style={this.styles.menuItems} onClick={this.handleLogout}>
            Logout
          </a>
        </MenuItem>
      </div>
    );
  }

  // navToHome() {
  //   const { history } = this.props;
  //   history.push("/");
  // }

  render() {
    return (
      <Toolbar style={this.styles.toolbar}>
        <ToolbarGroup>
          <IconButton tooltip="Home" href="/">
            <ActionHome />
          </IconButton>
          <ToolbarTitle text="Share The Load" />
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuItem>
            <Link style={this.styles.menuItems} to="/Payday">
              Payday
            </Link>
          </MenuItem>
          <MenuItem>
            <Link style={this.styles.menuItems} to="/History">
              History
            </Link>
          </MenuItem>
          <IconMenu
            iconButtonElement={
              <IconButton tooltip="Menu">
                <Menu />
              </IconButton>
            }
          >
            {this.props.isLoggedIn
              ? this.getLoggedInOptions()
              : this.getLoggedOutOptions()}
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return {
    isLoggedIn: store.navReducer.isLoggedIn
  };
};

export default connect(mapStateToProps)(Nav);
