import { useState } from "react";
import PriceCalculator from "../components/PriceCalculator";
import Error from "../components/common/Error";
import { useParams } from "react-router-dom";
import { useFetchCoin } from "../hooks/useFetchCoins";
import { useScrapCoinList } from "../hooks/useScrapCoins";
import Loading from "../components/common/Loading";

const Detail = () => {
  const { id } = useParams();
  const { coin, loading, error, currency, selectCurrency } = useFetchCoin({ id: id });
  const { scrapCoinIds, onScrapClick } = useScrapCoinList({ coins: [], viewMode: "전체보기" });
  const [isShownDescription, setIsShownDescription] = useState(false);

  console.log(coin);
  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    coin && (
      <div className="flex flex-col w-full h-full p-8 min-w-[375px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <button className="w-[24px] mr-4" onClick={() => onScrapClick(coin.id)}>
              {scrapCoinIds && scrapCoinIds.includes(coin.id) ? <img src="/fill_star.svg" className="w-[24px] m-1" alt="fill star" /> : <img src="/empty_star.svg" className="w-[24px] m-1" alt="empty star" />}
            </button>
            <img src={coin.image.small} className="w-[36px] mr-4" alt={`${coin.name} logo`} />
            <h3 className="text-xl font-bold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h3>
          </div>
          <select className="p-2 rounded bg-transparent focus:outline-none focus:ring-2 text-sm text-gray-800" value={currency} onChange={selectCurrency}>
            <option value="krw">KRW 보기</option>
            <option value="usd">USD 보기</option>
          </select>
        </div>
        <div className="flex mobileFlex w-full justify-between">
          <div className="flex-1 flex flex-col items-center pt-4 pr-4">
            <table className="w-full table-auto border-collapse border border-gray-800 text-left">
              <tbody>
                <tr>
                  <th className="bg-gray-100 border border-gray-300 p-4">시가 총액 Rank</th>
                  <td className="border border-gray-300 p-4">{coin.market_cap_rank}</td>
                </tr>
                <tr>
                  <th className="bg-gray-100 border border-gray-300 p-4">웹사이트</th>
                  <td className="border border-gray-300 p-4">
                    <a href={coin.links.homepage[0]} rel="noopener noreferrer">
                      {coin.links.homepage[0]}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex-1 flex flex-col justify-between mt-4">
            <div className="flex justify-end">
              <div className="flex flex-col items-end mr-4">
                <h3 className="text-2xl font-bold">{currency === "usd" ? `$${coin.market_data.current_price.usd.toLocaleString()}` : `₩${coin.market_data.current_price.krw.toLocaleString()}`}</h3>
                <span className="text-xs text-gray-600">{coin.market_data.current_price.btc?.toFixed(8)} BTC</span>
              </div>
              <div className="flex flex-col justify-end mr-4">
                <p className={`font-semibold text-sm leading-5 ${coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? "text-red-500" : "text-blue-500"}`}>
                  {currency === "usd" ? `${coin.market_data.price_change_percentage_24h_in_currency.usd}%` : `${coin.market_data.price_change_percentage_24h_in_currency.krw}%`}
                </p>
                <p className={`text-xs ${coin.market_data.price_change_percentage_24h_in_currency.usd < 0 ? "text-blue-500" : "text-red-500"}`}>{coin.market_data.price_change_percentage_24h_in_currency.btc}%</p>
              </div>
            </div>
            <div className="flex justify-end mt-4 text-xs w-full">
              <div className="flex-1 flex-col text-right">
                <span>시가총액</span>
                <p>{currency === "usd" ? `$${coin.market_data.market_cap.usd.toLocaleString()}` : `₩${coin.market_data.market_cap.krw.toLocaleString()}`}</p>
              </div>
              <div className="flex-1 flex-col text-right">
                <span>24시간 거래대금</span>
                <p>{currency === "usd" ? `$${coin.market_data.total_volume.usd.toLocaleString()}` : `₩${coin.market_data.total_volume.krw.toLocaleString()}`}</p>
              </div>
            </div>
          </div>
        </div>
        <PriceCalculator symbol={coin.symbol.toUpperCase()} coin={coin} currency={currency} />
        {(coin.description.ko || coin.description.en) && (
          <>
            <button className="w-full py-4 text-sm mt-8" onClick={() => setIsShownDescription(!isShownDescription)}>
              설명보기 ▼
            </button>
            <hr />
          </>
        )}
        {isShownDescription && <p className="mt-4">{coin.description.ko ? coin.description.ko : coin.description.en}</p>}
      </div>
    )
  );
};

export default Detail;
