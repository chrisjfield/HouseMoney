import * as React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import APIHelper from '../../helpers/apiHelper';
import { addError } from '../ErrorMessage/errorMessageActions';
import { IChangePasswordProps, IChangePasswordState } from './interfaces';
import appStyles from '../../styles';

class ChangePassword extends React.Component<IChangePasswordProps, IChangePasswordState> {
    constructor(props: IChangePasswordProps) {
        super(props);
        this.state = {
            passwordUpdate: {
                userId: '',
                CURRENTPASSWORD: '',
                NEWPASSWORD: '',
                NEWPASSWORDCONFIRM: '',
            },
            passwordUpdating: false,
            passwordUpdated: false,
        };
    }

    handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({ passwordUpdating: true });
        const updatePassword = this.state.passwordUpdate;
        const request = APIHelper.apiCall('PUT', 'Users/UpdateUserPassword', updatePassword);

        return request
          .then((json: JSON) => {
              this.setState({
                  passwordUpdating: false,
                  passwordUpdated: true,
                  passwordUpdate: {
                      userId: this.props.loggedInUser.userId, // ED! should we be doing this?? 
                      CURRENTPASSWORD: '',
                      NEWPASSWORD: '',
                      NEWPASSWORDCONFIRM: '',
                  },
              });
          })
          .catch((error: Error) => {
              this.setState({ passwordUpdating: false });
              this.props.dispatch(addError(error.message));
          });
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({ 
            passwordUpdate: { ...this.state.passwordUpdate, [name]: value },
        }));
    }

    handleRequestClose = () => {
        this.setState({
            passwordUpdated: false,
        });
    }

    render() {
        return (
        <form style={appStyles.container} onSubmit={this.handlePasswordChange}>
          <h2>Change Password</h2>
          <div>
            <TextField
              name="CURRENTPASSWORD"
              type="password"
              hintText="************"
              floatingLabelText="Current Password"
              required
              value={this.state.passwordUpdate.CURRENTPASSWORD}
              onChange={this.handleInputChange}
              disabled={this.state.passwordUpdating}
              maxlength="50"
            />
          </div>
          <div>
            <TextField
              name="NEWPASSWORD"
              type="password"
              hintText="************"
              floatingLabelText="New Password"
              required
              value={this.state.passwordUpdate.NEWPASSWORD}
              onChange={this.handleInputChange}
              disabled={this.state.passwordUpdating}
              maxlength="50"
            />
          </div>
          <div>
            <TextField
              name="NEWPASSWORDCONFIRM"
              type="password"
              hintText="************"
              floatingLabelText="Confirm Password"
              required
              value={this.state.passwordUpdate.NEWPASSWORDCONFIRM}
              onChange={this.handleInputChange}
              disabled={this.state.passwordUpdating}
              maxlength="50"
            />
          </div>
          <FlatButton
            type="submit"
            label="Update"
            disabled={this.state.passwordUpdating}
          />
          <Snackbar
            open={this.state.passwordUpdated}
            message="Password updated"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </form>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(ChangePassword);
