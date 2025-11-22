
import { usePortfolio } from "../context/PortfolioContext";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TVMiniWidget({ containerId, symbol }) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      new window.TradingView.MediumWidget({
        container_id: containerId,
        symbols: [[symbol]],
        chartOnly: true,
        width: "100%",
        height: "120",
        locale: "en",
        colorTheme: "dark",
        autosize: true,
      });
    };

    container.appendChild(script);

    return () => (container.innerHTML = "");
  }, [containerId, symbol]);

  return <div id={containerId}></div>;
}

// MAIN HOMEPAGE 
export default function Home() {
  const { totalINR = 0, prices = {} } = usePortfolio() || {};

  // ---------- TAB STATE ----------
  const [activeTab, setActiveTab] = useState("discover");

  return (
    <div
      className="container-fluid p-3"
      style={{ background: "#0d1117", minHeight: "100vh" }}
    >
      {/* Portfolio Card */}
      <div className="card bg-dark border-secondary text-light p-4 rounded-4 mb-3 shadow">
        <h6 className="text-secondary">Est. Total Value</h6>
        <h2 className="fw-bold mb-1">₹{totalINR.toFixed(2)}</h2>

        <div className="text-success small mb-2">
          Today's PNL: <strong>+₹1.68 (+0.59%)</strong>
        </div>

        <button className="btn btn-warning fw-semibold px-2 rounded-2">
          Add Funds
        </button>
      </div>

      {/* Price Cards (BNB & SOL) */}
      <div className="row g-3">
        {/* BNB */}
        <div className="col-6">
          <div className="card bg-dark border-secondary text-light p-3 rounded-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <strong>BNB</strong>
              <span className="text-success small">+1.25%</span>
            </div>

            <h4 className="fw-bold mt-2">
              {prices["BNBUSDT"]?.toFixed(2) || "--"}
            </h4>

            <div className="rounded mt-2" style={{ overflow: "hidden" }}>
              <TVMiniWidget containerId="bnbChart" symbol="BINANCE:BNBUSDT" />
            </div>
          </div>
        </div>

        {/* SOL */}
        <div className="col-6">
          <div className="card bg-dark border-secondary text-light p-3 rounded-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <strong>SOL</strong>
              <span className="text-success small">+1.85%</span>
            </div>

            <h4 className="fw-bold mt-2">
              {prices["SOLUSDT"]?.toFixed(2) || "--"}
            </h4>

            <div className="rounded mt-2" style={{ overflow: "hidden" }}>
              <TVMiniWidget containerId="solChart" symbol="BINANCE:SOLUSDT" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mt-4 mb-3 border-secondary">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "discover"
                ? "active bg-dark text-warning"
                : "bg-dark text-light"
            } border-secondary`}
            onClick={() => setActiveTab("discover")}
          >
            Discover
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "following"
                ? "active bg-dark text-warning"
                : "bg-dark text-light"
            } border-secondary`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "campaign"
                ? "active bg-dark text-warning"
                : "bg-dark text-light"
            } border-secondary`}
            onClick={() => setActiveTab("campaign")}
          >
            Campaign
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "announcements"
                ? "active bg-dark text-warning"
                : "bg-dark text-light"
            } border-secondary`}
            onClick={() => setActiveTab("announcements")}
          >
            Announcements
          </button>
        </li>
      </ul>

      {/* -------------------- TAB CONTENT -------------------- */}

      {/* DISCOVER */}
      {activeTab === "discover" && (
        <div className="card bg-dark border-secondary text-light p-3 rounded-4 shadow">
          <b>🔥 Market Trending Today</b>
          <p className="small text-muted mb-2">Auto-updated from live prices</p>

          <ul className="list-group list-group-flush bg-dark">
            <li className="list-group-item bg-dark text-light">
              BNB – {prices["BNBUSDT"]?.toFixed(2) || "--"} USDT
            </li>
            <li className="list-group-item bg-dark text-light">
              SOL – {prices["SOLUSDT"]?.toFixed(2) || "--"} USDT
            </li>
          </ul>
        </div>
      )}

      {/* FOLLOWING */}
      {activeTab === "following" && (
        <div className="card bg-dark border-secondary text-light p-3 rounded-4 shadow">
          <b>Your Following Coins</b>
          <p className="small text-muted">Auto updates from live market</p>

          <ul className="list-group list-group-flush bg-dark">
            <li className="list-group-item bg-dark text-light">
              BTC – {prices["BTCUSDT"]?.toFixed(2) || "--"} USDT
            </li>
            <li className="list-group-item bg-dark text-light">
              ETH – {prices["ETHUSDT"]?.toFixed(2) || "--"} USDT
            </li>
          </ul>
        </div>
      )}

      {/* CAMPAIGN */}
      {activeTab === "campaign" && (
        <div className="card bg-dark border-secondary text-light p-3 rounded-4 shadow">
          <b>💰 Ongoing Campaigns</b>
          <p className="small">• Earn trading cashback</p>
          <p className="small">• Win USDT rewards</p>
        </div>
      )}

      {/* ANNOUNCEMENTS */}
      {activeTab === "announcements" && (
        <div className="card bg-dark border-secondary text-light p-3 rounded-4 shadow">
          <b>📢 Latest Announcements</b>
          <p className="small text-muted">Auto refreshed</p>

          <ul className="list-group list-group-flush bg-dark">
            <li className="list-group-item bg-dark text-light">
              SOL network upgrade scheduled today.
            </li>
            <li className="list-group-item bg-dark text-light">
              BTC liquidity increased by 4% today.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

