import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import receiveUser from "./navActions";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

class Nav extends Component {
  constructor(props) {
    super(props);

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
            <MoreVertIcon />
          </IconButton>
        }
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem>
          <Link to="/Register">Sign Up</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/Login">Login</Link>
        </MenuItem>
      </IconMenu>
    );
  }

  getLoggedInOptions() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem>
          <Link to="/Payday">Payday</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/Stacks">Stacks</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/Balance">Balance</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/History">History</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/Details">Account</Link>
        </MenuItem>

        <MenuItem>
          <a onClick={this.handleLogout}>Logout</a>
        </MenuItem>
      </IconMenu>
    );
  }

  render() {
    return (
      <div>
        <AppBar
          title="Share the Load"
          iconElementLeft={<div />}
          iconElementRight={
            this.props.isLoggedIn
              ? this.getLoggedInOptions()
              : this.getLoggedOutOptions()
          }
        />
      </div>
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
