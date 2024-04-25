import GNB from "../components/common/GNB";
import Error from "../components/common/Error";
import CoinList from "../components/common/CoinList";
import { useFetchCoinList } from "../hooks/useFetchCoins";
import { useScrapCoinList } from "../hooks/useScrapCoins";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setPerPage, setViewMode, setVsCurrency } from "../app/globalSlice";
import Loading from "../components/common/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { coins, viewMode, vsCurrency, perPage } = useSelector((state: RootState) => state.global);
  const { loading, error, handleMoreClick, isLastVisible } = useFetchCoinList({ coins, vsCurrency, perPage, viewMode });
  const { scrapCoinIds, onScrapClick } = useScrapCoinList({ coins, viewMode });

  return (
    <div className="w-full h-full p-8">
      <GNB />
      <div className="h-[calc(100%-85px)]">
        <div className="h-full flex flex-col items-end min-w-[325px]">
          <div className="flex space-x-6 p-4 text-sm text-gray-800">
            <select className="p-2 rounded bg-transparent focus:outline-none focus:ring-2" value={viewMode} onChange={(e) => dispatch(setViewMode(e.target.value as "전체보기" | "북마크 보기"))}>
              <option value="전체보기">전체보기</option>
              <option value="북마크 보기">북마크 보기</option>
            </select>

            <select className="p-2 rounded bg-transparent focus:outline-none focus:ring-2" value={vsCurrency} onChange={(e) => dispatch(setVsCurrency(e.target.value as "krw" | "usd"))}>
              <option value="krw">KRW 보기</option>
              <option value="usd">USD 보기</option>
            </select>

            <select className="p-2 rounded bg-transparent focus:outline-none focus:ring-2" value={perPage} onChange={(e) => dispatch(setPerPage(e.target.value))}>
              <option value={10}>10개 보기</option>
              <option value={30}>30개 보기</option>
              <option value={50}>50개 보기</option>
            </select>
          </div>
          {loading ? <Loading /> : error ? <Error /> : <CoinList coins={coins} scrapCoinIds={scrapCoinIds} onScrapClick={onScrapClick} currency={vsCurrency} isLastVisible={isLastVisible} handleMoreClick={handleMoreClick} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
