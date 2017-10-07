import * as React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { registerUser } from './registerActions';
import { addError } from '../ErrorMessage/errorMessageActions';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      loading: false,
      error: null
    };

    this.styles = {
      container: {
        textAlign: 'center',
        marginTop: '20px'
      }
    };
  }

  handleAddUser = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      const { dispatch, history } = this.props,
        user = {
          displayName: this.state.displayName,
          email: this.state.email,
          password: this.state.password
        };
      this.setState({ loading: true });
      dispatch(registerUser(user))
        .then(() => {
          history.push('/AddTransaction');
        })
        .catch(error => {
          this.setState({ error: error, loading: false });
        });
    } else {
      //ED! This is lazy - make this better
      this.props.dispatch(
        addError('Your password does not match the confirmed password')
      );
    }
  };

  handleInputChange = event => {
    const target = event.target,
      value = target.type === 'checkbox' ? target.checked : target.value,
      name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form style={this.styles.container} onSubmit={this.handleAddUser}>
        <h2>Create Account</h2>
        <div>
          Already have an hApps account?
          <FlatButton
            secondary={true}
            label='Sign In'
            onClick={() => this.props.history.push('/Login')}
          />
        </div>

        <div>
          <TextField
            name='displayName'
            hintText='My name'
            floatingLabelText='Display Name'
            required
            onChange={this.handleInputChange}
            disabled={this.state.loading}
            maxLength='100'
          />
        </div>
        <div>
          <TextField
            name='email'
            hintText='example@email.com'
            floatingLabelText='Email Address'
            required
            onChange={this.handleInputChange}
            disabled={this.state.loading}
            maxLength='50'
          />
        </div>
        <div>
          <TextField
            name='password'
            type='password'
            hintText='**********'
            floatingLabelText='Password'
            required
            onChange={this.handleInputChange}
            disabled={this.state.loading}
            maxLength='30'
          />
        </div>
        <div>
          <TextField
            name='confirmPassword'
            type='password'
            hintText='**********'
            floatingLabelText='Confirm Password'
            required
            onChange={this.handleInputChange}
            disabled={this.state.loading}
            maxLength='30'
          />
        </div>
        <div>
          {this.state.loading ? (
            <CircularProgress />
          ) : (
            <FlatButton type='submit' label='Sign Up' />
          )}
        </div>
      </form>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = store => {
  const { user } = store;

  return {
    user,
    registering: store.registerReducer.loading
  };
};

export default connect(mapStateToProps)(Register);
