// src/context/PortfolioContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PortfolioContext = createContext();

// Custom hook
export const usePortfolio = () => useContext(PortfolioContext);

export function PortfolioProvider({ children }) {
  // ----- Holdings (Your Assets) -----
  const [holdings, setHoldings] = useState({
    USDT: 10,
    BTC: 0.00005,
    BNB: 0.01,
    SOL: 0.05,
  });

  // ----- Prices -----
  const [prices, setPrices] = useState({});
  const [totalINR, setTotalINR] = useState(0);

  // ----- Fetch Crypto Prices -----
  async function fetchPrices() {
    try {
      const cryptoSymbols = ["BTCUSDT", "BNBUSDT", "SOLUSDT"];

      let fetched = {};

      for (let symbol of cryptoSymbols) {
        let res = await axios.get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        fetched[symbol] = parseFloat(res.data.price);
      }

      // INR conversion (manual)
      fetched["USDTINR"] = 84.0;

      setPrices(fetched);
    } catch (err) {
      console.error("Price Fetch Error:", err);
    }
  }

  // ----- Calculate Total INR -----
  useEffect(() => {
    let sumINR = 0;

    if (!prices["USDTINR"]) return;

    // Each holding → USD → INR
    Object.keys(holdings).forEach((coin) => {
      const usdtValue =
        coin === "USDT"
          ? holdings[coin]
          : holdings[coin] * (prices[coin + "USDT"] || 0);

      sumINR += usdtValue * prices["USDTINR"];
    });

    setTotalINR(sumINR);
  }, [holdings, prices]);

  // Auto reload every 5 seconds
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        holdings,
        setHoldings,
        prices,
        totalINR,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
export default PortfolioContext;