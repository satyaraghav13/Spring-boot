
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import axios from "axios";

// // --- CONFIG: coins list (you can add more) ---
// const COINS = [
//   {
//     id: "bitcoin",
//     name: "Bitcoin",
//     symbol: "BTC",
//     tvSymbol: "BINANCE:BTCUSDT",
//   },
//   {
//     id: "ethereum",
//     name: "Ethereum",
//     symbol: "ETH",
//     tvSymbol: "BINANCE:ETHUSDT",
//   },
//   {
//     id: "Solana",
//     name: "Solana",
//     symbol: "SOL",
//     tvSymbol: "BINANCE:SOLUSDT",
//   },
//   {
//     id: "ripple",
//     name: "XRP",
//     symbol: "XRP",
//     tvSymbol: "BINANCE:XRPUSDT",
//   },
//   {
//     id: "cardano",
//     name: "Cardano",
//     symbol: "ADA",
//     tvSymbol: "BINANCE:ADAUSDT",
//   },
//   {
//     id: "dogecoin",
//     name: "Dogecoin",
//     symbol: "DOGE",
//     tvSymbol: "BINANCE:DOGEUSDT",
//   },
//   {
//     id: "polkadot",
//     name: "Polkadot",
//     symbol: "DOT",
//     tvSymbol: "BINANCE:DOTUSDT",
//   },
//   {
//     id: "binancecoin",
//     name: "Binance Coin",
//     symbol: "BNB",
//     tvSymbol: "BINANCE:BNBUSDT",
//   },
       
//   {
//     id: "litecoin",
//     name: "Litecoin",
//     symbol: "LTC",
//     tvSymbol: "BINANCE:LTCUSDT",
//   },
  
// ];

// // ---------- TradingView chart component ----------
// function TradingViewChart({ tvSymbol }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     function createWidget() {
//       if (!window.TradingView || !containerRef.current) return;

//       // clear previous widget
//       containerRef.current.innerHTML = "";

//       new window.TradingView.widget({
//         symbol: tvSymbol,
//         interval: "60",
//         autosize: true,
//         timezone: "Etc/UTC",
//         theme: "dark",
//         style: "1",
//         locale: "en",
//         enable_publishing: false,
//         backgroundColor: "rgba(13,15,23,1)",
//         hide_legend: false,
//         container_id: containerRef.current.id,
//       });
//     }

//     if (!window.TradingView) {
//       const script = document.createElement("script");
//       script.src = "https://s3.tradingview.com/tv.js";
//       script.async = true;
//       script.onload = createWidget;
//       document.body.appendChild(script);
//     } else {
//       createWidget();
//     }

//     // cleanup
//     return () => {
//       if (containerRef.current) containerRef.current.innerHTML = "";
//     };
//   }, [tvSymbol]);

//   const containerId = useMemo(() => "tv_chart_container", []);

//   return (
//     <div
//       id={containerId}
//       ref={containerRef}
//       style={{ width: "100%", height: "420px" }}
//     />
//   );
// }

// // ---------- Main Markets Page ----------
// export default function MarketsPage() {
//   const [selectedId, setSelectedId] = useState("binancecoin");
//   const [listData, setListData] = useState(null);      // for left list
//   const [coinData, setCoinData] = useState(null);      // detailed for selected
//   const [loadingList, setLoadingList] = useState(true);
//   const [loadingCoin, setLoadingCoin] = useState(true);

//   const selectedCoin = COINS.find((c) => c.id === selectedId);

//   // Fetch list data for sidebar (prices + 24h %)
//   useEffect(() => {
//     async function fetchList() {
//       try {
//         setLoadingList(true);
//         const ids = COINS.map((c) => c.id).join(",");
//         const res = await axios.get(
//           `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=inr&include_24hr_change=true`
//         );
//         setListData(res.data);
//       } catch (err) {
//         console.error("Simple price error", err);
//       } finally {
//         setLoadingList(false);
//       }
//     }

