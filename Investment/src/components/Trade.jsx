
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function TradingViewChart({ symbol }) {
  const containerRef = useRef(null);
  const containerId = "tv_spot_chart";

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear old chart safely
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    function createWidget() {
      if (!window.TradingView) return;

      new window.TradingView.widget({
        container_id: containerId,
        symbol: `BINANCE:${symbol}`,
        interval: "30",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        autosize: true,
        backgroundColor: "rgba(11,14,17,1)",
      });
    }

    // Load TV script only once
    if (!window.tvScriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        window.tvScriptLoaded = true;
        createWidget();
      };
      document.body.appendChild(script);
    } else {
      createWidget();
    }
  }, [symbol]);

  return (
    <div
      id={containerId}
      ref={containerRef}
      style={{ width: "100%", height: "420px" }}
    />
  );
}


const SPOT_SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "ADAUSDT",
  "LTCUSDT",
   

     

  "AVAXUSDT",
  "DOTUSDT",

  "MATICUSDT",
];

export default function SpotTrade() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("BUY");
  const [orderType, setOrderType] = useState("LIMIT");
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  /* REAL-TIME SPOT PRICE */
  const fetchPrice = async () => {
    try {
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
      );
      setPrice(parseFloat(res.data.price));
    } catch (err) {
      console.error("Spot Price Error", err);
    }
  };

  /* ORDERBOOK DEPTH */
  const fetchOrderBook = async () => {
    try {
      const res = await axios.get(
        `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=15`
      );
      setOrderBook({
        bids: res.data.bids,
        asks: res.data.asks,
      });
    } catch (err) {
      console.error("OrderBook Error", err);
    }
  };

  useEffect(() => {
    fetchPrice();
    fetchOrderBook();

    const priceTimer = setInterval(fetchPrice, 2000);
    const bookTimer = setInterval(fetchOrderBook, 4000);

    return () => {
      clearInterval(priceTimer);
      clearInterval(bookTimer);
    };
  }, [symbol]);

  const totalCost = price * (amount ? parseFloat(amount) : 0);

  return (
    <div
      className="container-fluid py-4 text-light"
      style={{ background: "#0b0e11", minHeight: "100vh" }}
    >
      <h4 className="mb-4">Spot Trade</h4>

      <div className="row">

        <div className="col-md-3">
          <div className="bg-dark rounded p-3">
            {/* Symbol Dropdown */}
            <div className="d-flex justify-content-between mb-3">
              <select
                className="form-select form-select-sm w-50"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              >
                {SPOT_SYMBOLS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <div className="text-end">
                <span className="small text-muted">Last Price</span>
                <div className="fw-bold text-success">
                  {price.toFixed(4)} USDT
                </div>
              </div>
            </div>

            {/* Buy / Sell */}
            <div className="d-flex gap-2 mb-3">
              <button
                className={`btn w-50 ${
                  side === "BUY" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setSide("BUY")}
              >
                Buy
              </button>
              <button
                className={`btn w-50 ${
                  side === "SELL" ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => setSide("SELL")}
              >
                Sell
              </button>
            </div>

            {/* Order Type */}
            <div className="small text-muted mb-1">Order Type</div>
            <select
              className="form-select form-select-sm mb-2"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option value="LIMIT">Limit</option>
              <option value="MARKET">Market</option>
            </select>

            {/* Price */}
            <label className="small text-muted">Price (USDT)</label>
            <input
              type="number"
              className="form-control form-control-sm mb-2"
              value={orderType === "MARKET" ? price : price}
              readOnly={orderType === "MARKET"}
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* Amount */}
            <label className="small text-muted">
              Amount ({symbol.replace("USDT", "")})
            </label>
            <input
              type="number"
              className="form-control form-control-sm mb-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Total */}
            <div className="d-flex justify-content-between small mb-3">
              <span>Total</span>
              <span>{totalCost.toFixed(4)} USDT</span>
            </div>

            {/* Submit */}
            <button
              className={`btn w-100 fw-bold ${
                side === "BUY" ? "btn-success" : "btn-danger"
              }`}
            >
              {side === "BUY" ? "Buy" : "Sell"}
            </button>
          </div>
        </div>

       
        <div className="col-md-6">
          <div className="bg-dark rounded p-2 mb-3">
            <TradingViewChart symbol={symbol} />
          </div>

          {/* Order History */}
          <div className="bg-dark rounded p-3 text-center text-muted small">
            No recent trades.
          </div>
        </div>

        {/*
             RIGHT: ORDERBOOK
        */}
        <div className="col-md-3">
          <div className="bg-dark rounded p-3 mb-3">
            <h6>Order Book</h6>

            {/* Asks */}
            <div className="text-danger small mb-1">Asks</div>
            <div style={{ maxHeight: 160, overflowY: "auto" }}>
              {orderBook.asks.map(([p, q], i) => (
                <div key={i} className="d-flex justify-content-between small">
                  <span>{parseFloat(p).toFixed(4)}</span>
                  <span>{parseFloat(q).toFixed(4)}</span>
                </div>
              ))}
            </div>

            {/* Bids */}
            <div className="text-success small mt-3 mb-1">Bids</div>
            <div style={{ maxHeight: 160, overflowY: "auto" }}>
              {orderBook.bids.map(([p, q], i) => (
                <div key={i} className="d-flex justify-content-between small">
                  <span>{parseFloat(p).toFixed(4)}</span>
                  <span>{parseFloat(q).toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark rounded p-3">
            <h6>Recent Trades</h6>
            <div className="small text-muted text-center">No trades yet.</div>
          </div>
        </div>

      </div>
    </div>
  );
}

