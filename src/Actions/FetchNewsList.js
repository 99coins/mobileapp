import axios from 'axios';
import { CRYPTO_COMPARE_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_NEWS_LIST,
    FETCHING_NEWS_LIST_SUCCESS,
    FETCHING_NEWS_LIST_FAIL,
    VIEWABLE_NEWS_ITEMS_CHANGED
} from './../Utils/ActionTypes';


export function fetchNewsList() {
    return dispatch => {
        dispatch({ type: FETCHING_NEWS_LIST });

        // return axios.get(`${CRYPTO_COMPARE_BASE_URL}/data/news/`)
        //     .then(res => {
        //         dispatch({ type: FETCHING_NEWS_LIST_SUCCESS, payload: res.data });
        //     })
        //     .catch(err => {
        //         dispatch({ type: FETCHING_NEWS_LIST_FAIL, payload: err });
        //     });

        return axios.get('http://api.mobile.99bitcoins.com/news/')
            .then(res => {
                dispatch({ type: FETCHING_NEWS_LIST_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCHING_NEWS_LIST_FAIL, payload: err });
            });
    };
}

export const updateViewableNewsItems = (items) => {
    return dispatch => {
         dispatch({ type: VIEWABLE_NEWS_ITEMS_CHANGED, payload: items });
     };
};


// export const checkIfViewable = (itemId) => {
//     return dispatch => {
//          dispatch({ type: CHECK_IF_VIEWABLE, payload: itemId });
//      };
// };
