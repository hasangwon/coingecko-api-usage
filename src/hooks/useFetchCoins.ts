import { useState, useEffect } from "react";
import { fetchCoinData, fetchCoins } from "../api/coinApi";
import { Coin } from "../types/type";
import { getAllBookmarks } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { setCoins, setInitializeFilter } from "../app/globalSlice";

export const useFetchCoinList = ({ coins, vsCurrency, perPage, viewMode }: { coins: Coin[]; vsCurrency: string; perPage: number; viewMode: string }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pageIndex, setPageIndex] = useState(1);
  const [isLastVisible, setIsLastVisible] = useState(true);

  const fetchAndUpdateCoins = async (isCombine: boolean) => {
    setIsLastVisible(true);
    const scrapIds = getAllBookmarks();
    setLoading(true);
    const params = {
      vs_currency: vsCurrency,
      per_page: perPage,
      page: pageIndex,
      ...(viewMode === "북마크 보기" && { coinIds: scrapIds }),
    };

    if (viewMode === "북마크 보기" && scrapIds.length === 0) {
      return setLoading(false);
    }

    try {
      const data = await fetchCoins(params);
      if (data.length === perPage) {
        setIsLastVisible(false);
      }
      if (isCombine) {
        dispatch(setCoins([...coins, ...data]));
      } else {
        setPageIndex(1);
        dispatch(setCoins(data));
      }
    } catch (error) {
      setError("Failed to load more coin data. Please try again later.");
      setLoading(false);
    } finally {
      setError(null);
      setLoading(false);
    }
  };

  const handleMoreClick = () => {
    setPageIndex((prevIndex) => prevIndex + 1);
    fetchAndUpdateCoins(true);
  };

  useEffect(() => {
    fetchAndUpdateCoins(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, vsCurrency, perPage]);

  useEffect(() => {
    dispatch(setCoins([]));
    dispatch(setInitializeFilter(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { coins, loading, error, handleMoreClick, isLastVisible };
};

export const useFetchCoin = ({ id }: { id: string | undefined }) => {
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("krw");

  const selectCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (newValue === "usd") {
      setCurrency(newValue);
    } else {
      setCurrency("krw");
    }
  };

  useEffect(() => {
    if (!id) return;
    const loadCoinData = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinData(id);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError("error");
        setLoading(false);
      }
    };

    loadCoinData();
  }, [id]);

  return { coin, loading, error, currency, selectCurrency };
};
