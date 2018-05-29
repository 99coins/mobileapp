
// @Flow

import {
    LOADING_CHART_PRICES,
    LOADING_CHART_PRICES_SUCCESS,
    LOADING_CHART_PRICES_FAIL,
    SELECTED_CHART_RANGE,
    SELECTED_CURRENT_COIN
    
} from './../Utils/ActionTypes';
import { Range } from './../Utils/Constants';

// export type State = {
//   +loading: boolean,      // activity indicator flag
//   +current: String, //current coin symbol
//   +range: Range,          // current date range
//   +prices: Array<number>, // historical prices
// };


// -----------------------------------------------------------------------------
// Initial state
// -----------------------------------------------------------------------------

const initialState = {
  loading: true,  // show activity indicator on first load
  current: 'bitcoin',
  range: '1D',    // default to one day range
  prices: [],     // no price data initially
};


// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

export default function (state = initialState, action) {
  switch (action.type) {

    case LOADING_CHART_PRICES: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOADING_CHART_PRICES_SUCCESS: {
     //const { payload: { Data } } = action;
     const priceData = action.payload.prices;
      return {
        ...state,
        loading: false,
        prices: priceData ? priceData.map(item => item[1]) : [] // use closing prices
        //prices: action.payload
      };
    }

    case SELECTED_CHART_RANGE: {
      const { range } = action;
      return {
        ...state,
        range,
      };
    }
    case SELECTED_CURRENT_COIN: {
      const { current } = action;
      return {
        ...state,
        current,
      };
    }

    default: {
      return state;
    }
  }
}
