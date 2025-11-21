
import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//TradingView Chart 
function TradingViewChart({ symbol }) {
  const containerRef = useRef(null);
  const containerId = useMemo(() => "tv_futures_chart_container", []);

  const tvSymbol = useMemo(() => {
    // For TradingView we use spot symbol like BINANCE:BTCUSDT
    return `BINANCE:${symbol}`;
  }, [symbol]);

  useEffect(() => {
    function createWidget() {
      if (!window.TradingView || !containerRef.current) return;

      containerRef.current.innerHTML = "";

      new window.TradingView.widget({
        symbol: tvSymbol,
        interval: "15",
        autosize: true,
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_legend: false,
        backgroundColor: "rgba(11,14,17,1)",
        container_id: containerRef.current.id,
      });
    }

    if (!window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = createWidget;
      document.body.appendChild(script);
    } else {
      createWidget();
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [tvSymbol]);

  return (
    <div
      id={containerId}
      ref={containerRef}
      style={{ width: "100%", height: "420px" }}
    />
  );
}

//  SYMBOL LIST (Futures pairs)
const FUTURES_SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "ADAUSDT",
  "LTCUSDT",
];

//MAIN FUTURES TRADE PAGE
export default function Trade() {
  const [symbol, setSymbol] = useState("SOLUSDT");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState(20);
  const [side, setSide] = useState("BUY"); // BUY or SELL
  const [orderType, setOrderType] = useState("LIMIT");
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [loadingBook, setLoadingBook] = useState(true);

  // Fetch real-time futures price (polling) 
  const fetchPrice = async () => {
    try {
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
      );
      setPrice(parseFloat(res.data.price));
    } catch (err) {
      console.error("Price Error", err);
    }
  };

  //Fetch orderbook (depth)
  const fetchOrderBook = async () => {
    try {
      setLoadingBook(true);
      const res = await axios.get(
        `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=15`
      );
      setOrderBook({
        bids: res.data.bids || [],
        asks: res.data.asks || [],
      });
    } catch (err) {
      console.error("OrderBook Error", err);
    } finally {
      setLoadingBook(false);
    }
  };

  useEffect(() => {
    // initial fetch for selected symbol
    fetchPrice();
    fetchOrderBook();

    const priceInterval = setInterval(fetchPrice, 2000);
    const bookInterval = setInterval(fetchOrderBook, 5000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(bookInterval);
    };
  }, [symbol]);

  const notional = price && amount ? price * parseFloat(amount || 0) : 0;

  return (
    <div
      className="container-fluid py-3 text-light"
      style={{ background: "#0b0e11", minHeight: "100vh" }}
    >
      <h4 className="mb-3">USDT-M Futures</h4>

      <div className="row">
        {/*LEFT: ORDER FORM */}
        <div className="col-md-3 mb-3">
          <div className="bg-dark rounded p-3">
            {/* Symbol selector + PNL */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <select
                className="form-select form-select-sm w-50"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              >
                {FUTURES_SYMBOLS.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("USDT", "")}/USDT
                  </option>
                ))}
              </select>
              <div className="text-end">
                <div className="small text-muted">Last Price</div>
                <div className="fw-semibold">
                  {price ? price.toFixed(4) : "--"} USDT
                </div>
              </div>
            </div>

            {/* Buy / Sell toggle */}
            <div className="d-flex gap-2 mb-3">
              <button
                className={`btn w-50 ${
                  side === "BUY" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setSide("BUY")}
              >
                Buy / Long
              </button>
              <button
                className={`btn w-50 ${
                  side === "SELL" ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => setSide("SELL")}
              >
                Sell / Short
              </button>
            </div>

            {/* Cross / Leverage */}
            <div className="d-flex gap-2 mb-3">
              <button className="btn btn-secondary w-50">Cross</button>
              <input
                type="number"
                className="form-control text-center"
                value={leverage}
                min={1}
                max={125}
                onChange={(e) => setLeverage(Number(e.target.value))}
              />
              <span className="d-flex align-items-center small">x</span>
            </div>

            {/* Order type */}
            <div className="mb-2 text-muted small">Order Type</div>
            <select
              className="form-select form-select-sm mb-3"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option value="LIMIT">Limit</option>
              <option value="MARKET">Market</option>
              <option value="STOP">Stop</option>
              <option value="STOP_MARKET">Stop Market</option>
            </select>

            {/* Price input */}
            <label className="text-muted small">Price (USDT)</label>
            <input
              type="number"
              className="form-control form-control-sm mb-3"
              value={orderType === "MARKET" ? price.toFixed(4) : price}
              readOnly={orderType === "MARKET"}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            {/* Amount input */}
            <label className="text-muted small">
              Amount ({symbol.replace("USDT", "")})
            </label>
            <input
              type="number"
              className="form-control form-control-sm mb-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={0}
            />

            {/* Notional */}
            <div className="d-flex justify-content-between small mb-3">
              <span>Cost</span>
              <span>{notional ? notional.toFixed(2) : "0.00"} USDT</span>
            </div>

            {/* Submit button */}
            <button
              className={`btn w-100 fw-bold ${
                side === "BUY" ? "btn-success" : "btn-danger"
              }`}
            >
              {side === "BUY" ? "Buy / Long" : "Sell / Short"}
            </button>
          </div>
        </div>

        {/* ---------- MIDDLE: CHART ---------- */}
        <div className="col-md-6 mb-3">
          <div className="bg-dark rounded p-2 mb-2">
            <div className="d-flex justify-content-between align-items-center px-2 py-1">
              <div>
                <span className="fw-semibold">
                  {symbol.replace("USDT", "")}/USDT Perpetual
                </span>
                <span className="small text-muted ms-2">Futures</span>
              </div>
              <div className="text-end">
                <div className="small text-muted">Last Price</div>
                <div className="fw-semibold text-success">
                  {price ? price.toFixed(4) : "--"} USDT
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark rounded p-2">
            <TradingViewChart symbol={symbol} />
          </div>

          {/* Positions placeholder */}
          <div className="bg-dark rounded p-3 mt-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Positions</span>
              <span className="small text-muted">Isolated / Cross</span>
            </div>
            <div className="text-muted small text-center py-3">
              You have no open positions.
            </div>
          </div>
        </div>





{/* ----- ORDER BOOK ----- */}
<div className="col-md-3 mb-3">
  <div className="bg-dark rounded p-3">
    <div className="d-flex justify-content-between mb-2">
      <span className="fw-semibold">Order Book</span>
      <span className="small text-muted">{symbol}</span>
    </div>

    {loadingBook && (
      <div className="text-muted small mb-2">Loading orderbook…</div>
    )}

    {/* ASKS */}
    <div className="small mb-1 text-danger">Asks</div>
    <div style={{ maxHeight: 160, overflowY: "auto", marginBottom: 8 }}>
      {orderBook.asks.length > 0 ? (
        orderBook.asks.map(([p, q], i) => (
          <div key={`ask-${i}`} className="d-flex justify-content-between small">
            <span>{parseFloat(p).toFixed(4)}</span>
            <span>{parseFloat(q).toFixed(3)}</span>
          </div>
        ))
      ) : (
        <div className="text-muted small">No Asks</div>
      )}
    </div>

    {/* BIDS */}
    <div className="small mb-1 text-success">Bids</div>
    <div style={{ maxHeight: 160, overflowY: "auto" }}>
      {orderBook.bids.length > 0 ? (
        orderBook.bids.map(([p, q], i) => (
          <div key={`bid-${i}`} className="d-flex justify-content-between small">
            <span>{parseFloat(p).toFixed(4)}</span>
            <span>{parseFloat(q).toFixed(3)}</span>
          </div>
        ))
      ) : (
        <div className="text-muted small">No Bids</div>
      )}
    </div>
  </div>



          {/* Orders / History placeholder */}
          <div className="bg-dark rounded p-3 mt-3">
            <div className="fw-semibold mb-2">Order History</div>
            <div className="text-muted small text-center">
              No recent orders.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}