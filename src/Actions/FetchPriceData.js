import axios from 'axios';
import { COIN_MARKET_CAP_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_PRICE_DATA,
    FETCHING_PRICE_DATA_SUCCESS,
    FETCHING_PRICE_DATA_FAIL
} from './../Utils/ActionTypes';


export default function FetchPriceData() {
    return dispatch => {
        dispatch({ type: FETCHING_PRICE_DATA });

        return axios.get(`${COIN_MARKET_CAP_BASE_URL}/v1/ticker/?limit=10`)
            .then(res => {
                dispatch({ type: FETCHING_PRICE_DATA_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCHING_PRICE_DATA_FAIL, payload: err.data });
            });
     };
}