//     fetchList();
//     const interval = setInterval(fetchList, 30000); // refresh 30s
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch detailed data for selected coin (stats panel)
//   useEffect(() => {
//     async function fetchCoin() {
//       if (!selectedCoin) return;
//       try {
//         setLoadingCoin(true);
//         const res = await axios.get(
//           `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
//         );
//         setCoinData(res.data);
//       } catch (err) {
//         console.error("Coin detail error", err);
//       } finally {
//         setLoadingCoin(false);
//       }
//     }

//     fetchCoin();
//   }, [selectedId, selectedCoin]);

//   // helpers
//   const formatINR = (num) =>
//     num ? "₹" + num.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : "--";

//   const marketData = coinData?.market_data;
//   const currentPrice =
//     marketData?.current_price?.inr != null
//       ? marketData.current_price.inr
//       : null;

//   const dayLow = marketData?.low_24h?.inr ?? null;
//   const dayHigh = marketData?.high_24h?.inr ?? null;

//   const rangePercent =
//     dayLow != null && dayHigh != null && currentPrice != null
//       ? ((currentPrice - dayLow) / (dayHigh - dayLow)) * 100
//       : 50;

//   return (
//     <div
//       className="container-fluid"
//       style={{ background: "#050816", minHeight: "100vh", color: "white" }}
//     >
//       {/* Top mini navbar (like Popular, NIFTY, etc.) – simplified */}
//       <div className="row border-bottom border-secondary py-2 px-3">
//         <div className="col-auto fw-semibold text-success">Popular</div>
//         <div className="col-auto small">BTC</div>
//         <div className="col-auto small">ETH</div>
//         <div className="col-auto small">BNB</div>
//       </div>

//       <div className="row">
//         {/* ---------- Left Sidebar ---------- */}
//         <div
//           className="col-3 border-end border-secondary"
//           style={{ minHeight: "calc(100vh - 40px)", background: "#070b1a" }}
//         >
//           <h6 className="mt-3 mb-2 px-3 text-muted">Cryptocurrencies</h6>
//           <div className="px-3 mb-2 fw-semibold">Popular</div>

//           {loadingList && (
//             <div className="px-3 text-muted small">Loading markets...</div>
//           )}

//           <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
//             {COINS.map((coin) => {
//               const data = listData?.[coin.id];
//               const price = data?.inr;
//               const change = data?.inr_24h_change;
//               const active = coin.id === selectedId;
//               return (
//                 <div
//                   key={coin.id}
//                   className={`d-flex align-items-center px-3 py-2 mb-1 ${
//                     active ? "bg-primary" : ""
//                   }`}
//                   style={{
//                     cursor: "pointer",
//                     borderRadius: active ? "4px" : 0,
//                   }}
//                   onClick={() => setSelectedId(coin.id)}
//                 >
//                   {/* left small circle icon */}
//                   <div
//                     className="me-2"
//                     style={{
//                       width: 28,
//                       height: 28,
//                       borderRadius: "50%",
//                       background: "#222",
//                     }}
//                   />
//                   <div className="flex-grow-1">
//                     <div className="fw-semibold" style={{ fontSize: 13 }}>
//                       {coin.name}
//                     </div>
//                     <div className="text-muted" style={{ fontSize: 11 }}>
//                       {coin.symbol}
//                     </div>
//                   </div>

//                   {/* mini “sparkline placeholder” */}
//                   <div
//                     className="mx-2"
//                     style={{
//                       width: 70,
//                       height: 30,
//                       borderRadius: 4,
//                       background:
//                         change != null && change < 0 ? "#3b1114" : "#12351a",
//                     }}
//                   />

