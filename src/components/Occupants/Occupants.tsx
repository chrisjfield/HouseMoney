import * as React from 'react';
import { IOccupantProps, IOccupant } from './occupantsInterfaces';
import { receiveOccupant } from './occupantsActions';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { RouteComponentProps } from 'react-router';
import { myHouseUrl } from '../../appConfig';

class Occupants extends React.Component<IOccupantProps> {
    componentWillReceiveProps(nextProps: IOccupantProps) {
        if (checkOccupant(nextProps.loggedInOccupant, nextProps.isLoggedIn)) {
            this.props.history.push(houseMoneyRoutes.Balance);
        }
    }

    componentWillMount() {
        if (checkOccupant(this.props.loggedInOccupant, this.props.isLoggedIn)) {
            if (this.props.location
                && this.props.location.search
                && this.props.match
                && this.props.match.path === houseMoneyRoutes.Occupants) {
                const occupant: IOccupant = parseOccupant(this.props.location.search);

                if (checkOccupant(occupant, true)) {
                    this.props.dispatch(receiveOccupant(occupant, true));
                } else {
                    this.props.history.push(myHouseUrl); 
                }
            } else {
                this.props.history.push(myHouseUrl);
            }
        } else {
            this.props.history.push(houseMoneyRoutes.Balance);
        }
    }

    render(): null {
        return null;
    }
}

function checkOccupant(occupant: IOccupant, isLoggedIn: boolean) {
    let haveLoggedInOccupant: boolean = false;
    if (isLoggedIn && occupant && occupant.token && occupant.occupantId && occupant.displayName && occupant.email && occupant.userId) {
        haveLoggedInOccupant = true;
    }
    return haveLoggedInOccupant;
}

function parseOccupant(occupantString: string) {
    const occupant: IOccupant = queryString.parse(occupantString);
    occupant.householdId = parseInt(occupant.householdId.toString(), 2);
    occupant.occupantId = parseInt(occupant.occupantId.toString(), 2);

    return occupant;
}

function mapStateToProps(store: IStore, ownProps: RouteComponentProps<string>) {
    return {
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        isLoggedIn: store.occupantsReducer.isLoggedIn,
    };
}

export default connect(mapStateToProps)(Occupants);
