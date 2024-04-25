export type Coin = {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  total_volume: number;
  symbol: string;
  market_data: {
    current_price: {
      usd: number;
      krw: number;
    };
  };
};

export interface FetchCoinsParams {
  vs_currency: string;
  per_page: number;
  page: number;
  order?: string;
  sparkline?: boolean;
  locale?: string;
  price_change_percentage?: string;
  coinIds?: string[];
}