//                   <div className="text-end" style={{ fontSize: 12 }}>
//                     <div className="fw-semibold">
//                       {price ? price.toLocaleString("en-IN") : "--"}
//                     </div>
//                     <div
//                       className={
//                         change != null && change < 0
//                           ? "text-danger"
//                           : "text-success"
//                       }
//                     >
//                       {change != null
//                         ? change.toFixed(2) + "%"
//                         : "--"}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ---------- Middle: Chart + header ---------- */}
//         <div className="col-6 px-4 pt-3" style={{ background: "#050816" }}>
//           {/* Coin header */}
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//               <div className="small text-muted">
//                 {selectedCoin?.symbol} • COIN • CURRENCY IN INR
//               </div>
//               <h4 className="mb-0">
//                 {formatINR(currentPrice ?? 0)}{" "}
//                 <span className="fs-6 text-muted">
//                   {selectedCoin?.symbol}
//                 </span>
//               </h4>
//               <div className="small text-danger">
//                 {marketData?.price_change_24h_in_currency?.inr
//                   ? formatINR(
//                       marketData.price_change_24h_in_currency.inr
//                     )
//                   : "--"}{" "}
//                 (
//                 {marketData?.price_change_percentage_24h_in_currency?.inr
//                   ? marketData.price_change_percentage_24h_in_currency.inr.toFixed(
//                       2
//                     )
//                   : "--"}
//                 %)
//               </div>
//             </div>
//             <div>
//               <button className="btn btn-primary btn-sm me-2">
//                 + Watchlist
//               </button>
//               <button className="btn btn-outline-secondary btn-sm me-2">
//                 Compare
//               </button>
//               <button className="btn btn-outline-secondary btn-sm">
//                 Join discussion
//               </button>
//             </div>
//           </div>

//           {/* Timeframe buttons */}
//           <div className="mb-2">
//             {["1D", "1W", "1M", "3M", "YTD", "1Y", "3Y", "5Y", "Max"].map(
//               (t) => (
//                 <button
//                   key={t}
//                   className={`btn btn-sm me-2 ${
//                     t === "3M" ? "btn-primary" : "btn-outline-secondary"
//                   }`}
//                 >
//                   {t}
//                 </button>
                
                
//               )
//             )}
//           </div>
          

//           {/* TradingView chart */}
//           <div className="bg-dark rounded p-2 mb-3" style={{ height: 440 }}>
//             {selectedCoin && (
//               <TradingViewChart tvSymbol={selectedCoin.tvSymbol} />
//             )}
//           </div>

//           {/* Quick compare (simple row) */}
//           <div className="bg-dark rounded p-3 mb-3">
//             <div className="mb-2 fw-semibold">Quick Compare</div>
//             <div className="d-flex flex-wrap gap-3">
//               {COINS.slice(0, 4).map((coin) => {
//                 const data = listData?.[coin.id];
//                 return (
//                   <div
//                     key={coin.id}
//                     className="p-2 rounded"
//                     style={{ background: "#111827", minWidth: 120 }}
//                   >
//                     <div className="small fw-semibold">{coin.name}</div>
//                     <div
//                       className={`small ${
//                         data?.inr_24h_change < 0
//                           ? "text-danger"
//                           : "text-success"
//                       }`}
//                     >
//                       {data?.inr_24h_change
//                         ? data.inr_24h_change.toFixed(2) + "%"
//                         : "--"}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* ---------- Right: Stats panel ---------- */}
//         <div
//           className="col-3 px-3 pt-3 border-start border-secondary"
//           style={{ background: "#070b1a" }}
//         >
//           <div className="bg-dark rounded p-3">
//             <h6 className="mb-3">Day Range</h6>

//             <div className="small d-flex justify-content-between mb-1">
//               <span>{formatINR(dayLow ?? 0)}</span>
//               <span>{formatINR(dayHigh ?? 0)}</span>
//             </div>

//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={isFinite(rangePercent) ? rangePercent : 50}
//               readOnly
//               className="form-range mb-3"
//             />

//             <div className="small mb-1 d-flex justify-content-between">
//               <span>Market Cap</span>
//               <span>
//                 {formatINR(marketData?.market_cap?.inr ?? 0)}
//               </span>
//             </div>

