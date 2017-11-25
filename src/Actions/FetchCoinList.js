import axios from 'axios';
import { CRYPTO_COMPARE_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_COIN_LIST,
    FETCHING_COIN_LIST_SUCCESS,
    FETCHING_COIN_LIST_FAIL
} from './../Utils/ActionTypes';


export default function FetchCoinList() {

    return dispatch => {
        dispatch({ type: FETCHING_COIN_LIST })

        return axios.get(`${CRYPTO_COMPARE_BASE_URL}/data/all/coinlist`)
            .then(res => {
                dispatch({ type: FETCHING_COIN_LIST_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCHING_COIN_LIST_FAIL, payload: err.data });
            });
    };
}

