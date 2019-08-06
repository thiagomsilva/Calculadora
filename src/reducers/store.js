import {
    createStore,
    applyMiddleware }   from "redux";
import {
    persistStore,
    persistReducer }    from "redux-persist";
import storage          from "redux-persist/lib/storage";
import autoMergeLevel2  from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk            from "redux-thunk";
import reducers         from "./";

const persistConfig = {
    storage: storage,
    key: "primary",
    whitelist: ["general"],
    stateReconciler: autoMergeLevel2,
    timeout: 0,
    keyPrefix: ""
}

const _persistReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    _persistReducer,
    {},
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);
