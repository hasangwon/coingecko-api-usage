import CoinList from "../components/common/CoinList";
import GNB from "../components/common/GNB";
import Error from "../components/common/Error";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useScrapCoinList } from "../hooks/useScrapCoins";
import { useFetchCoinList } from "../hooks/useFetchCoins";
import Loading from "../components/common/Loading";

const Scrap = () => {
  const { coins, vsCurrency } = useSelector((state: RootState) => state.global);
  const { scrapCoinIds, onScrapClick } = useScrapCoinList({ coins, viewMode: "북마크 보기" });
  const { loading, error } = useFetchCoinList({ coins, viewMode: "북마크 보기", vsCurrency, perPage: 50 });

  return (
    <div className="w-full h-full p-8">
      <GNB />
      <div className="h-[calc(100%-85px)]">
        <div className="h-full flex flex-col items-end min-w-[325px]">
          <div className="h-[67px]" />
          {loading ? <Loading /> : error ? <Error /> : <CoinList coins={coins} scrapCoinIds={scrapCoinIds} currency="krw" onScrapClick={onScrapClick} isLastVisible={true} />}
        </div>
      </div>
    </div>
  );
};

export default Scrap;
