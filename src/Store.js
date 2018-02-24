import { Platform } from 'react-native';    
import { 
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import devTools from 'remote-redux-devtools';
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
        middleware(),       
        devTools({
            name: Platform.OS,
            hostname: 'localhost',
            port: 5678
        }),
    )
);

export default Store;
