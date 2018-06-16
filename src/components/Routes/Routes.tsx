import * as React from 'react';
import { connect } from 'react-redux';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import AddTransaction from '../AddTransaction';
import Balance from '../Balance';
import HouseSummary from '../HouseSummary';
import NotFound404 from '../NotFound404';
import Occupants from '../Occupants/Occupants';
import { checkHouseholdAuthorization } from '../Occupants/occupantsHelper';
import ViewTransactions from '../ViewTransactions';
import { IRoutesProps } from './routesInterfaces';

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
            <Route exact path={houseMoneyRoutes.Occupants} component={Occupants} />
            <Route exact path={houseMoneyRoutes.Unknown} component={NotFound404} />
        </Switch>
    );
};

const Routes: React.StatelessComponent<RouteComponentProps<{}> & IRoutesProps> = (props) => {
    checkHouseholdAuthorization(props.loggedInOccupant);
    return (
        <Route>{
            props.isLoggedIn
                ? <LoggedInRoutes />
                : <LoggedOutRoutes />
        }</Route>
    );
};

const mapStateToProps = (store: IStore, ownProps: RouteComponentProps<{}, StaticContext>) => {
    return {
        loading: store.loadingReducer.loading,
        isLoggedIn: store.occupantsReducer.isLoggedIn,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
    };
};

const ConnectedRoutes = withRouter(connect(mapStateToProps)(Routes));
export default ConnectedRoutes;
