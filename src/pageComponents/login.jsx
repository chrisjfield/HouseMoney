import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/user/userActions";
import UserLoginWidget from "../widgets/userLoginWidget";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EMAILADDRESS: "",
      PASSWORD: ""
    };
    //this.props.showAddUser = true; // ED! Remove this as should be handled in init or something

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { dispatch, history } = this.props,
      LOGIN = this.state;
    dispatch(loginUser(LOGIN)).then(() => history.push("/Balance"));
  }

  handleInputChange(event) {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <UserLoginWidget
        handleInputChange={this.handleInputChange}
        handleLogin={this.handleLogin}
      />
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    //showAddUser: getShowAddUser(state),
    //users: postUser(state) // ED! this was firing post user when sub clicked... need to understand wtf this is doing / for
  };
}

export default connect(mapStateToProps)(Login);
