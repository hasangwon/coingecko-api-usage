import { useState, useEffect } from "react";
import { fetchCoinData, fetchCoins } from "../api/coinApi";
import { getAllBookmarks, toggleBookmark } from "../utils/localStorage";
import { Coin } from "../\btypes/type";
import { useParams } from "react-router-dom";

export const useHome = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<"전체보기" | "북마크 보기">("전체보기");
  const [vsCurrency, setVsCurrency] = useState<"krw" | "usd">("krw");
  const [perPage, setPerPage] = useState<10 | 30 | 50>(50);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLastVisible, setIsLastVisible] = useState(false);
  const [scrapCoinIds, setScrapCoinIds] = useState<string[]>(getAllBookmarks());

  const selectViewMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (newValue === "전체보기") {
      setViewMode(newValue);
    } else {
      setViewMode("북마크 보기");
    }
  };
  const selectVsCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (newValue === "usd") {
      setVsCurrency(newValue);
    } else {
      setVsCurrency("krw");
    }
  };
  const selectPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue === 10) {
      setPerPage(newValue);
    } else if (newValue === 30) {
      setPerPage(30);
    } else {
      setPerPage(50);
    }
  };

  const loadInitialCoins = async () => {
    try {
      setLoading(true);

      const params = {
        vs_currency: vsCurrency,
        per_page: perPage,
        page: 1,
        ...(viewMode === "북마크 보기" && { coinIds: scrapCoinIds }),
      };

      const data = await fetchCoins(params);
      setCoins(data);

      setIsLastVisible(data.length < perPage);

      setPageIndex(1);
      setError(null);
    } catch (error) {
      setError("Failed to load the coin data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCoins = async () => {
    try {
      setLoading(true);
      const data = await fetchCoins({
        vs_currency: vsCurrency,
        per_page: perPage,
        page: pageIndex,
      });
      if (data && data.length === 0) {
        setIsLastVisible(true);
      } else {
        setCoins((prevCoins) => [...prevCoins, ...data]);
      }
    } catch (error) {
      setError("Failed to load more coin data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleMoreClick = () => {
    setPageIndex((prevIndex) => prevIndex + 1);
  };

  const onScrapClick = async (coinId: string) => {
    toggleBookmark(coinId);
    if (viewMode === "북마크 보기") {
      setCoins((prevIds) => prevIds.filter((el) => el.id !== coinId));
    }
    if (scrapCoinIds.includes(coinId)) {
      setScrapCoinIds((prevIds) => prevIds.filter((id) => id !== coinId));
    } else {
      setScrapCoinIds((prevIds) => [...prevIds, coinId]);
    }
  };

  useEffect(() => {
    loadInitialCoins();
  }, [viewMode, vsCurrency, perPage]);

  useEffect(() => {
    if (pageIndex > 1) {
      loadMoreCoins();
    }
  }, [pageIndex]);

  return { coins, loading, error, viewMode, vsCurrency, perPage, pageIndex, isLastVisible, scrapCoinIds, selectViewMode, selectVsCurrency, selectPerPage, handleMoreClick, onScrapClick };
};

export const useScrap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [scrapCoinIds, setScrapCoinIds] = useState<string[]>([]);

  const onScrapClick = async (coinId: string) => {
    try {
      setLoading(true);
      setError("");
      toggleBookmark(coinId);
      setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== coinId));

      if (scrapCoinIds.includes(coinId)) {
        setScrapCoinIds((prevIds) => prevIds.filter((id) => id !== coinId));
      } else {
        setScrapCoinIds((prevIds) => [...prevIds, coinId]);
      }
      setError(""); // 성공 시 에러 메시지 초기화
    } catch (e) {
      setError("Failed to update bookmarks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadScrapCoins = async () => {
      setLoading(true);
      setError("");
      try {
        const coinIds = getAllBookmarks();
        setScrapCoinIds(coinIds);
        if (coinIds.length > 0) {
          const params = {
            vs_currency: "krw",
            per_page: 50,
            page: 1,
            coinIds: coinIds,
          };

          const data = await fetchCoins(params);
          setCoins(data);
          setError("");
        } else {
          setCoins([]);
        }
      } catch (e) {
        setError("Failed to load scrap coins.");
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    loadScrapCoins();
  }, []);

  return { loading, error, coins, scrapCoinIds, onScrapClick };
};

export const useDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("krw");
  const [coinIds, setCoinIds] = useState<string[]>(getAllBookmarks());

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

  const selectCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (newValue === "usd") {
      setCurrency(newValue);
    } else {
      setCurrency("krw");
    }
  };

  const onScrapClick = async (coinId: string) => {
    toggleBookmark(coinId);
    setCoinIds((prevIds) => {
      if (prevIds.includes(coinId)) {
        return prevIds.filter((id) => id !== coinId);
      } else {
        return [...prevIds, coinId];
      }
    });
  };
  return { coin, loading, error, currency, coinIds, selectCurrency, onScrapClick };
};
