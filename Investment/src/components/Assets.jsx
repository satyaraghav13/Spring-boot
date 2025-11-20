
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
)

export default function MarketDashboard() {
  // Holdings roughly matching the screenshot (best-effort)
  const holdings = [
    { id: 'FDUSD', symbol: 'FDUSDUSDT', display: 'First Digital USD', amount: 0.63412873 },
    { id: 'BTC', symbol: 'BTCUSDT', display: 'Bitcoin', amount: 0.0000052 },
    { id: 'KNC', symbol: 'KNCUSDT', display: 'KyberNetwork', amount: 1.4109595 },
    { id: 'TRX', symbol: 'TRXUSDT', display: 'TRON', amount: 1 },
    { id: 'BNB', symbol: 'BNBUSDT', display: 'BNB', amount: 0.00027402 },
  ]

  const [prices, setPrices] = useState({})
  const [klines, setKlines] = useState({})
  const [loading, setLoading] = useState(true)

  // Helper to fetch current price for a symbol from Binance public API
  async function fetchPrice(symbol) {
    try {
      const res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
      return parseFloat(res.data.price)
    } catch (err) {
      console.error('price fetch error', symbol, err.message)
      return null
    }
  }

  // Fetch recent kline (candlestick) data for sparkline charts
  async function fetchKlines(symbol) {
    try {
      // using 1h interval and limit 50 (adjust as desired)
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=50`
      )
      // each item: [openTime, open, high, low, close, ...]
      return res.data.map((d) => ({ t: d[0], close: parseFloat(d[4]) }))
    } catch (err) {
      console.error('klines fetch error', symbol, err.message)
      return []
    }
  }

  useEffect(() => {
    let mounted = true
    async function fetchAll() {
      setLoading(true)
      const pricePromises = holdings.map((h) => fetchPrice(h.symbol))
      const klinePromises = holdings.map((h) => fetchKlines(h.symbol))

      const priceResults = await Promise.all(pricePromises)
      const klineResults = await Promise.all(klinePromises)

      if (!mounted) return

      const p = {}
      holdings.forEach((h, i) => {
        p[h.id] = priceResults[i]
      })

      const k = {}
      holdings.forEach((h, i) => {
        k[h.id] = klineResults[i]
      })

      setPrices(p)
      setKlines(k)
      setLoading(false)
    }

    fetchAll()

    // auto refresh every 30s
    const interval = setInterval(fetchAll, 30000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  const totalValue = holdings.reduce((sum, h) => {
    const price = prices[h.id] || 0
    return sum + (price * h.amount || 0)
  }, 0)

  // Small utility to build chart data for a given klines array
  function buildSparklineData(kl) {
    const labels = kl.map((d) => new Date(d.t).toLocaleString())
    const data = kl.map((d) => d.close)
    return {
      labels,
      datasets: [
        {
          label: 'price',
          data,
          fill: false,
          tension: 0.2,
          pointRadius: 0,
        },
      ],
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 1600 }}>
      <div className="card bg-dark text-light">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="small text-muted">Est. Total Value</div>
              <h2 className="mb-0">${totalValue.toFixed(2)} USDT</h2>
              <div className="text-success small">Today's PNL +₹2.63 (+0.92%)</div>
            </div>
            <div className="btn-group">
              <button className="btn btn-warning">Add Funds</button>
              <button className="btn btn-secondary">Send</button>
              <button className="btn btn-secondary">Transfer</button>
            </div>
          </div>

          <hr className="border-secondary" />

          <ul className="nav nav-tabs mb-3" style={{ borderBottom: 'none' }}>
            <li className="nav-item">
              <a className="nav-link active bg-dark text-warning">Crypto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link bg-dark text-light">Account</a>
            </li>
          </ul>

          {loading && <div className="text-center">Loading market data…</div>}

          {!loading && (
            <div>
              {holdings.map((h) => (
                <div key={h.id} className="d-flex justify-content-between align-items-center py-3 border-top border-secondary">
                  <div>
                    <div className="d-flex align-items-center">
                      <div style={{ width: 36, height: 36, borderRadius: 18, background: '#222', marginRight: 12 }}></div>
                      <div>
                        <div className="fw-bold">{h.id}</div>
                        <div className="small text-muted">{h.display}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ width: 180 }}>
                    {/* Sparkline chart */}
                    {klines[h.id] && klines[h.id].length > 0 ? (
                      <div style={{ height: 50 }}>
                        <Line
                          data={buildSparklineData(klines[h.id])}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            elements: { line: { borderWidth: 1 }, point: { radius: 0 } },
                            scales: { x: { display: false }, y: { display: false } },
                          }}
                        />
                      </div>
                    ) : (
                      <div className="small text-muted">no chart</div>
                    )}
                  </div>

                  <div className="text-end">
                    <div className="fw-bold">{(prices[h.id] || 0).toFixed(8)}</div>
                    <div className="small text-muted">₹{((prices[h.id] || 0) * h.amount).toFixed(2)}</div>
                    <div className="mt-2">
                      <button className="btn btn-sm btn-outline-secondary me-2">Earn</button>
                      <button className="btn btn-sm btn-secondary">Trade</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 text-muted small">Prices via Binance public API. Charts use 1h klines (last 50). Refreshes every 30s.</div>
        </div>
      </div>
    </div>
  )
}

