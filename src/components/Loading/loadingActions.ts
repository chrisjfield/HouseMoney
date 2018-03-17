import { Action } from 'redux';

export enum loadingActions {
    LOADING_STARTED = 'LOADING_STARTED',
    LOADING_COMPLETED = 'LOADING_COMPLETED',
}

export function loadingStarted(): Action {
    return { type: loadingActions.LOADING_STARTED };
}

export function loadingComplete(): Action {
    return { type: loadingActions.LOADING_COMPLETED };
}
