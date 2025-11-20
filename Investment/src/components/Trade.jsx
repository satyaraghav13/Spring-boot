// FuturesTradingPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Trade() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [leverage, setLeverage] = useState(20);

  // Fetch real-time futures price
  const fetchPrice = async () => {
    try {
      const res = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`);
      setPrice(parseFloat(res.data.price));
    } catch (err) {
      console.error("Price Error", err);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 2000);
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="container py-4 text-light" style={{ background: "#0b0e11", minHeight: "100vh",  maxWidth: 1500 }}>
      <h4 className="mb-4">Spot Trade</h4>

      {/* SYMBOL + PERCENT */}
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-dark rounded">
        <span className="text-success fw-bold">+2.06%</span>
      </div>

      {/* BUY / SELL BOX */}
      <div className="bg-dark p-3 rounded">
        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-success w-50">Buy</button>
          <button className="btn btn-danger w-50">Sell</button>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-secondary w-50">Cross</button>
          <input
            type="number"
            className="form-control text-center"
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
          />
          <button className="btn btn-secondary">Margin</button>
        </div>

        {/* ORDER TYPE */}
        <div className="mb-2 text-muted">Order Type</div>
        <select className="form-select mb-3">
          <option>Limit</option>
          <option>Market</option>
        </select>

        {/* PRICE */}
        <label className="text-muted">Price (USDT)</label>
        <input
          type="number"
          className="form-control mb-3"
          value={price}
          readOnly
        />

        {/* AMOUNT */}
        <label className="text-muted">Amount (BTC)</label>
        <input
          type="number"
          className="form-control mb-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* BUY LONG BUTTON */}
        <button className="btn btn-success w-100 py-2 fw-bold">Buy / Long</button>
      </div>

      {/* POSITIONS */}
      <div className="mt-4 p-3 bg-dark rounded text-center text-muted">
        <p>You have no positions.</p>
      </div>
    </div>
  );
}

// FULL PAGE VERSION WITH CHART + ORDERBOOK + LIVE PRICE
// Coming next: I will expand this file with full Bootstrap layout including:
// - Live WebSocket futures price
// - Orderbook (bids/asks)
// - TradingView candle chart integration
// - Positions table
// - Open orders table
// - Footer navigation like Binance
// Reply "add full code now" to generate the expanded full-page version.
