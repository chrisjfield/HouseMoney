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
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';

const LoggedInRoutes: React.StatelessComponent = () => {
    return (
        <Switch>
            <Route exact path={houseMoneyRoutes.Base} component={Balance} />
            <Route path={houseMoneyRoutes.Balance} component={Balance} />
            <Route path={houseMoneyRoutes.ViewTransactions} component={ViewTransactions} />
            <Route path={houseMoneyRoutes.AddTransaction} component={AddTransaction} />
            <Route path={houseMoneyRoutes.HouseSummary} component={HouseSummary} />
            <Route exact path={houseMoneyRoutes.Unknown} component={NotFound404} />
        </Switch>
    );
};

const LoggedOutRoutes: React.StatelessComponent = () => {
    return (
        <Switch>
            <Route exact path={houseMoneyRoutes.Unknown} component={NotFound404} />
        </Switch>
    );
};

// TODO: Have an recieve handle sign in / recieve occupant action which accepts url params from myhouse
export const Routes: React.StatelessComponent<RouteComponentProps<any> & IRoutesProps> = (props) => {
    checkAuthorization(props.loggedInOccupant);
    return <Route>{props.isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Route>;
};

const mapStateToProps = (store: IStore) => {
    return {
        isLoggedIn: store.occupantsReducer.isLoggedIn,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
    };
};

const ConnectedRoutes = withRouter(connect(mapStateToProps)(Routes));
export default ConnectedRoutes;



