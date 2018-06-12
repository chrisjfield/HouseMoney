export interface ILoadingProps extends ILoadingStore { }

export interface ILoadingStore extends ILoadingReducer { }

export interface ILoadingReducer {
    loading: number;
}