//             <div className="small mb-1 d-flex justify-content-between">
//               <span>Market Dominance</span>
//               <span>
//                 {marketData?.market_cap_change_percentage_24h
//                   ? marketData.market_cap_change_percentage_24h.toFixed(
//                       2
//                     ) + "%"
//                   : "--"}
//               </span>
//             </div>

//             <div className="small mb-1 d-flex justify-content-between">
//               <span>Circulating Supply</span>
//               <span>
//                 {coinData?.market_data?.circulating_supply
//                   ? coinData.market_data.circulating_supply.toLocaleString(
//                       "en-IN"
//                     )
//                   : "--"}
//               </span>
//             </div>

//             <div className="small mb-1 d-flex justify-content-between">
//               <span>Volume (24h)</span>
//               <span>
//                 {formatINR(marketData?.total_volume?.inr ?? 0)}
//               </span>
//             </div>

//             <div className="small mb-1 d-flex justify-content-between">
//               <span>Price Change (1h)</span>
//               <span>
//                 {marketData?.price_change_percentage_1h_in_currency?.inr
//                   ? marketData.price_change_percentage_1h_in_currency.inr.toFixed(
//                       2
//                     ) + "%"
//                   : "--"}
//               </span>
//             </div>

//             <div className="small mb-1 d-flex justify-content-between">
//               <span>Price Change (24h)</span>
//               <span>
//                 {marketData?.price_change_percentage_24h_in_currency?.inr
//                   ? marketData.price_change_percentage_24h_in_currency.inr.toFixed(
//                       2
//                     ) + "%"
//                   : "--"}
//               </span>
//             </div>

//             <div className="small mb-1 d-flex justify-content-between">
//               <span>Price Change (7d)</span>
//               <span>
//                 {marketData?.price_change_percentage_7d_in_currency?.inr
//                   ? marketData.price_change_percentage_7d_in_currency.inr.toFixed(
//                       2
//                     ) + "%"
//                   : "--"}
//               </span>
//             </div>

//             <div className="small mb-1 d-flex justify-content-between">
//               <span>1 Year Return</span>
//               <span>
//                 {marketData?.price_change_percentage_1y_in_currency?.inr
//                   ? marketData.price_change_percentage_1y_in_currency.inr.toFixed(
//                       2
//                     ) + "%"
//                   : "--"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

