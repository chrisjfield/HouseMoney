import { ActionsUnion, createAction } from '../../helpers/actionCreator';

const loadingStarted = () => createAction(loadingActionTypes.LOADING_STARTED);
const loadingComplete = () => createAction(loadingActionTypes.LOADING_COMPLETED);

export const LoadingActions = {
    loadingStarted,
    loadingComplete,
};

export enum loadingActionTypes {
    LOADING_STARTED = 'LOADING_STARTED',
    LOADING_COMPLETED = 'LOADING_COMPLETED',
}

export type LoadingActions = ActionsUnion<typeof LoadingActions>;
