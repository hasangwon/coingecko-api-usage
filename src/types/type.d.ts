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
