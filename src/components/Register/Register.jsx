import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { postUser } from "./registerActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FIRSTNAME: "",
      SURNAME: "",
      EMAILADDRESS: "",
      PASSWORD: ""
    };

    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "50px"
      }
    };

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
      <form style={this.styles.container} onSubmit={this.handleLogin}>
        <h1>Register</h1>
        <div>
          <TextField
            name="FIRSTNAME"
            hintText="My name"
            floatingLabelText="First Name"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <TextField
            name="SURNAME"
            hintText="My surname"
            floatingLabelText="Last Name"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <TextField
            name="EMAILADDRESS"
            hintText="example@email.com"
            floatingLabelText="Email Address"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <TextField
            name="PASSWORD"
            type="password"
            hintText="**********"
            floatingLabelText="Password"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <FlatButton type="submit" label="Sign Up" />
      </form>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  const { USER } = state;

  return {
    USER
  };
}

export default connect(mapStateToProps)(Register);
