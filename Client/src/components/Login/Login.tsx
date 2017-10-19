import * as React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import appStyles from '../../styles';
import { ILoginProps, ILoginState } from './interfaces';
import { loginUser } from './loginActions';

class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            user: {
                userId: '',
                email: '',
                password: '',
                displayName: '',
            },
            error: null,
            loading: false,
        };
    }

    handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { dispatch, history } = this.props;
        const login = {
            email: this.state.user.email,
            password: this.state.user.password,
            userId: '', // ED! This imples this is the wrong type!
            displayName: '', // ED! This imples this is the wrong type!
        };
        this.setState({ loading: true });
        dispatch(loginUser(login))
          .then(() => {
              history.push('/Balance');
          })
          .catch((error: Error) => {
              this.setState({ error, loading: false });
          });
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            user: { ...this.state.user, [name]: value },
        }));
    }

    render() {
        return (
          <form style={appStyles.container} onSubmit={this.handleLogin}>
            <h2>Welcome</h2>
            <div>
              <TextField
                name="email"
                type="text"
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
                autoComplete="current-password"
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
                <FlatButton type="submit" label="Sign In" />
              )}
            </div>
            <br />
            <div>
              <span> New to hApps? </span>{' '}
              <span>
                <FlatButton
                  secondary={true}
                  label="Sign Up"
                  onClick={() => this.props.history.push('/Register')}
                />
              </span>
            </div>
          </form>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    return {
        loggingIn: store.loginReducer.loading,
    };
};

export default connect(mapStateToProps)(Login);
