import { combineReducers } from 'redux';
import CoinListReducer from './CoinListReducer';
import PriceDataReducer from './PriceDataReducer';
import NewsListReducer from './NewsListReducer';
import LessonListReducer from './LessonListReducer';
import AppStateReducer from './AppStateReducer';

import WeeklyVideoReducer from './WeeklyVideoReducer';

import ChatReducer from './ChatReducer';
import CoinReducer from './CoinReducer';
import Routes from './SceneReducer';


export default combineReducers({
    priceData: PriceDataReducer,
    coinList: CoinListReducer,
    newsList: NewsListReducer,
    weeklyVideo: WeeklyVideoReducer,
    chatState: ChatReducer,
    coinState: CoinReducer,
    lessonList: LessonListReducer,
    routes: Routes,
    appState: AppStateReducer
});
