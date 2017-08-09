import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavOptionsWidget from "../widgets/navOptionsWidget";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;
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
              <Link to="/Initial" id="home-button" className="navbar-brand">
                <span className="color-white">Share the Load</span>
              </Link>
            </div>
            <NavOptionsWidget isLoggedIn={isLoggedIn} />
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
