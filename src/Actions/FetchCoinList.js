import axios from 'axios';
import { COIN_MARKET_CAP_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_COIN_LIST,
    FETCHING_COIN_LIST_SUCCESS,
    FETCHING_COIN_LIST_FAIL,
    CACHE_COIN_LIST,
    CACHE_COIN_LIST_SUCCESS,
    GET_CACHED_COIN_LIST,
    GET_CACHED_COIN_LIST_SUCCESS,

} from './../Utils/ActionTypes';
import { AsyncStorage } from 'react-native';

export function fetchCoinList() {
    return dispatch => {
        dispatch({ type: FETCHING_COIN_LIST });
        //dispatch(getCachedCoinList());
        return axios.get(`${COIN_MARKET_CAP_BASE_URL}/v2/listings/`)
            .then(res => {
                dispatch({ type: FETCHING_COIN_LIST_SUCCESS, payload: res.data });
                //dispatch(cacheCoinlist(res.data));
            })
            .catch(err => {
                dispatch({ type: FETCHING_COIN_LIST_FAIL, payload: err });
            });
    };
}

export const cacheCoinlist = (list) => {
  return dispatch => {
    dispatch({ type: CACHE_COIN_LIST });
    return AsyncStorage.setItem('@coinList', list)
      .then(() => {
        dispatch({ type: CACHE_COIN_LIST_SUCCESS }); 
      });
  };
};
export const getCachedCoinList = () => {
  return dispatch => {
    dispatch({ type: GET_CACHED_COIN_LIST });
    return AsyncStorage.getItem('@coinList')
      .then((value) => {
          if (value !== null) {
            dispatch(receiveData(value));
          }
      });
  };
};
export const receiveData = (value) => {
  return {
    type: GET_CACHED_COIN_LIST_SUCCESS,
    payload: value || '',
  };
};

