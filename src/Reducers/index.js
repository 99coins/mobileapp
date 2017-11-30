import { combineReducers } from 'redux';
import CoinListReducer from './CoinListReducer';
import PriceDataReducer from './PriceDataReducer';

export default combineReducers({
    priceData: PriceDataReducer
});
