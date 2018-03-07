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

class Routes extends React.Component<RouteComponentProps<any> & IRoutesProps> {
    getRoutes() {
        checkAuthorization(this.props.loggedInOccupant);
        let routes: JSX.Element;
        if (this.props.isLoggedIn) {
            routes = (
                <Switch>
                    <Route exact path="/" component={Balance} />
                    <Route path="/Balance" component={Balance} />
                    <Route path="/ViewTransactions" component={ViewTransactions} />
                    <Route path="/AddTransaction" component={AddTransaction} />
                    <Route path="/HouseSummary" component={HouseSummary} />
                    <Route exact path="*" component={NotFound404} />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route exact path="*" component={NotFound404} />
                </Switch>
            ); // TODO: Have an recieve handle sign in / recieve occupant action which accepts url params from myhouse
        }
        return routes;
    }


    render() {
        return <Route>{gubs}</Route>;
    }
}

const mapStateToProps = (store: any) => {
    return {
        isLoggedIn: store.navReducer.isLoggedIn,
        loggedInOccupant: store.navReducer.loggedInOccupant,
    };
};

const ConnectedRoutes = withRouter(connect(mapStateToProps)(Routes));
export default ConnectedRoutes;


const gubs: React.StatelessComponent<IRoutesProps> = (props) => {
    checkAuthorization(props.loggedInOccupant);
    let routes: JSX.Element;
    if (props.isLoggedIn) {
        routes = (
            <Switch>
                <Route exact path="/" component={Balance} />
                <Route path="/Balance" component={Balance} />
                <Route path="/ViewTransactions" component={ViewTransactions} />
                <Route path="/AddTransaction" component={AddTransaction} />
                <Route path="/HouseSummary" component={HouseSummary} />
                <Route exact path="*" component={NotFound404} />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route exact path="*" component={NotFound404} />
            </Switch>
        ); // TODO: Have an recieve handle sign in / recieve occupant action which accepts url params from myhouse
    }
    return routes;
};
export { gubs };
