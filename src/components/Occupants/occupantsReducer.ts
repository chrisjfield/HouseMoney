import { occupantActions } from './occupantsActions';
import { IReceiveOccupantAction, IOccupantReducer } from './occupantsInterfaces';

function occuapntsReducer(
    state: IOccupantReducer = {
        isLoggedIn: false,
        loggedInOccupant: {
            occupantId: 0,
            userId: '',
            email: '',
            displayName: '',
            token: '',
        },
    },
    action: IReceiveOccupantAction,
): IOccupantReducer {
    let nextState: IOccupantReducer;
    switch (action.type) {
    case occupantActions.RECEIVE_OCCUPANT:
        nextState = { 
            ...state,
            loggedInOccupant: action.loggedInOccupant,
            isLoggedIn: action.isLoggedIn,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

// Export Reducer
export default occuapntsReducer;
