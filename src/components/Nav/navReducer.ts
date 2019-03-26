import { NavActions, navActionTypes } from './navActions';
import { INavReducer } from './navInterfaces';

function navReducer(
    state: INavReducer = {
        navOpen: false,
    },
    action: NavActions,
): INavReducer {
    let nextState: INavReducer;
    switch (action.type) {
    case navActionTypes.NAV_OPEN:
        nextState = { ...state,
            navOpen: true,
        };
        break;
    case navActionTypes.NAV_CLOSED:
        nextState = { ...state,
            navOpen: false,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default navReducer;
