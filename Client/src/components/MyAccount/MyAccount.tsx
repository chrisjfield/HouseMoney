import * as React from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { editUser, deleteUser } from './myAccountActions';
import { IMyAccountProps, IMyAccountState } from './interfaces';
import styles from './styles';
import appStyles from '../../styles';

class MyAccount extends React.Component<IMyAccountProps, IMyAccountState> {
    constructor(props: IMyAccountProps) {
        super(props);
        this.state = {
            userUpdate: {
                currentUser: this.props.loggedInUser.userId,
                email: this.props.loggedInUser.email,
                displayName: this.props.loggedInUser.displayName,
            },
            userEditing: false,
            userEdited: false,
            userDeleting: false,
            error: null,
        };
    }

    componentWillReceiveProps(nextProps: IMyAccountProps) {
        this.setState({ userEditing: nextProps.editing });
    }

    handleEditUser = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { dispatch } = this.props;
        const USER = this.state.userUpdate;
        dispatch(editUser(USER)).then(() => this.setState({ userEdited: true }));
    }

    handleDeleteUser = (event: React.MouseEvent<{}>) => {
        event.preventDefault();
        const { dispatch, history } = this.props;
        const emailAddresss = this.state.userUpdate.email;
        dispatch(deleteUser(emailAddresss))
          .then(() => history.push('/Login'))
          .catch((error: Error) => this.setState({ error, userDeleting: false }));
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const newState = update(this.state, {
            userUpdate: {
                $merge: { [name]: value },
            },
        });
        this.setState(newState);
    }

    handleEditUserClose = () => {
        this.setState({ userEdited: false });
    }

    handleDeleteUserOpen = () => {
        this.setState({ userDeleting: true });
    }

    handleDeleteUserClose = () => {
        this.setState({ userDeleting: false });
    }

    render() {
        return (
          <form
            name="MyAccountForm"
            style={appStyles.container}
            onSubmit={this.handleEditUser}
          >
            <h2>Your Details</h2>
            <div className="row">
              <div className="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 col-xs-12">
                <div>
                  <TextField
                    name="email"
                    hintText="email@example.com"
                    floatingLabelText="Email Address"
                    defaultValue={this.state.userUpdate.currentUser}
                    required
                    onChange={this.handleInputChange}
                    disabled={true}
                  />
                </div>
                <div>
                  <TextField
                    name="DISPLAYNAME"
                    hintText="My name"
                    floatingLabelText="Display Name"
                    defaultValue={this.state.userUpdate.displayName}
                    required
                    onChange={this.handleInputChange}
                    disabled={this.state.userEditing || this.state.userDeleting}
                  />
                </div>
                <div>
                  <div style={styles.buttonWrapper}>
                    <FlatButton
                      style={styles.button}
                      type="submit"
                      label="Update"
                      disabled={this.state.userEditing || this.state.userDeleting}
                    />
                  </div>
                  <div style={styles.buttonWrapper}>
                    <FlatButton
                      style={styles.button}
                      label="Change Password"
                      secondary={true}
                      onClick={() => this.props.history.push('/ChangePassword')}
                      disabled={this.state.userEditing || this.state.userDeleting}
                    />
                  </div>
                  <div style={styles.buttonWrapper}>
                    <FlatButton
                      style={styles.button}
                      label="Delete"
                      secondary={true}
                      onClick={this.handleDeleteUserOpen}
                      disabled={this.state.userEditing || this.state.userDeleting}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Snackbar
              open={this.state.userEdited}
              message="Details updated"
              autoHideDuration={4000}
              onRequestClose={this.handleEditUserClose}
            />
            <Dialog
              title="Delete User"
              actions={[
                  <FlatButton
                    label="No"
                    primary={true}
                    onClick={this.handleDeleteUserClose}
                  />,
                  <FlatButton
                    label="Yes"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.handleDeleteUser}
                  />,
              ]}
              modal={false}
              open={this.state.userDeleting}
              onRequestClose={this.handleDeleteUserClose}
            >
              Are you sure you want to delete your account?
            </Dialog>
          </form>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    return {
        loggedInUser: store.navReducer.loggedInUser,
        editing: store.myAccountReducer.editing,
        deleting: store.myAccountReducer.deleting,
    };
};

export default connect(mapStateToProps)(MyAccount);
