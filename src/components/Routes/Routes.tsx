import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { IRoutesProps, IRoutesComponent } from './interfaces';

import Balance from '../Balance';
import ViewTransactions from '../ViewTransactions';
import AddTransaction from '../AddTransaction';
import HouseSummary from '../HouseSummary';
import NotFound404 from '../NotFound404';
import { checkAuthorization } from '../Occupants/occupantsActions';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import Occupants from '../Occupants/Occupants';

const LoggedInRoutes: React.StatelessComponent<IRoutesComponent> = (props) => {
    return (
        <Switch>
            <Route exact path={houseMoneyRoutes.Base} component={props.occupantAuthed(Balance)} />
            <Route path={houseMoneyRoutes.Balance} component={props.occupantAuthed(Balance)} />
            <Route path={houseMoneyRoutes.ViewTransactions} component={props.occupantAuthed(ViewTransactions)} />
            <Route path={houseMoneyRoutes.AddTransaction} component={props.occupantAuthed(AddTransaction)} />
            <Route path={houseMoneyRoutes.HouseSummary} component={props.occupantAuthed(HouseSummary)} />
            <Route exact path={houseMoneyRoutes.Unknown} component={props.occupantAuthed(NotFound404)} />
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

export class Routes extends React.Component<RouteComponentProps<any> & IRoutesProps> {
    occupantAuthed(component: React.Component) {
        this.props.dispatch(checkAuthorization(this.props.loggedInOccupant));
    }
    render() {
        return <Route>{this.props.isLoggedIn
            ? <LoggedInRoutes occupantAuthed={this.occupantAuthed} />
            : <LoggedOutRoutes />}</Route>;
    }
}

const mapStateToProps = (store: IStore) => {
    return {
        isLoggedIn: store.occupantsReducer.isLoggedIn,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
    };
};

const ConnectedRoutes = withRouter(connect(mapStateToProps)(Routes));
export default ConnectedRoutes;
