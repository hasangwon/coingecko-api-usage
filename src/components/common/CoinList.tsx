import { isArray } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { Coin } from "../../types/type";
import { printCurrencySymbol } from "../../utils/printCurrencySymbol";

interface CoinListProps {
  coins: Coin[];
  scrapCoinIds: string[];
  onScrapClick: (element: string) => void;
  currency: string;
  isLastVisible?: boolean;
  handleMoreClick?: () => void;
}

const CoinList = ({ coins, scrapCoinIds, onScrapClick, currency, isLastVisible = false, handleMoreClick = () => {} }: CoinListProps) => {
  const path = window.location.pathname;
  return (
    <>
      <div className="flex items-center w-full font-semibold pr-4 text-xs text-gray-500 bg-gray-100 py-3">
        <div className="w-[2.5rem]"></div>
        <div className="flex-2">자산</div>
        <div className="flex-0.5 mobileInvisible2x"></div>
        <div className="flex-1.5 text-end">Price</div>
        <div className="mobileInvisible flex-1.5 text-end">1H </div>
        <div className="flex-1 text-end">24H </div>
        <div className="mobileInvisible flex-1 text-end">7D </div>
        <div className="mobileInvisible flex-2 text-end">24H Volume</div>
      </div>
      <div className="w-full overflow-auto">
        <div className="w-full" />
        <div className="divide-y divide-gray-200">
          {isArray(coins) && coins.length !== 0 ? (
            coins.map((element, index) => (
              <div key={`${element.id}_${index}`} className={`font-bold text-sm flex items-center w-full hover:bg-gray-100 h-[3.75rem] overflow-hidden pr-4`}>
                <div className="w-[2.5rem] flex justify-center">
                  <button onClick={() => onScrapClick(element.id)} className="">
                    {scrapCoinIds && scrapCoinIds.includes(element.id) ? <img src="/fill_star.svg" className="w-[16px] m-1" alt="fill star" /> : <img src="/empty_star.svg" className="w-[16px] m-1" alt="empty star" />}
                  </button>
                </div>
                <button className="text-left flex-2">
                  <Link to={`/detail/${element.id}`}>{element.name}</Link>
                </button>
                <div className="mobileInvisible2x flex-0.5 text-xs text-gray-500">{element.symbol.toUpperCase()}</div>
                <div className="flex-1.5 text-end">
                  {printCurrencySymbol(currency)}
                  {element.current_price.toLocaleString()}
                </div>
                <div className={`mobileInvisible flex-1.5 text-end ${element.price_change_percentage_1h_in_currency > 0 ? "text-red-500" : "text-blue-500"}`}>{element.price_change_percentage_1h_in_currency ? element.price_change_percentage_1h_in_currency.toFixed(2) : ""}%</div>
                <div className={`flex-1 text-end ${element.price_change_percentage_24h_in_currency > 0 ? "text-red-500" : "text-blue-500"}`}>{element.price_change_percentage_24h_in_currency ? element.price_change_percentage_24h_in_currency.toFixed(2) : ""}%</div>
                <div className={`mobileInvisible flex-1 text-end ${element.price_change_percentage_7d_in_currency > 0 ? "text-red-500" : "text-blue-500"}`}>{element.price_change_percentage_7d_in_currency ? element.price_change_percentage_7d_in_currency.toFixed(2) : ""}%</div>

                <div className="mobileInvisible flex-2 text-end">
                  {printCurrencySymbol(currency)}
                  {element.total_volume.toLocaleString()}
                </div>
              </div>
            ))
          ) : coins === null ? (
            <div className="mt-8 text-gray-700">
              <p className="w-full flex justify-center font-semibold">불러오기에 실패했습니다.</p>
            </div>
          ) : (
            <div className="mt-8 text-gray-700">
              <p className="w-full flex justify-center font-semibold">{path === "/scrap" ? "아직 스크랩된 가상자산이 없습니다" : "불러오기에 실패했습니다."}</p>
            </div>
          )}
          {!isLastVisible && (
            <button className="font-bold text-sm w-full p-4 hover:bg-gray-100" onClick={handleMoreClick}>
              + 더보기
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CoinList;
