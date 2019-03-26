
import { LocationChangeAction, LOCATION_CHANGE } from 'connected-react-router';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavActions } from '../Nav/navActions';

const routesEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    map(NavActions.navClosed),
);

export default routesEpic;
