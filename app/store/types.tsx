export interface TypedAction<T> {
    type: T;
}

export interface Action<T, P> extends TypedAction<T> {
    payload: P;
}