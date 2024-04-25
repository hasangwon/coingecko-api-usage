import axios from "axios";
import { FetchCoinsParams } from "../\btypes/type";

const baseURL = "https://api.coingecko.com/api/v3/coins";

export const fetchCoins = async (params: FetchCoinsParams) => {
  const { vs_currency, per_page, page, order = "market_cap_desc", sparkline = false, locale = "en", price_change_percentage = "1h,24h,7d", coinIds = [] } = params;
  const ids = coinIds.join(",");

  try {
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
