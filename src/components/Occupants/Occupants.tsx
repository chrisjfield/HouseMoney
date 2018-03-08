// Landing page for redirects from my house 
// - should handle setting occupant then route on to balance
import * as React from 'react';
import { IOccupantProps, ILoggedInOccupant } from './occupantsInterfaces';
import { receiveOccupant } from './occupantsActions';
import { houseMoneyRoutes } from '../../enums/routesEnum';
import { IStore } from '../../interfaces/storeInterface';
import { connect } from 'react-redux';
import * as queryString from 'query-string';

class Occupants extends React.Component<IOccupantProps> {
    componentWillReceiveProps(nextProps: IOccupantProps) {
        const occupantString: ILoggedInOccupant = queryString.parse(nextProps.location.search);
        if (occupantString.loggedInOccupant && occupantString.isLoggedIn) {
            this.props.dispatch(receiveOccupant(occupantString.loggedInOccupant, occupantString.isLoggedIn));
            this.props.history.push(houseMoneyRoutes.Balance);
        } else {
            this.props.history.push(houseMoneyRoutes.Unknown);
        }
    }

    render() {
        return (
            <div> Ed, you are lost
            </div>
        );
    }
}

function mapStateToProps(store: IStore, ownProps: IOccupantProps) {
    return { location: store.occupantsReducer.location };
}

export default connect(mapStateToProps)(Occupants);
