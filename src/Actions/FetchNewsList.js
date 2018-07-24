import axios from 'axios';
import {
    FETCHING_NEWS_LIST,
    FETCHING_NEWS_LIST_SUCCESS,
    FETCHING_NEWS_LIST_FAIL
} from './../Utils/ActionTypes';

export default function fetchNewsList() {
    return dispatch => {
        dispatch({ type: FETCHING_NEWS_LIST });

        return axios.get('http://api.mobile.99bitcoins.com/news/')
            .then(res => {
                dispatch({ type: FETCHING_NEWS_LIST_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCHING_NEWS_LIST_FAIL, payload: err });
            });
    };
}
