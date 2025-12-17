
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

export default function Assets() {
  // Your holdings (like Binance Assets page)
  const holdings = [
    // { id: "FDUSD", symbol: "FDUSDUSDT", display: "First Digital USD", amount: 0.63412873 },
    // { id: "BTC", symbol: "BTCUSDT", display: "Bitcoin", amount: 0.0000052 },
    // { id: "KNC", symbol: "KNCUSDT", display: "KyberNetwork", amount: 1.4109595 },
    // { id: "TRX", symbol: "TRXUSDT", display: "TRON", amount: 1 },
    // { id: "BNB", symbol: "BNBUSDT", display: "BNB", amount: 0.00027402 },
  ];

  const [prices, setPrices] = useState({});
  const [klines, setKlines] = useState({});
  const [loading, setLoading] = useState(true);

  // ---- helpers to fetch data from Binance ----
  async function fetchPrice(symbol) {
    try {
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
      );
      return parseFloat(res.data.price);
    } catch (err) {
      console.error("price fetch error", symbol, err.message);
      return null;
    }
  }

  async function fetchKlines(symbol) {
    try {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=50`
      );
      return res.data.map((d) => ({ t: d[0], close: parseFloat(d[4]) }));
    } catch (err) {
      console.error("klines fetch error", symbol, err.message);
      return [];
    }
  }

  useEffect(() => {
    let mounted = true;

    async function fetchAll() {
      setLoading(true);

      const pricePromises = holdings.map((h) => fetchPrice(h.symbol));
      const klinePromises = holdings.map((h) => fetchKlines(h.symbol));

      const priceResults = await Promise.all(pricePromises);
      const klineResults = await Promise.all(klinePromises);

      if (!mounted) return;

      const p = {};
      holdings.forEach((h, i) => {
        p[h.id] = priceResults[i];
      });

      const k = {};
      holdings.forEach((h, i) => {
        k[h.id] = klineResults[i];
      });

      setPrices(p);
      setKlines(k);
      setLoading(false);
    }

    fetchAll();
    const interval = setInterval(fetchAll, 30000); // refresh 30s

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const totalValueUSDT = holdings.reduce((sum, h) => {
    const price = prices[h.id] || 0;
    return sum + price * h.amount;
  }, 0);

  function buildSparklineData(kl) {
    const labels = kl.map((d) => new Date(d.t).toLocaleString());
    const data = kl.map((d) => d.close);
    return {
      labels,
      datasets: [
        {
          label: "Price",
          data,
          fill: false,
          tension: 0.2,
          pointRadius: 0,
        },
      ],
    };
  }

  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#0b0e11", minHeight: "100vh" }}
    >
      <div className="container" style={{ maxWidth: 1200 }}>
        {/* Top summary bar (like Binance Assets) */}
        <div className="mb-3 text-light d-flex justify-content-between align-items-start">
          <div>
            <div className="small text-muted">Est. Total Value</div>
            <h2 className="mb-0">{totalValueUSDT.toFixed(2)} USDT</h2>
            <div className="text-success small mt-1">
              Today&apos;s PNL +2.63 USDT (+0.92%)
            </div>
          </div>
          <div className="btn-group">
            <button className="btn btn-warning">Add Funds</button>
            <button className="btn btn-outline-secondary">Send</button>
            <button className="btn btn-outline-secondary">Transfer</button>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3 border-0">
          <li className="nav-item">
            <span className="nav-link active bg-dark text-warning border-0">
              Crypto
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link bg-dark text-light border-0">Account</span>
          </li>
        </ul>

        <div className="card bg-dark text-light">
          <div className="card-body">
            {loading && (
              <div className="text-center py-4">Loading market data…</div>
            )}

            {!loading &&
              holdings.map((h) => {
                const price = prices[h.id] || 0;
                const value = price * h.amount;

                return (
                  <div
                    key={h.id}
                    className="d-flex justify-content-between align-items-center py-3 border-top border-secondary"
                  >
                    {/* Left: icon + name */}
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          background: "#222",
                          marginRight: 12,
                        }}
                      />
                      <div>
                        <div className="fw-bold">{h.id}</div>
                        <div className="small text-muted">{h.display}</div>
                      </div>
                    </div>

                    {/* Middle: sparkline */}
                    <div style={{ width: 180 }}>
                      {klines[h.id] && klines[h.id].length > 0 ? (
                        <div style={{ height: 50 }}>
                          <Line
                            data={buildSparklineData(klines[h.id])}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: { legend: { display: false } },
                              elements: {
                                line: { borderWidth: 1 },
                                point: { radius: 0 },
                              },
                              scales: {
                                x: { display: false },
                                y: { display: false },
                              },
                            }}
                          />
                        </div>
                      ) : (
                        <div className="small text-muted">no chart</div>
                      )}
                    </div>

                    {/* Right: balance + buttons */}
                    <div className="text-end">
                      <div className="fw-bold">
                        {value.toFixed(4)} USDT
                      </div>
                      <div className="small text-muted">
                        {h.amount} {h.id}
                      </div>
                      <div className="mt-2">
                        <button className="btn btn-sm btn-outline-secondary me-2">
                          Earn
                        </button>
                        <button className="btn btn-sm btn-secondary">
                          Trade
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

            <div className="mt-3 text-muted small">
              Prices via Binance public API. Sparklines use 1h klines (last 50
              points) and auto-refresh every 30 seconds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
     
