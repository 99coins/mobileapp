
// @Flow

import {
  SELECTED_CURRENT_COIN,
  FETCHING_COIN_BY_ID,
  FETCHING_COIN_BY_ID_SUCCESS,
  FETCHING_COIN_BY_ID_FAIL,
  LOADING_CHART_PRICES,
  LOADING_CHART_PRICES_SUCCESS,
  LOADING_CHART_PRICES_FAIL,
  SELECTED_CHART_RANGE
} from './../Utils/ActionTypes';
import { Range } from './../Utils/Constants';

// -----------------------------------------------------------------------------
// Initial state
// -----------------------------------------------------------------------------

const initialState = {
  loadingCoinData: true,
  loadingChart: true,
  currentCoinId: null,
  coinData: {
    description: '',
    image: {
      thumb: '',
      small: ''
    },
    circulating_supply: '',
    currentPrice: '',
    market_cap: '',
    total_volume: '',
    name: '',
    symbol: '',
  },
  range: '1D',
  prices: []
};


// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

export default function (state = initialState, action) {
  switch (action.type) {

    case FETCHING_COIN_BY_ID: {
      return {
        ...state,
        loadingCoinData: true,
      };
    }

    case FETCHING_COIN_BY_ID_SUCCESS: {
      const data = action.payload.data;
      return {
        ...state,
        loadingCoinData: false,
        coinData: mapResponseToCoinData(data),

      };
    }

    case FETCHING_COIN_BY_ID_FAIL: {
      return {
        ...state,
        loadingCoinData: false,
      };
    }
    case LOADING_CHART_PRICES: {
      return {
        ...state,
        loadingChart: true,
      };
    }

    case LOADING_CHART_PRICES_SUCCESS: {
      const priceData = action.payload.prices;
      return {
        ...state,
        loadingChart: false,
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
        currentCoinId: current,
      };
    }

    default: {
      return state;
    }
  }
}

const numeral = require('numeral');

const mapResponseToCoinData = (data: Object): Object => {

  console.log('mapResponseToCoinData:', data);
  
  return (
    {
      description: data.description.en,
      image: data.image,
      circulating_supply: numeral(Number(data.market_data.circulating_supply)).format('0,0'),
      currentPrice: numeral(data.market_data.current_price.usd).format('0,0.00'),
      market_cap: numeral(data.market_data.market_cap.usd).format('0,0.00'),
      total_volume: numeral(data.market_data.total_volume.usd).format('0,0.00'),
      name: data.name,
      symbol: data.symbol,
    }
  );
};

const numberWithCommas = (x) => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
