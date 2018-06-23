
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
import {
  Path
} from 'react-native/Libraries/ART/ReactNativeART';
import {
  Dimensions
} from 'react-native';

// -----------------------------------------------------------------------------
// Initial state
// -----------------------------------------------------------------------------

const initialState = {
  currentCoinId: null,
  coinData: {
    loading: true,
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
  chartData: {
    loading: true,
    range: '1D',
    prices: [],
    high: 0,
    low: 0,
    highPoint: { x: 0, y: 0 },
    lowPoint: { x: 0, y: 0 },
    path: null
  }
};


// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

export default function (state = initialState, action) {
  switch (action.type) {

    case FETCHING_COIN_BY_ID: {
      return {
        ...state,
        chartData: initialState.chartData,
        coinData: state.coinData
      };
    }

    case FETCHING_COIN_BY_ID_SUCCESS: {
      const data = action.payload.data;
      return {
        ...state,
        coinData: mapResponseToCoinData(data),
      };
    }

    case FETCHING_COIN_BY_ID_FAIL: {
      return {
        ...state,
        coinData: {
          ...state.coinData,
          loading: false
        }
      };
    }
    case LOADING_CHART_PRICES: {
      return {
        ...state,
       // chartData: state.chartData
      };
    }

    case LOADING_CHART_PRICES_SUCCESS: {
      const priceData = action.payload.prices;
      const prices = priceData ? priceData.map(item => item[1]) : [];
      const pathData = buildPath(prices);
      const high = Math.max(...prices);
      const low = Math.min(...prices);
      return {
        ...state,
        chartData: {
        range: state.chartData.range,
         loading: false,
         prices, // use closing prices
         high: numeral(high).format(high < 1 ? '0,0.00000' : '0,0.00'),
         low: numeral(low).format(low < 1 ? '0,0.00000' : '0,0.00'),
         highPoint: pathData.highPoint,
         lowPoint: pathData.lowPoint,
         path: pathData.path
        }
      };
    }

    case SELECTED_CHART_RANGE: {
      const { range } = action;
      return {
        ...state,
        chartData: {
          ...state.chartData,
          range
        }
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
  
  return (
    {
      loading: false,
      description: data.description.en,
      image: data.image,
      circulating_supply: numeral(Number(data.market_data.circulating_supply)).format('0,0'),
      currentPrice: numeral(data.market_data.current_price.usd).format(data.market_data.current_price.usd < 1 ? '0,0.00000' : '0,0.00'),
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

const buildPath = (values: Array<number>) : Object => {
    const strokeWidth = 1;
    const width = Dimensions.get('window').width - 50;
    const height = 150;

    let firstPoint: boolean = true;
      // holds x and y coordinates of the previous point when iterating
    let previous: { x: number, y: number };

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values) - minValue;
      // step between each value point on horizontal (x) axis
    const stepX = width / (values.length - 1 || 1);
      // step between each value point on vertical (y) axis
    const stepY = maxValue ? (height - (strokeWidth * 2)) / maxValue : 0;
      // adjust values so that min value becomes 0 and goes to the bottom edge
    const adjustedValues = values.map(value => value - minValue)
      ;
    // start from the left bottom corner so we could fill the area with color
    const path = Path().moveTo(-strokeWidth, strokeWidth);

    let high: { x: number, y: number };
    let low: { x: number, y: number };

    adjustedValues.forEach((number, index) => {
      const x = index * stepX;
      const y = (-number * stepY) - strokeWidth;

      if (number === maxValue) {
          high = { x, y };
      }
      if (number === 0) {
          low = { x, y };
      }
      if (firstPoint) {
        // straight line to the first point
        path.lineTo(-strokeWidth, y);
      } else {
        // make curved line
        path.curveTo(previous.x + (stepX / 3), previous.y, x - (stepX / 3), y, x, y);
      }
      // save current x and y coordinates for the next point
      previous = { x, y };
      firstPoint = false;
    });

    return {
      highPoint: high,
      lowPoint: low,
      path: path.lineTo(width + strokeWidth, strokeWidth).close()
    };
  };