// --------------------------------
// TradingView Chart Component
// --------------------------------
function TradingViewChart({ tvSymbol }) {
  const containerRef = useRef(null);

  useEffect(() => {
    function createWidget() {
      if (!window.TradingView || !containerRef.current) return;

      // clear previous chart
      containerRef.current.innerHTML = "";

      new window.TradingView.widget({
        symbol: tvSymbol,
        interval: "60",
        autosize: true,
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        backgroundColor: "rgba(13,15,23,1)",
        hide_legend: false,
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

  const containerId = useMemo(() => "tv_chart_container", []);

  return (
    <div
      id={containerId}
      ref={containerRef}
      style={{ width: "100%", height: "420px" }}
    />
  );
}


export default function MarketsPage() {
  const [coins, setCoins] = useState([]);                // Sidebar coins list
  const [selected, setSelected] = useState(null);        // Selected coin details
  const [stats, setStats] = useState(null);              // Right panel details
  const [loadingList, setLoadingList] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

 
  useEffect(() => {
    async function loadCoins() {
      try {
        setLoadingList(true);

        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "inr",
              order: "market_cap_desc",
              per_page: 15,
              page: 1,
            },
          }
        );

        const formatted = res.data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          image: coin.image,
          price: coin.current_price,
          change24: coin.price_change_percentage_24h,
          tvSymbol: `BINANCE:${coin.symbol.toUpperCase()}USDT`,
        }));

        setCoins(formatted);

       
        if (!selected) setSelected(formatted[0]);

      } catch (err) {
        console.log("Coins error:", err);
      } finally {
        setLoadingList(false);
      }
    }

    loadCoins();
  }, []);

 
  useEffect(() => {
    if (!selected) return;

    async function loadStats() {
      try {
        setLoadingStats(true);

        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selected.id}`,
          {
            params: {
              localization: false,
              tickers: false,
              market_data: true,
              community_data: false,
              developer_data: false,
              sparkline: false,
            },
          }
        );

        setStats(res.data);

      } catch (err) {
        console.log("Stats error:", err);
      } finally {
        setLoadingStats(false);
      }
    }

    loadStats();
  }, [selected]);

 
  const formatINR = (n) =>
    n ? "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : "--";

  const m = stats?.market_data;
  const price = m?.current_price?.inr;
  const low = m?.low_24h?.inr;
  const high = m?.high_24h?.inr;
  const slider =
    price && low && high ? ((price - low) / (high - low)) * 100 : 50;

  return (
    <div
      className="container-fluid"
      style={{ background: "#050816", minHeight: "100vh", color: "white" }}
    >
      <div className="row">

        {/*Sidebar */}
        <div
          className="col-3 border-end border-secondary"
          style={{ background: "#070b1a", height: "100vh", overflowY: "auto" }}
        >
          <h6 className="mt-3 ms-3 text-muted">Cryptocurrencies</h6>

          {loadingList && (
            <div className="px-3 text-muted small">Loading...</div>
          )}

          {coins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => setSelected(coin)}
              className={`d-flex align-items-center px-3 py-2 mb-1 ${
                selected?.id === coin.id ? "bg-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={coin.image}
                width="28"
                height="28"
                className="me-2 rounded-circle"
              />

              <div className="flex-grow-1">
                <div className="fw-semibold">{coin.name}</div>
                <div className="text-muted" style={{ fontSize: 12 }}>
                  {coin.symbol}
                </div>
              </div>

              <div className="text-end" style={{ fontSize: 12 }}>
                <div>{formatINR(coin.price)}</div>
                <div className={coin.change24 < 0 ? "text-danger" : "text-success"}>
                  {coin.change24?.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Chart */}
        <div className="col-6 p-4">
          {selected && (
            <>
              <h4>
                {selected.name}{" "}
                <span className="text-muted">{selected.symbol}</span>
              </h4>
              <h2>{formatINR(price)}</h2>

              <div className="bg-dark rounded p-2 mt-3">
                <TradingViewChart tvSymbol={selected.tvSymbol} />
              </div>
            </>
          )}
        </div>

        {/*  Right Stats */}
        <div className="col-3 p-4 border-start border-secondary">
          <div className="bg-dark rounded p-3">
            <h6>Day Range</h6>

            <div className="d-flex justify-content-between small">
              <span>{formatINR(low)}</span>
              <span>{formatINR(high)}</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={slider}
              readOnly
              className="form-range"
            />

            <div className="small d-flex justify-content-between mt-3">
              <span>Market Cap</span>
              <span>{formatINR(m?.market_cap?.inr)}</span>
            </div>

            <div className="small d-flex justify-content-between mt-2">
              <span>Volume (24h)</span>
              <span>{formatINR(m?.total_volume?.inr)}</span>
            </div>

            <div className="small d-flex justify-content-between mt-2">
              <span>Price Change (24h)</span>
              <span>{m?.price_change_percentage_24h_in_currency?.inr?.toFixed(2)}%</span>
            </div>

            <div className="small d-flex justify-content-between mt-2">
              <span>Price Change (7d)</span>
              <span>{m?.price_change_percentage_7d_in_currency?.inr?.toFixed(2)}%</span>
            </div>

            <div className="small d-flex justify-content-between mt-2">
              <span>1 Year Return</span>
              <span>{m?.price_change_percentage_1y_in_currency?.inr?.toFixed(2)}%</span>
            </div>



            




          </div>
        </div>
      </div>
    </div>
  );
}
