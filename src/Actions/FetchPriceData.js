import axios from 'axios';
import { NNBITCOINS_PRICE_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_PRICE_DATA,
    FETCHING_PRICE_DATA_SUCCESS,
    FETCHING_PRICE_DATA_FAIL
} from './../Utils/ActionTypes';


export default function FetchPriceData() {
    return dispatch => {
        dispatch({ type: FETCHING_PRICE_DATA });

        return axios.get(`${NNBITCOINS_PRICE_BASE_URL}/last/hour/all.json?limit=100`)
            .then(res => {
                dispatch({ type: FETCHING_PRICE_DATA_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCHING_PRICE_DATA_FAIL, payload: err });
            });
     };
}

