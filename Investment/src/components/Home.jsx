import "./HomePage.css";


function HomePage({ prices }) {
  return (
    <div className="home-container">

      {/* Top Wallet Section */}
      <div className="wallet-section">
        <h3>Est. Total Value (INR)</h3>
        <h1>₹287.93</h1>
        <p className="pnl">Today's PNL <span>+₹1.68 (+0.59%)</span></p>
        <button className="add-funds">Add Funds</button>
      </div>

      {/* BNB / SOL Cards */}
      <div className="crypto-cards">
        <div className="card">
          <h4>BNB</h4>
          <h2>911.25</h2>
          <span className="down">-2.38%</span>
          <div className="chart"></div>
        </div>

        <div className="card">
          <h4>SOL</h4>
          <h2>143.40</h2>
          <span className="up">+2.05%</span>
          <div className="chart"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <span className="active">Discover</span>
        <span>Following</span>
        <span>Campaign</span>
        <span>Announcements</span>
      </div>

      {/* Post Section */}
      <div className="post">
        <p><b>Imdad 02</b> · 14h</p>
        <p>I lost all my money 😭😭😭 Please help. Hold or Sell?</p>
        <img
          src="https://dummyimage.com/300x200/cccccc/000000"
          alt="trade chart"
          className="post-img"
        />
      </div>

    

    </div>
  );
}

export default HomePage;
