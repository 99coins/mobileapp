import axios from 'axios';
import { COINGECKO_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_COIN_LIST,
    FETCHING_COIN_LIST_SUCCESS,
    FETCHING_COIN_LIST_FAIL,
    CACHE_COIN_LIST,
    CACHE_COIN_LIST_SUCCESS,
    GET_CACHED_COIN_LIST,
    GET_CACHED_COIN_LIST_SUCCESS,
    SET_COIN_SEARCH_INPUT

} from './../Utils/ActionTypes';
import { AsyncStorage } from 'react-native';

export function fetchCoinList() {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_COIN_LIST });
        const { page } = getState();
        return axios.get(`${COINGECKO_BASE_URL}/coins?per_page=100&page=1&order=market_cap_desc`)
            .then(res => {
                dispatch({ type: FETCHING_COIN_LIST_SUCCESS, payload: res.data });
                dispatch(cacheCoinlist(res.data));
            })
            .catch(err => {
                dispatch({ type: FETCHING_COIN_LIST_FAIL, payload: err });
            });
    };
}

export const cacheCoinlist = (list) => {
  return dispatch => {
    dispatch({ type: CACHE_COIN_LIST });
    return AsyncStorage.setItem('coinList', JSON.stringify(list))
      .then(() => {
        dispatch({ type: CACHE_COIN_LIST_SUCCESS }); 
      });
  };
};
export function getCachedCoinList() {
  return dispatch => {
    dispatch({ type: GET_CACHED_COIN_LIST });
    return AsyncStorage.getItem('coinList')
      .then((value) => {
          if (value !== null) {
            dispatch(receiveData(JSON.parse(value)));
          }
      });
  };
}
export const receiveData = (value) => {
  return {
    type: GET_CACHED_COIN_LIST_SUCCESS,
    payload: value || '',
  };
};

export const setSearchInput = (text) => {
  return dispatch => {
    dispatch({ type: SET_COIN_SEARCH_INPUT, payload: text && text.length > 1 ? text : null });
  };
};

