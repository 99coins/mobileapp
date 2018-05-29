// @Flow
import axios from 'axios';
import {
    LOADING_CHART_PRICES,
    LOADING_CHART_PRICES_SUCCESS,
    LOADING_CHART_PRICES_FAIL,
    SELECTED_CHART_RANGE,
    SELECTED_CURRENT_COIN
} from './../Utils/ActionTypes';

import { Range, RANGE_1D, RANGE_1W, RANGE_1M, RANGE_3M, RANGE_6M, RANGE_1Y, RANGE_MAX, COINGECKO_BASE_URL } from './../Utils/Constants';

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
        return axios.get(`${COINGECKO_BASE_URL}/coins/${current}/market_chart?vs_currency=usd&days=${daysFromRange(range)}`)
            .then(res => {
                dispatch({ type: LOADING_CHART_PRICES_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: LOADING_CHART_PRICES_FAIL, payload: err });
            });
    };
}
// Build API query based on symbol of interest and current date range
const daysFromRange = (range: Range): string => {

  let days = '1';

  switch (range) {
    case RANGE_1D:
      days = '1';
      break;
    case RANGE_1W:
      days = '7';
      break;
    case RANGE_1M:
      days = '30';
      break;
    case RANGE_3M:
      days = '90';
      break;
    case RANGE_6M:
      days = '180';
      break;
    case RANGE_1Y:
      days = '365';
      break;
    case RANGE_MAX:
      days = 'max';
      break;
    default:
      days = '1';
      break;
  }

  return days;
};

