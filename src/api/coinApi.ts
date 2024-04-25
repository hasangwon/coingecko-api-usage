import axios from "axios";

const baseURL = "https://api.coingecko.com/api/v3/coins";

interface FetchCoinsParams {
  vs_currency: string;
  per_page: number;
  page: number;
  order?: string;
  sparkline?: boolean;
  locale?: string;
  price_change_percentage?: string;
  coinIds?: string[];
}

export const fetchCoins = async (params: FetchCoinsParams) => {
  console.log(params, "sad");
  const { vs_currency, per_page, page, order = "market_cap_desc", sparkline = false, locale = "en", price_change_percentage = "1h,24h,7d", coinIds = [] } = params;

  const ids = coinIds.join(",");

  console.log(ids);

  try {
    console.log("asdasd");
    const response = await axios.get(`${baseURL}/markets`, {
      params: {
        vs_currency,
        order,
        per_page,
        page,
        sparkline,
        locale,
        price_change_percentage,
        ids,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    throw error;
  }
};

export const fetchCoinData = async (coinId: string) => {
  try {
    const response = await axios.get(`${baseURL}/${coinId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch individual coin data:", error);
    throw error;
  }
};
