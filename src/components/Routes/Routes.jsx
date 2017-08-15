import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import Balance from "../Balance";
import MyHistory from "../../pageComponents/myHistory";
import Details from "../../pageComponents/details";
import Payday from "../Payday";
import Stacks from "../Stacks";
import ChangePassword from "../../pageComponents/changePassword";
import EditUser from "../../pageComponents/editUser";

class Routes extends Component {
  getRoutes() {
    const isLoggedIn = this.props.isLoggedIn;
    let routes;
    if (isLoggedIn) {
      routes = (
        <Switch>
          <Route exact path="/" component={Balance} />
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
      routes = (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route exact path="*" component={Login} />
        </Switch>
      );
    }
    return routes;
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
    isLoggedIn: store.navReducer.isLoggedIn
  };
};

const ConnectedRoutes = withRouter(connect(mapStateToProps)(Routes));
export default ConnectedRoutes;
