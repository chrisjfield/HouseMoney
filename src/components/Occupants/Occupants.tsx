import * as queryString from 'query-string';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as redux from 'redux';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { OccupantsActions, getLogoutUrlWithDetails } from './occupantsActions';
import { IOccupant, IOccupantProps, LogoutReason } from './occupantsInterfaces';

class Occupants extends React.Component<IOccupantProps> {
    componentWillReceiveProps(nextProps: IOccupantProps) {
        if (occupantIsValid(nextProps.loggedInOccupant, nextProps.isLoggedIn)) {
            this.props.history.push(houseMoneyRoutes.Balance);
        }
    }

    componentDidMount() {
        if (occupantIsValid(this.props.loggedInOccupant, this.props.isLoggedIn)) {
            this.props.history.push(houseMoneyRoutes.Balance);
        } else {
            if (this.props.location
                && this.props.location.search
                && this.props.match
                && this.props.match.path === houseMoneyRoutes.Occupants) {
                const occupant: IOccupant = parseOccupant(this.props.location.search);

                if (occupantIsValid(occupant, true)) {
                    // this.props.dispatch(this.props.receiveOccupant(occupant, true));
                    this.props.history.push(houseMoneyRoutes.Balance);
                } else {
                    this.redirectToMyHouse();
                }
            } else {
                this.redirectToMyHouse();
            }
        }
    }

    redirectToMyHouse() {
        window.location.replace(getLogoutUrlWithDetails(LogoutReason.InvalidPassthrough));
    }

    render(): null {
        return null;
    }
}

function occupantIsValid(occupant: IOccupant, isLoggedIn: boolean) {
    let loggedIn: boolean = false;
    if (isLoggedIn && occupant && occupant.token && occupant.occupantId && occupant.displayName && occupant.email && occupant.userId) {
        loggedIn = true;
    }
    return loggedIn;
}

function parseOccupant(occupantString: string) {
    const occupant: IOccupant = queryString.parse(occupantString);
    occupant.occupantId = parseInt(occupant.occupantId.toString(), 2);

    return occupant;
}

function mapStateToProps(store: IStore, ownProps: RouteComponentProps<string>) {
    return {
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        isLoggedIn: store.occupantsReducer.isLoggedIn,
    };
}

const mapDispatchToProps = (dispatch: redux.Dispatch<redux.Action>) =>
    redux.bindActionCreators(OccupantsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Occupants);
