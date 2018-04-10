import { combineReducers } from 'redux';
import CoinListReducer from './CoinListReducer';
import PriceDataReducer from './PriceDataReducer';
import NewsListReducer from './NewsListReducer';
import WeeklyVideoReducer from './WeeklyVideoReducer';

import ChatReducer from './ChatReducer';
import ChartReducer from './ChartReducer';


export default combineReducers({
    priceData: PriceDataReducer,
    coinList: CoinListReducer,
    newsList: NewsListReducer,
    weeklyVideo: WeeklyVideoReducer,
    chatState: ChatReducer,
    chartState: ChartReducer
});
