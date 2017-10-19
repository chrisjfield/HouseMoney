import * as React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { registerUser } from './registerActions';
import { addError } from '../ErrorMessage/errorMessageActions';
import { IRegisterProps, IRegisterState } from './interfaces';

class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            registerUser: {
                email: '',
                password: '',
                confirmPassword: '',
                displayName: '',
            },
            loading: false,
            error: null,
        };

      // this.styles = {
      //   container: {
      //     textAlign: 'center',
      //     marginTop: '20px'
      //   }
      // };
    }

    handleAddUser = (event: Event) => {
        event.preventDefault();
        if (this.state.registerUser.password === this.state.registerUser.confirmPassword) {
            const { dispatch, history } = this.props;
            const user = {
                displayName: this.state.registerUser.displayName,
                email: this.state.registerUser.email,
                password: this.state.registerUser.password,
            };
            this.setState({ loading: true });
            dispatch(registerUser(user))
              .then(() => { history.push('/AddTransaction'); })
              .catch((error: Error) => { this.setState({ error, loading: false }); });
        } else {
            // ED! This is lazy - make this better
            this.props.dispatch(() => addError('Your password does not match the confirmed password'));
        }
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ registerUser[name]: value }); // ED! need to get merge state types working then use here
    }

    render() {
        return (
          <form style={this.styles.container} onSubmit={this.handleAddUser}>
            <h2>Create Account</h2>
            <div>
              Already have an hApps account?
              <FlatButton
                secondary={true}
                label="Sign In"
                onClick={() => this.props.history.push("/Login")}
              />
            </div>

            <div>
              <TextField
                name="displayName"
                hintText="My name"
                floatingLabelText="Display Name"
                required
                onChange={this.handleInputChange}
                disabled={this.state.loading}
                maxlength="100"
              />
            </div>
            <div>
              <TextField
                name="email"
                hintText="example@email.com"
                floatingLabelText="Email Address"
                required
                onChange={this.handleInputChange}
                disabled={this.state.loading}
                maxlength="50"
              />
            </div>
            <div>
              <TextField
                name="password"
                type="password"
                hintText="**********"
                floatingLabelText="Password"
                required
                onChange={this.handleInputChange}
                disabled={this.state.loading}
                maxlength="30"
              />
            </div>
            <div>
              <TextField
                name="confirmPassword"
                type="password"
                hintText="**********"
                floatingLabelText="Confirm Password"
                required
                onChange={this.handleInputChange}
                disabled={this.state.loading}
                maxlength="30"
              />
            </div>
            <div>
              {this.state.loading ? (
                <CircularProgress />
              ) : (
                <FlatButton type="submit" label="Sign Up" />
              )}
            </div>
          </form>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    const { user } = store;

    return {
        user,
        registering: store.registerReducer.loading,
    };
};

export default connect(mapStateToProps)(Register);
