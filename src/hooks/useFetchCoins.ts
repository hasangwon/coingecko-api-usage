import { useState, useEffect } from "react";
import { fetchCoinData, fetchCoins } from "../api/coinApi";
import { Coin } from "../types/type";
import { getAllBookmarks } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { setCoins, setInitializeFilter } from "../app/globalSlice";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export const useFetchCoinList = ({ coins, vsCurrency, perPage, viewMode }: { coins: Coin[]; vsCurrency: string; perPage: number; viewMode: string }) => {
  const dispatch = useDispatch();
  const scrapIds = getAllBookmarks();
  const [pageIndex, setPageIndex] = useState(1);
  const [isLastVisible, setIsLastVisible] = useState(true);

  const fetchCoinsData = async () => {
    if (viewMode === "북마크 보기" && scrapIds.length === 0) {
      return [];
    }

    const params = {
      vs_currency: vsCurrency,
      per_page: perPage,
      page: pageIndex,
      ...(viewMode === "북마크 보기" && { coinIds: scrapIds }),
    };

    const data = await fetchCoins(params);
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery<Coin[], Error>({
    queryKey: ["coins", vsCurrency, perPage, pageIndex, viewMode],
    queryFn: fetchCoinsData,
    staleTime: 300000,
    refetchInterval: 300000,
  });

  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        dispatch(setCoins([]));
      } else {
        dispatch(setCoins(data));
        setIsLastVisible(data.length < perPage);
      }
    }
  }, [data, dispatch, perPage]);

  useEffect(() => {
    if (error) {
      toast.error(`요청이 너무 많습니다. 잠시 후 다시 시도해주세요.`, { autoClose: 2000 });
    }
  }, [error]);

  useEffect(() => {
    dispatch(setInitializeFilter(null));
  }, [dispatch]);

  const handleMoreClick = () => {
    setPageIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      refetch();
      return newIndex;
    });
  };

  return {
    coins,
    loading: isLoading,
    error,
    handleMoreClick,
    isLastVisible,
  };
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
