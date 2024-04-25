import { useEffect, useState } from "react";
import { Coin } from "../\btypes/type";

const PriceCalculator = ({ symbol, coin, currency }: { symbol: string; coin: Coin; currency: string }) => {
  const exchangeRate = currency === "krw" ? coin.market_data.current_price.krw : coin.market_data.current_price.usd;
  const [coinAmount, setCoinAmount] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState("");

  const handleCoinAmountChange = (event: any) => {
    const { value } = event.target;
    if (/^\d*\.?\d{0,8}$/.test(value)) {
      setCoinAmount(value);
      const newCurrencyAmount = (parseFloat(value) * exchangeRate).toFixed(2);
      setCurrencyAmount(newCurrencyAmount);
    }
  };

  const handleCurrencyAmountChange = (event: any) => {
    const { value } = event.target;
    if (value === "" || (/^\d+$/.test(value) && value[0] !== "0")) {
      setCurrencyAmount(value);
      const newCoinAmount = (parseFloat(value) / exchangeRate).toFixed(8);
      setCoinAmount(newCoinAmount);
    }
  };

  useEffect(() => {
    setCoinAmount("1");
    setCurrencyAmount((1 * exchangeRate).toFixed(2));
  }, [currency]);

  return (
    <div className="relative w-full bg-gray-300 justify-center py-10 mt-8 flex items-center mobileFlex">
      <h3 className="absolute top-4 left-4 text-sm font-bold">가격 계산</h3>
      <div className="flex justify-center text-sm w-1/3">
        <div className="flex-1 bg-gray-100 p-4 mr-[1px] font-bold text-lg">{symbol}</div>
        <input className="flex-2 p-4 text-right focus:outline-none" type="text" value={coinAmount} onChange={handleCoinAmountChange} placeholder="입력해주세요." />
      </div>
      <b className="text-3xl mx-4 mb-2">⥦</b>
      <div className="flex justify-center text-sm w-1/3">
        <div className="flex-1 bg-gray-100 p-4 mr-[1px] font-bold text-lg">{currency.toUpperCase()}</div>
        <input className="flex-2 p-4 text-right focus:outline-none" type="text" value={currencyAmount} onChange={handleCurrencyAmountChange} placeholder="입력해주세요." />
      </div>
    </div>
  );
};

export default PriceCalculator;
