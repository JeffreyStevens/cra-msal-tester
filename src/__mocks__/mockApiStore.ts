import {AnyAction, combineReducers, configureStore, EnhancedStore, Middleware, Reducer} from '@reduxjs/toolkit';
import {allMiddleware, allReducers} from './mockReducers';

export function setupApiStore<
    A extends {
        reducer: Reducer<any, any>;
        reducerPath: string;
        middleware: Middleware;
        util: {resetApiState(): any};
    },
    R extends Record<string, Reducer<any, any>> = Record<never, never>,
>(api: A, preloadedState: any, extraReducers?: R): {api: any; store: EnhancedStore} {
    const combinedReducers = combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
        ...allReducers,
    });
    const rootReducer = (state: any, action: any) => {
        if (action.type === 'RESET') {
            state = undefined;
        }
        if (action.type === 'DUMP') {
            console.log(state);
        }
        return combinedReducers(state, action);
    };
    const getStore = (): EnhancedStore =>
        configureStore({
            preloadedState,
            reducer: rootReducer,
            middleware: (gdm) =>
                gdm({
                    serializableCheck: false,
                    immutableCheck: false,
                }).concat(api.middleware, ...allMiddleware) as any,
        });

    type StoreType = EnhancedStore<
        {
            api: ReturnType<A['reducer']>;
        } & {
            [K in keyof R]: ReturnType<R[K]>;
        },
        AnyAction,
        ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M> ? M : never
    >;

    const initialStore = getStore() as StoreType;
    const refObj = {
        api,
        store: initialStore,
    };
    refObj.store = getStore() as StoreType;

    return refObj;
}
