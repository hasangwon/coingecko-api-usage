export const printCurrencySymbol = (currency: string) => {
  const value = currency ? currency.toLowerCase() : "";
  if (value === "krw") {
    return "₩";
  } else if (value === "usd") {
    return "$";
  } else {
    return "";
  }
};
