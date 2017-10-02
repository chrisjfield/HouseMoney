import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";

import { loginUser } from "./loginActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EMAILADDRESS: "",
      PASSWORD: "",
      error: {},
      loading: false
    };

    this.styles = {
      container: {
        textAlign: "center",
        marginTop: "20px"
      }
    };
  }

  handleLogin = event => {
    event.preventDefault();
    const { dispatch, history } = this.props,
      LOGIN = {
        EMAILADDRESS: this.state.EMAILADDRESS,
        PASSWORD: this.state.PASSWORD
      };
    this.setState({ loading: true });
    dispatch(loginUser(LOGIN))
      .then(() => {
        history.push("/Balance");
      })
      .catch(error => {
        this.setState({ error: error, loading: false });
      });
  };

  handleInputChange = event => {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;

    this.setState({
      [name]: value
    });
  };

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
            disabled={this.state.loading}
            maxLength="50"
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
            disabled={this.state.loading}
            maxLength="30"
          />
        </div>
        <div>
          {this.state.loading
            ? <CircularProgress />
            : <FlatButton type="submit" label="Login" />}
        </div>
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  const { USER } = store;

  return {
    USER,
    loggingIn: store.loginReducer.loading
  };
};

export default connect(mapStateToProps)(Login);
