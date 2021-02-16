import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

let devtools = x => x;

export function configureStore(initialState) {

    if (
        process.env.NODE_ENV !== "production" &&
        process.browser &&
        window.__REDUX_DEVTOOLS_EXTENSION__
    ) {
        devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
    }

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares), devtools)
    );

    sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
