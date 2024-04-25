import CoinList from "../components/CoinList";
import GNB from "../components/GNB";
import { useScrap } from "../app/hooks";
import Error from "../components/common/Error";

const Scrap = () => {
  const { loading, error, coins, scrapCoinIds, onScrapClick } = useScrap();

  return (
    <div className="w-full h-full p-8">
      <GNB />
      <div className="h-[67px]" />
      {loading ? <div className="loader">Loading...</div> : error ? <Error /> : <CoinList coins={coins} scrapCoinIds={scrapCoinIds} currency="krw" onScrapClick={onScrapClick} isLastVisible={true} />}
    </div>
  );
};

export default Scrap;
