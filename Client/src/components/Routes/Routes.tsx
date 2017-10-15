import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IRoutesProps, IRoutesState } from './interfaces';

import Login from '../Login';
import Register from '../Register';
import Balance from '../Balance';
import ViewTransactions from '../ViewTransactions';
import MyAccount from '../MyAccount';
import AddTransaction from '../AddTransaction';
import HouseSummary from '../HouseSummary';
import ChangePassword from '../ChangePassword';
import NotFound404 from '../NotFound404';

class Routes extends React.Component<IRoutesProps, IRoutesState> {
    getRoutes() {
        const isLoggedIn = this.props.isLoggedIn;
        let routes;
        if (isLoggedIn) {
            routes = (
              <Switch>
                <Route exact path='/' component={Balance} />
                <Route path='/Balance' component={Balance} />
                <Route path='/ViewTransactions' component={ViewTransactions} />
                <Route path='/MyAccount' component={MyAccount} />
                <Route path='/AddTransaction' component={AddTransaction} />
                <Route path='/HouseSummary' component={HouseSummary} />
                <Route path='/ChangePassword' component={ChangePassword} />
                <Route exact path='*' component={NotFound404} />
              </Switch>
            );
        } else {
            routes = (
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/Login' component={Login} />
                <Route path='/Register' component={Register} />
                <Route exact path='*' component={NotFound404} />
              </Switch>
            );
        }
        return routes;
    }

    render() {
        return <Route>{ this.getRoutes() }</Route>;
    }
}

const mapStateToProps = (store: any) => {
    return {
        isLoggedIn: store.navReducer.isLoggedIn,
    };
};

const ConnectedRoutes = withRouter(connect(mapStateToProps)(Routes));
export default ConnectedRoutes;
