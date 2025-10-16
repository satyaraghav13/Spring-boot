import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";



function Header() {
return (
    <header>
  <div className="Header-container">
        <Link to="HamburgerMenu.jsx"><span><GiHamburgerMenu /></span></Link>
        <span>
            <h2 className="Headercolor">Invest Once , Earn Every Month</h2>
        </span>
    </div>
    </header>
)
}

export default Header