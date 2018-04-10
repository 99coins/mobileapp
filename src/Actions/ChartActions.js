// @Flow
import axios from 'axios';
import {
    LOADING_CHART_PRICES,
    LOADING_CHART_PRICES_SUCCESS,
    LOADING_CHART_PRICES_FAIL,
    SELECTED_CHART_RANGE,
    SELECTED_CURRENT_COIN
} from './../Utils/ActionTypes';

import { Range, RANGE_1D, RANGE_1W, RANGE_1M, RANGE_3M, RANGE_6M, RANGE_1Y, RANGE_MAX, CRYPTO_COMPARE_BASE_URL } from './../Utils/Constants';

// -----------------------------------------------------------------------------
// Actions
// -----------------------------------------------------------------------------

// Change current date range

export const selectRange = (range: Range) => {
     return dispatch => {
         dispatch({ type: SELECTED_CHART_RANGE, range });
     };
};
export const selectCoin = (symbol) => {
     return dispatch => {
         dispatch({ type: SELECTED_CURRENT_COIN, current: symbol });
     };
};

export function updateChartPrices() {
    return (dispatch, getState) => {
        dispatch({ type: LOADING_CHART_PRICES });
        const {
                chartState: { range, current },
             } = getState();
        return axios.get(`${CRYPTO_COMPARE_BASE_URL}/${buildAPIQuery(current, range)}`)
            .then(res => {
                dispatch({ type: LOADING_CHART_PRICES_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: LOADING_CHART_PRICES_FAIL, payload: err });
            });
    };
}
// Build API query based on symbol of interest and current date range
const buildAPIQuery = (symbol: string, range: Range): string => {

  let endpoint = 'histohour';
  let aggregate = 1;
  let limit = 24;

  switch (range) {
    case RANGE_1D:
      endpoint = 'histohour';
      aggregate = 1;
      limit = 24;
      break;
    case RANGE_1W:
      endpoint = 'histoday';
      aggregate = 1;
      limit = 7;
      break;
    case RANGE_1M:
      endpoint = 'histoday';
      aggregate = 1;
      limit = 30;
      break;
    case RANGE_3M:
      endpoint = 'histoday';
      aggregate = 3;
      limit = 30;
      break;
    case RANGE_6M:
      endpoint = 'histoday';
      aggregate = 6;
      limit = 30;
      break;
    case RANGE_1Y:
      endpoint = 'histoday';
      aggregate = 12;
      limit = 30;
      break;
    case RANGE_MAX:
      endpoint = 'histoday';
      aggregate = 200;
      limit = 2000; // maximum allowed limit
      break;
    default:
      endpoint = 'histohour';
      aggregate = 1;
      limit = 24;
      break;
  }

  return `data/${endpoint}?fsym=${symbol}&tsym=USD&aggregate=${aggregate}&limit=${limit}`;
};
