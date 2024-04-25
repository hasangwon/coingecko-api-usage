import { useState } from "react";
import { getAllBookmarks, toggleBookmark } from "../utils/localStorage";
import { setCoins } from "../app/globalSlice";
import { useDispatch } from "react-redux";
import { Coin } from "../types/type";
import _ from "lodash";
import { toast } from "react-toastify";

export const useScrapCoinList = ({ coins, viewMode }: { coins: Coin[]; viewMode: string }) => {
  const dispatch = useDispatch();
  const [scrapCoinIds, setScrapCoinIds] = useState<string[]>(getAllBookmarks());

  const onScrapClick = async (coinId: string) => {
    toggleBookmark(coinId);

    if (viewMode === "북마크 보기") {
      const newCoins = _.cloneDeep(coins).filter((el: Coin) => el.id !== coinId);
      dispatch(setCoins(newCoins));
    }

    if (scrapCoinIds.includes(coinId)) {
      setScrapCoinIds((prevIds) => prevIds.filter((id) => id !== coinId));
      toast.success(`${coinId}가 북마크 삭제되었습니다.`, { autoClose: 2000 });
    } else {
      setScrapCoinIds((prevIds) => [...prevIds, coinId]);
      toast.success(`${coinId}가 북마크되었습니다.`, { autoClose: 2000 });
    }
  };

  return { scrapCoinIds, onScrapClick };
};
