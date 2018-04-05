import axios from 'axios';
import { COIN_MARKET_CAP_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_COIN_BY_ID,
    FETCHING_COIN_BY_ID_SUCCESS,
    FETCHING_COIN_BY_ID_FAIL
} from './../Utils/ActionTypes';


export default function FetchCoinByID() {
    return dispatch => {
        dispatch({ type: FETCHING_COIN_BY_ID });

        return axios.get(`${COIN_MARKET_CAP_BASE_URL}/v1/ticker/?limit=50`)
            .then(res => {
                dispatch({ type: FETCHING_COIN_BY_ID_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCHING_COIN_BY_ID_FAIL, payload: err });
            });
     };
}
