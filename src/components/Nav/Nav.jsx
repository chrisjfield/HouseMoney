import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Nav extends Component {
  getNav() {
    const isLoggedIn = this.props.isLoggedIn;
    if (isLoggedIn) {
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
    } else {
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
  }

  render() {
    return (
      <div className="navbar navbar-inverse navbar-fixed-top center">
        <div className="navbar-inner">
          <div className="container center">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
              </button>
              <Link to="/" id="home-button" className="navbar-brand">
                <span className="color-white">Share the Load</span>
              </Link>
            </div>
            {this.getNav()}
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  return {
    isLoggedIn: store.userReducer.isLoggedIn
  };
};

export default connect(mapStateToProps)(Nav);
