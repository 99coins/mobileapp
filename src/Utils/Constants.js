export const COIN_MARKET_CAP_BASE_URL = 'https://api.coinmarketcap.com';
export const COIN_MARKET_CAP_BASE_ICON_URL = 'https://s2.coinmarketcap.com/static/img/coins/200x200';
export const CRYPTO_COMPARE_BASE_URL = 'https://min-api.cryptocompare.com';
export const NNBITCOINS_BASE_URL = 'https://99bitcoins.com/wp-json/99btc/v1';
export const NNBITCOINS_PRICE_BASE_URL = 'https://price.99bitcoins.com';


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
  