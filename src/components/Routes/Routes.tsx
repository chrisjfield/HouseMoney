import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { IRoutesProps } from './interfaces';

import Balance from '../Balance';
import ViewTransactions from '../ViewTransactions';
import AddTransaction from '../AddTransaction';
import HouseSummary from '../HouseSummary';
import NotFound404 from '../NotFound404';
import { checkAuthorization } from '../Occupants/occupantsActions';

const LoggedInRoutes: React.StatelessComponent = () => {
    return (
        <Switch>
            <Route exact path="/" component={Balance} />
            <Route path="/Balance" component={Balance} />
            <Route path="/ViewTransactions" component={ViewTransactions} />
            <Route path="/AddTransaction" component={AddTransaction} />
            <Route path="/HouseSummary" component={HouseSummary} />
            <Route exact path="*" component={NotFound404} />
        </Switch>
    );
};

const LoggedOutRoutes: React.StatelessComponent = () => {
    return (
        <Switch>
            <Route exact path="*" component={NotFound404} />
        </Switch>
    );
};

// TODO: Have an recieve handle sign in / recieve occupant action which accepts url params from myhouse
export const Routes: React.StatelessComponent<RouteComponentProps<any> & IRoutesProps> = (props) => {
    checkAuthorization(props.loggedInOccupant);
    return <Route>{props.isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Route>;
};

const mapStateToProps = (store: any) => {
    return {
        isLoggedIn: store.navReducer.isLoggedIn,
        loggedInOccupant: store.navReducer.loggedInOccupant,
    };
};

const ConnectedRoutes = withRouter(connect(mapStateToProps)(Routes));
export default ConnectedRoutes;



