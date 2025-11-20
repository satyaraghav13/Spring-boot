import { Link } from "react-router-dom";

function HeaderMenu() {
  return (
    <div className="nav-links">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/market">Markets</Link></li>
        <li><Link to="/trade">Trade</Link></li>
        <li><Link to="/futures">Futures</Link></li>
        <li><Link to="/assets">Assets</Link></li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
