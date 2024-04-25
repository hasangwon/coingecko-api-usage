import GNB from "../components/GNB";
import Error from "../components/common/Error";
import CoinList from "../components/CoinList";
import { useHome } from "../app/hooks";

const Home = () => {
  const { coins, loading, error, viewMode, vsCurrency, perPage, scrapCoinIds, isLastVisible, selectViewMode, selectVsCurrency, selectPerPage, onScrapClick, handleMoreClick } = useHome();

  return (
    <div className="w-full h-full p-8">
      <GNB />
      <div className="h-[calc(100%-85px)]">
        <div className="h-full flex flex-col items-end min-w-[325px]">
          <div className="flex space-x-6 p-4 text-sm text-gray-800">
            <select className="p-2 rounded bg-transparent focus:outline-none focus:ring-2" value={viewMode} onChange={selectViewMode}>
              <option value="전체보기">전체보기</option>
              <option value="북마크 보기">북마크 보기</option>
            </select>

            <select className="p-2 rounded bg-transparent focus:outline-none focus:ring-2" value={vsCurrency} onChange={selectVsCurrency}>
              <option value="krw">KRW 보기</option>
              <option value="usd">USD 보기</option>
            </select>

            <select className="p-2 rounded bg-transparent focus:outline-none focus:ring-2" value={perPage} onChange={selectPerPage}>
              <option value={10}>10개 보기</option>
              <option value={30}>30개 보기</option>
              <option value={50}>50개 보기</option>
            </select>
          </div>
          {loading ? <div className="loader">Loading...</div> : error ? <Error /> : <CoinList coins={coins} scrapCoinIds={scrapCoinIds} onScrapClick={onScrapClick} currency={vsCurrency} isLastVisible={isLastVisible} handleMoreClick={handleMoreClick} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
