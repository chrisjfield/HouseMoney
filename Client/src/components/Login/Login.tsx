import * as React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { loginUser } from './loginActions';
import { ILoginProps, ILoginState } from './interfaces';
import { IInputChangeEvent } from '../../interfaces/inputInterfaces';

class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            loading: false,
        };

        // this.styles = {
        //   container: {
        //     textAlign: 'center',
        //     marginTop: '20px'
        //   }
        // };
    }

    handleLogin = (event: Event) => {
        event.preventDefault();
        const { dispatch, history } = this.props;
        const login = {
            email: this.state.email,
            password: this.state.password,
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

    handleInputChange = (event: IInputChangeEvent<string>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    render() {
        return (
          <form style={this.styles.container} onSubmit={this.handleLogin}>
            <h2>Welcome</h2>
            <div>
              <TextField
                name='email'
                type='text'
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
                autoComplete='current-password'
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
                <FlatButton type='submit' label='Sign In' />
              )}
            </div>
            <br />
            <div>
              <span> New to hApps? </span>{' '}
              <span>
                <FlatButton
                  secondary={true}
                  label='Sign Up'
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
    const { user } = store;

    return {
        user,
        loggingIn: store.loginReducer.loading,
    };
};

export default connect(mapStateToProps)(Login);
