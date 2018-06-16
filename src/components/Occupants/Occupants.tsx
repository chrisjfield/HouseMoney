import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { OccupantsActions } from './occupantsActions';
import { occupantIsValid, parseOccupant, redirectToMyHouse } from './occupantsCommon';
import { ILoggedInOccupant, IOccupant, IOccupantProps, LogoutReason } from './occupantsInterfaces';

class Occupants extends React.Component<IOccupantProps> {
    componentWillReceiveProps(nextProps: IOccupantProps) {
        const occpantToLogin: ILoggedInOccupant = {
            loggedInOccupant: nextProps.loggedInOccupant,
            isLoggedIn: nextProps.isLoggedIn,
        };
        if (occupantIsValid(occpantToLogin)) {
            this.props.history.push(houseMoneyRoutes.Balance);
        }
    }

    componentDidMount() {
        const occpantToLogin: ILoggedInOccupant = {
            loggedInOccupant: this.props.loggedInOccupant,
            isLoggedIn: this.props.isLoggedIn,
        };
        if (occupantIsValid(occpantToLogin)) {
            this.props.history.push(houseMoneyRoutes.Balance);
        } else {
            if (this.props.location
                && this.props.location.search
                && this.props.match
                && this.props.match.path === houseMoneyRoutes.Occupants) {
                const occupant: IOccupant = parseOccupant(this.props.location.search);
                const parsedOccpantToLogin: ILoggedInOccupant = {
                    loggedInOccupant: occupant,
                    isLoggedIn: true,
                };
                if (occupantIsValid(parsedOccpantToLogin)) {
                    this.props.dispatch(OccupantsActions.receiveOccupant(parsedOccpantToLogin));
                    this.props.history.push(houseMoneyRoutes.Balance);
                } else {
                    redirectToMyHouse(LogoutReason.InvalidPassthrough);
                }
            } else {
                redirectToMyHouse(LogoutReason.InvalidPassthrough);
            }
        }
    }

    render(): null {
        return null;
    }
}

function mapStateToProps(store: IStore, ownProps: RouteComponentProps<string>) {
    return {
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        isLoggedIn: store.occupantsReducer.isLoggedIn,
    };
}

export default connect(mapStateToProps)(Occupants);
