import { useState, useEffect } from "react";
import { fetchCoinData, fetchCoins } from "../api/coinApi";
import { Coin } from "../types/type";
import { getAllBookmarks } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { pushCoins, setCoins, setInitializeFilter } from "../app/globalSlice";
import { toast } from "react-toastify";

export const useFetchCoinList = ({ coins, vsCurrency, perPage, viewMode }: { coins: Coin[]; vsCurrency: string; perPage: number; viewMode: string }) => {
  const dispatch = useDispatch();
  const CACHE_DURATION = 300000;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pageIndex, setPageIndex] = useState(1);
  const [isLastVisible, setIsLastVisible] = useState(true);

  const fetchAndUpdateCoins = async (isCombine: boolean) => {
    setIsLastVisible(true);
    setLoading(true);

    const scrapIds = getAllBookmarks();
    if (viewMode === "북마크 보기" && scrapIds.length === 0) {
      dispatch(setCoins([]));
      return setLoading(false);
    }

    const cacheKey = `coins-${vsCurrency}-${perPage}-${pageIndex}-${viewMode === "북마크 보기" ? scrapIds.join(",") : ""}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    console.log(cacheKey);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        if (isCombine) {
          dispatch(pushCoins(data));
        } else {
          setPageIndex(1);
          dispatch(setCoins(data));
        }
        setIsLastVisible(data.length < perPage);
        setLoading(false);
        return;
      }
    }
    const params = {
      vs_currency: vsCurrency,
      per_page: perPage,
      page: pageIndex,
      ...(viewMode === "북마크 보기" && { coinIds: scrapIds }),
    };

    try {
      const data = await fetchCoins(params);
      sessionStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
      if (data.length === perPage) {
        setIsLastVisible(false);
      }
      if (isCombine) {
        dispatch(pushCoins(data));
      } else {
        setPageIndex(1);
        dispatch(setCoins(data));
      }
    } catch (error) {
      dispatch(setCoins([]));
      toast.error(`요청이 너무 많습니다. 잠시 후 다시 시도해주세요.`, { autoClose: 2000 });
      setError("error");
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
    // dispatch(setCoins([]));
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
        toast.error(`요청이 너무 많습니다. 잠시 후 다시 시도해주세요.`, { autoClose: 2000 });
        setError("error");
        setLoading(false);
      }
    };

    loadCoinData();
  }, [id]);

  return { coin, loading, error, currency, selectCurrency };
};
