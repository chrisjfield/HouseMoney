import { Action } from 'redux';

export enum loadingActions {
    LOADING_STARTED = 'LOADING_STARTED',
    LOADING_COMPLETED = 'LOADING_COMPLETED',
}

export function loadingStarted() {
    const loadingStartedAction: Action = {
        type: loadingActions.LOADING_STARTED,
    };
    return loadingStartedAction;
}

export function loadingComplete() {
    const loadingCompletedAction: Action = {
        type: loadingActions.LOADING_COMPLETED,
    };
    return loadingCompletedAction;
}
