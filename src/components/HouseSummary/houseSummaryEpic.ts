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
import { HouseSummaryActions, houseSummaryActionTypes } from './houseSummaryActions';
import { ITransactionSummary } from './houseSummaryInterfaces';

const houseSummaryEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType<ActionWithPayload<houseSummaryActionTypes.GET_TRANSACTION_SUMMARY_REQUEST, IOccupantDetails>>(
            houseSummaryActionTypes.GET_TRANSACTION_SUMMARY_REQUEST,
        ),
        switchMap((params) => {
            const urlParams = queryString.stringify({
                userId: params.payload.userId,
                occupantId: params.payload.occupantId,
            });
            const ajaxCallParams: AjaxCallParams = {
                urlParams,
                token: params.payload.token,
                endpoint: endpoints.transactionSummary,
                method: HTTPMethod.GET,
            };
            return ajaxObservable<ITransactionSummary[]>(ajaxCallParams).pipe(
                mergeMap((response: ITransactionSummary[]) => of(
                    HouseSummaryActions.receiveTransactionSummary(response),
                )),
            );
        }),
    );
};

export default houseSummaryEpic;
