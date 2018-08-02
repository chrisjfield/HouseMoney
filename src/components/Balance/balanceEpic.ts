import * as queryString from 'query-string';
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
        ofType<ActionWithPayload<balanceActionTypes.GET_BALANCE_REQUEST, IOccupantDetails>>(balanceActionTypes.GET_BALANCE_REQUEST),
        switchMap((params) => {
            const urlParams = queryString.stringify({
                userId: params.payload.userId,
                occupantId: params.payload.occupantId,
            });
            const balanceAjaxParams: AjaxCallParams = {
                urlParams,
                token: params.payload.token,
                method: HTTPMethod.GET,
                endpoint: endpoints.balance,
            };
            return ajaxObservable<IBalance[]>(balanceAjaxParams).pipe(
                mergeMap((response: IBalance[]) => of(
                    BalanceActions.receiveBalance(response),
                )),
            );
        },
        ),
    );
};

export default balanceRequestEpic;
