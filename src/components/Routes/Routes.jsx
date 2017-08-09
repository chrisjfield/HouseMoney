import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import Login from "../../pageComponents/login";
import Logout from "../../pageComponents/logout";
import Register from "../../pageComponents/register";
import Balance from "../../pageComponents/balance";
import MyHistory from "../../pageComponents/myHistory";
import Details from "../../pageComponents/details";
import Payday from "../../pageComponents/payday";
import Stacks from "../../pageComponents/stacks";
import ChangePassword from "../../pageComponents/changePassword";
import EditUser from "../../pageComponents/editUser";

class Routes extends Component {
  getRoutes() {
    const isLoggedIn = this.props.isLoggedIn;
    if (isLoggedIn) {
      return (
        <Switch>
          <Route exact path="/" component={Balance} />
          <Route path="/Logout" component={Logout} />
          <Route path="/Balance" component={Balance} />
          <Route path="/History" component={MyHistory} />
          <Route path="/Details" component={Details} />
          <Route path="/Payday" component={Payday} />
          <Route path="/Stacks" component={Stacks} />
          <Route path="/ChangePassword" component={ChangePassword} />
          <Route path="/EditUser" component={EditUser} />
          <Route exact path="*" component={Balance} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route exact path="*" component={Login} />
        </Switch>
      );
    }
  }

  render() {
    return (
      <Route>
        {this.getRoutes()}
      </Route>
    );
  }
}

const mapStateToProps = store => {
  return {
    isLoggedIn: store.userReducer.isLoggedIn
  };
};

const ConnectedRoutes = withRouter(connect(mapStateToProps)(Routes));
export default ConnectedRoutes;
