import { combineReducers } from 'redux';
import CoinListReducer from './CoinListReducer';
import PriceDataReducer from './PriceDataReducer';
import NewsListReducer from './NewsListReducer';


export default combineReducers({
    priceData: PriceDataReducer,
    coinList: CoinListReducer,
    newsList: NewsListReducer
});
