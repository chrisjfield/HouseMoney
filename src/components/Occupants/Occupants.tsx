// Landing page for redirects from my house 
// - should handle setting occupant then route on to balance
import * as React from 'react';
import { IOccupantProps, IOccupant } from './occupantsInterfaces';
import { receiveOccupant } from './occupantsActions';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { RouteComponentProps } from 'react-router';

class Occupants extends React.Component<IOccupantProps> {
    componentWillMount() {
        // TODO: Ed - this pile of ifs is very messy, tidy this up! 
        if (!this.props.isLoggedIn
            && ((this.props.loggedInOccupant && !this.props.loggedInOccupant.token) || (!this.props.loggedInOccupant))) {

            if (this.props.location
                && this.props.location.search
                && this.props.match
                && this.props.match.path === houseMoneyRoutes.Occupants) {

                const occupantString: IOccupant = queryString.parse(this.props.location.search);

                if (occupantString.token
                    && occupantString.userId
                    && occupantString.email
                    && parseInt(occupantString.householdId.toString(), 2)
                    && parseInt(occupantString.occupantId.toString(), 2)
                    && occupantString.displayName) {

                    occupantString.householdId = parseInt(occupantString.householdId.toString(), 2);
                    occupantString.occupantId = parseInt(occupantString.occupantId.toString(), 2);

                    this.props.dispatch(receiveOccupant(occupantString, true));
                } else {
                    this.props.history.push(houseMoneyRoutes.Unknown);
                }
            } else {
                this.props.history.push(houseMoneyRoutes.Unknown);
            }
        } else {
            this.props.history.push(houseMoneyRoutes.Balance); 
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
