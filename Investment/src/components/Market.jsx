import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Market() {
  const [coins, setCoins] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const updated = {};
      data.forEach((coin) => {
        updated[coin.s] = coin;
      });

      setCoins(updated);
      setLoading(false);
    };

    return () => ws.close();
  }, []);

  const symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
    "XRPUSDT",
    "ADAUSDT",
    "ARUSDT",
    "CELOUSDT",
    "BNTUSDT",
    "DOGEUSDT",
    "DOTUSDT",
    "LTCUSDT",
    "MATICUSDT",
    "TRXUSDT",
    "XLMUSDT",
    "XTZUSDT",
    "ZECUSDT",
    "AVAXUSDT",
    "LINKUSDT",
    "ATOMUSDT",
    "FTMUSDT",
    "NEARUSDT",
    "ALGOUSDT",
    "VETUSDT",

  ];

  if (loading)
    return (
      <div className="text-center text-white p-5 fs-4">
        Loading live prices…
      </div>
    );

  return (
    <div className="container py-4" style={{ backgroundColor: "#101216ff", minHeight: "100vh" , maxWidth:"1500px"}}>
      <h1 className="text-white mb-4 fw-bold">Crypto</h1>

      <div className="table-responsive">
        <table className="table table-dark table-hover table-borderless align-middle">
          <thead>
            <tr className="text-secondary">
              <th scope="col">Pair</th>
              <th scope="col" className="text-center">Price (USDT)</th>
              <th scope="col" className="text-end">24h%</th>
            </tr>
          </thead>

          <tbody>
            {symbols.map((sym) => {
              const c = coins[sym];
              if (!c) return null;

              const change = parseFloat(c.P);
              const isPositive = change >= 0;

              return (
                <tr key={sym} className="table-row">
                  <td className="fw-semibold text-white">{sym}</td>

                  <td className="text-center fw-bold text-info">
                    {parseFloat(c.c).toFixed(4)}
                  </td>

                  <td className="text-end">
                    <span
                      className={`badge rounded-pill px-3 py-2 fs-6 ${
                        isPositive ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {change.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
