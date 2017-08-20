import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { loginUser, getUser } from "./loginActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { dispatch, history } = this.props,
      LOGIN = this.state;
    dispatch(loginUser(LOGIN))
      .then(dispatch(getUser(this.state.EMAILADDRESS, this.state.PASSWORD)))
      .then(() => history.push("/Balance"));
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
        <h2>Welcome</h2>
        <div>
          <TextField
            name="EMAILADDRESS"
            type="text"
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
            autoComplete="current-password"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <FlatButton type="submit" label="Login" />
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  const { USER } = store;

  return {
    USER
  };
};

export default connect(mapStateToProps)(Login);
