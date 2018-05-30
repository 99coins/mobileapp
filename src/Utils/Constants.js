export const COIN_MARKET_CAP_BASE_URL = 'https://api.coinmarketcap.com';
export const COIN_MARKET_CAP_BASE_ICON_URL = 'https://s2.coinmarketcap.com/static/img/coins/200x200';
export const CRYPTO_COMPARE_BASE_URL = 'https://min-api.cryptocompare.com';
export const NNBITCOINS_BASE_URL = 'https://99bitcoins.com/wp-json/99btc/v1';
export const NNBITCOINS_PRICE_BASE_URL = 'https://price.99bitcoins.com';
export const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
export const COINGECKO_BASE_IMAGE_URL = 'https://assets.coingecko.com/coins/images';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

export const RANGE_1D = '1D';
export const RANGE_1W = '1W';
export const RANGE_1M = '1M';
export const RANGE_3M = '3M';
export const RANGE_6M = '6M';
export const RANGE_1Y = '1Y';
export const RANGE_MAX = 'MAX';
export const RANGES = [RANGE_1D, RANGE_1W, RANGE_1M, RANGE_3M, RANGE_6M, RANGE_1Y, RANGE_MAX];


export const AUD = 'aud';
export const BRL = 'brl';
export const CAD = 'cad';
export const CHF = 'chf';
export const CNY = 'cny';
export const DKK = 'dkk';
export const EUR = 'eur';
export const GBP = 'gbp';
export const HKD = 'hkd';
export const IDR = 'idr';
export const INR = 'inr';
export const JPY = 'jpy';
export const KRW = 'krw';
export const MXN = 'mxn';
export const MYR = 'myr';
export const NZD = 'nzd';
export const RUB = 'rub';
export const SEK = 'sek';
export const USD = 'usd';

      // "aud": 9903.72776388555,
      // "brl": 27681.4453463166,
      // "btc": 1,
      // "cad": 9682.03886052151,
      // "chf": 7368.19113830601,
      // "cny": 47695.6444581238,
      // "dkk": 47950.5104832993,
      // "eth": 13.3760507658536,
      // "eur": 6443.58892018365,
      // "gbp": 5612.16816565204,
      // "hkd": 58339.9090769663,
      // "idr": 104220522.240682,
      // "inr": 504385.938611422,
      // "jpy": 807560.291982721,
      // "krw": 8066791.87335777,
      // "mxn": 147354.610203609,
      // "myr": 29619.2435536021,
      // "nzd": 10780.5570085344,
      // "php": 391924.269539442,
      // "pln": 27882.2479800328,
      // "rub": 467204.066058606,
      // "sek": 66559.9462395521,
      // "sgd": 10022.7772702334,
      // "twd": 223834.03999394,
      // "usd": 7435.48225269288,
      // "xag": 453.618845144356,
      // "xau": 5.71803456196588,
      // "xdr": 5270.25494974421,
      // "zar": 94205.70127105


// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export type Range = typeof RANGE_1D
  | typeof RANGE_1W
  | typeof RANGE_1M
  | typeof RANGE_3M
  | typeof RANGE_6M
  | typeof RANGE_1Y
  | typeof RANGE_MAX;
  

export type Currency = typeof AUD 
 | typeof BRL 
 | typeof CAD 
 | typeof CHF 
 | typeof CNY 
 | typeof DKK 
 | typeof EUR 
 | typeof GBP 
 | typeof HKD 
 | typeof IDR 
 | typeof INR 
 | typeof JPY 
 | typeof KRW 
 | typeof MXN 
 | typeof MYR 
 | typeof NZD 
 | typeof RUB 
 | typeof SEK 
 | typeof USD;
 