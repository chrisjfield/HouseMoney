import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class NavOptionsWidget extends Component {
  loggedInNav() {
    return (
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/Logout">Logout</Link>
          </li>
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link to="/Balance">Balance</Link>
              </li>
              <li>
                <Link to="/History">History</Link>
              </li>
              <li>
                <Link to="/Details">Details</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/Payday">Payday</Link>
          </li>
          <li>
            <Link to="/Stacks">Stacks</Link>
          </li>
        </ul>
      </div>
    );
  }

  loggedOutNav() {
    return (
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    let navOptions;

    isLoggedIn
      ? (navOptions = this.loggedInNav())
      : (navOptions = this.loggedOutNav());

    return navOptions;
  }
}

NavOptionsWidget.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(NavOptionsWidget);
