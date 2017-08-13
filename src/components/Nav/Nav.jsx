import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import receiveUser from "./navActions";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Menu from "material-ui/svg-icons/navigation/menu";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      menuItems: {
        "text-decoration": "none",
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
      <IconMenu
        iconButtonElement={
          <IconButton>
            <Menu />
          </IconButton>
        }
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
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
      </IconMenu>
    );
  }

  getLoggedInOptions() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <Menu />
          </IconButton>
        }
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem>
          <Link style={this.styles.menuItems} to="/Payday">
            Payday
          </Link>
        </MenuItem>

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
          <Link style={this.styles.menuItems} to="/History">
            History
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
      </IconMenu>
    );
  }

  // navToHome() {
  //   const { history } = this.props;
  //   history.push("/");
  // }

  render() {
    return (
      <AppBar
        title="Share the Load"
        // onTitleTouchTap={this.navToHome()}
        iconElementLeft={<div />}
        iconElementRight={
          this.props.isLoggedIn
            ? this.getLoggedInOptions()
            : this.getLoggedOutOptions()
        }
      />
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
