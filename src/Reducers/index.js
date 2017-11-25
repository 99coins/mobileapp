import { combineReducers } from 'redux';
import CoinListReducer from './CoinListReducer';

export default combineReducers({
    crypto: CoinListReducer
});
