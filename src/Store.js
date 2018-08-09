import { 
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import RootReducer from './Reducers';

function middleware() {
    if (__DEV__) {
        return applyMiddleware(promise, thunk, logger);
    }
    return applyMiddleware(promise, thunk);
} 

const Store = createStore(
    RootReducer,
    compose(
        middleware()
    )
);

export default Store;
