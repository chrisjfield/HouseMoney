import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionWithPayload } from '../../helpers/actionCreator';
import ajaxObservable from '../../helpers/ajaxHelper';
import { AjaxCallParams } from '../../interfaces/apiInterfaces';
import { IOccupantDetails } from '../Occupants/occupantsInterfaces';
import { BalanceActions, balanceActionTypes } from './balanceActions';
import { IBalance } from './balanceInterfaces';

const balanceRequestEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(balanceActionTypes.GET_BALANCE_REQUEST),
        switchMap((params: ActionWithPayload<balanceActionTypes.GET_BALANCE_REQUEST, IOccupantDetails>) => {
            const balanceAjaxParams: AjaxCallParams = {
                token: params.payload.token,
                method: HTTPMethod.GET,
                endpoint: endpoints.balance,
                urlParams: params.payload.userId + ',' + params.payload.occupantId.toString(),
            };
            return ajaxObservable<IBalance[]>(balanceAjaxParams).pipe(
                mergeMap(response => of(
                    BalanceActions.receiveBalance(response),
                )),
            );
        },
        ),
    );
};

export default balanceRequestEpic;
