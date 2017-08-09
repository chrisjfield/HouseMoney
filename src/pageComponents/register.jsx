import React, { Component } from "react";
import { connect } from "react-redux";
import { postUser } from "../actions/user/userActions";
import UserCreateWidget from "../widgets/userCreateWidget";
import PropTypes from "prop-types";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FIRSTNAME: "",
      SURNAME: "",
      EMAILADDRESS: "",
      PASSWORD: ""
    };
    //this.props.showAddUser = true; // ED! Remove this as should be handled in init or something

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  handleAddUser(event) {
    event.preventDefault();
    const { dispatch, history } = this.props,
      USER = this.state;
    dispatch(postUser(USER)).then(history.push("/Payday"));
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
      <UserCreateWidget
        handleInputChange={this.handleInputChange}
        handleAddUser={this.handleAddUser}
      />
    );
  }
}

Register.propTypes = {
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

export default connect(mapStateToProps)(Register);
