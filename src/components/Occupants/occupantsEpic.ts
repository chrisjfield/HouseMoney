import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionWithPayload } from '../../helpers/actionCreator';
import ajaxObservable from '../../helpers/ajaxHelper';
import { AjaxCallParams } from '../../interfaces/apiInterfaces';
import { occupantActionsTypes, OccupantsActions } from './occupantsActions';
import { IOccupant, IOccupantDetails } from './occupantsInterfaces';

// https://github.com/redux-observable/redux-observable/pull/459
// would improve type inference here and remove the need for ofType generic specified here
// figure out how to run redux observable with that pull request merged in!
const getHouseholdOccupantsRequestEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType<ActionWithPayload<occupantActionsTypes.GET_OCCUPANTS_OF_HOUSEHOLD_REQUEST, IOccupantDetails>>(
            occupantActionsTypes.GET_OCCUPANTS_OF_HOUSEHOLD_REQUEST),
        switchMap((params) => {
            const ajaxCallParams: AjaxCallParams = {
                token: params.payload.token,
                endpoint: endpoints.occupants,
                method: HTTPMethod.GET,
                urlParams: params.payload.userId + ',' + params.payload.occupantId.toString(),
            };
            return ajaxObservable<IOccupant[]>(ajaxCallParams).pipe(
                mergeMap(response => of(
                    OccupantsActions.receiveHouseholdOccupants(response),
                )),
            );
        },
        ),
    );
};

export default getHouseholdOccupantsRequestEpic;
