import axios from 'axios';
import { CRYPTO_COMPARE_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_NEWS_LIST,
    FETCHING_NEWS_LIST_SUCCESS,
    FETCHING_NEWS_LIST_FAIL
} from './../Utils/ActionTypes';


export default function FetchNewsList() {
    return dispatch => {
        dispatch({ type: FETCHING_NEWS_LIST });

        return axios.get(`${CRYPTO_COMPARE_BASE_URL}/data/news/`)
            .then(res => {
                dispatch({ type: FETCHING_NEWS_LIST_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCHING_NEWS_LIST_FAIL, payload: err });
            });
    };
}

