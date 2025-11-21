import { IoClose } from "react-icons/io5";
import { MdAccountCircle, MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";


import { MdVerified } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { MdRoundaboutRight } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";
import { MdIosShare } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";

function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`sidebar-overlay ${isOpen ? "show" : ""}`}>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>MENU</h3>
          <IoClose className="close-icon" onClick={onClose} />
        </div>

        <div className="account-box">
          
          
          <img
            src="https://cdn.dribbble.com/users/496333/screenshots/15567468/trading-3dillustration_4x.png"
            alt=""
            style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }}
          />
          <div>
            <h4>My Account</h4>
            <p>Manage your payments, rewards, and more</p>
          </div>
        </div>

        <div className="menu-section">
          <ul>
            <li>
              <Link to="/Verification" onClick={onClose}>
               
                <i>
                  <MdVerified />
                </i>
                Verification
              </Link>
            </li>
            <li>
              <Link to="/Setting" onClick={onClose}>
               
                <i>
                  <IoSettings />
                </i>
                Setting
              </Link>
            </li>
            <li>
              <Link to="/About" onClick={onClose}>
               
                <i>
                  <MdRoundaboutRight />
                </i>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/SecuritySetting" onClick={onClose}>
               
                <i>
                  <SiGnuprivacyguard />
                </i>
                Security
              </Link>
            </li>
            <li>
              <Link to="/Refferal" onClick={onClose}>
                <i>
                  <MdIosShare />
                </i>
                Refferal
              </Link>
            </li>

            <li>
              <Link to="/HelpSupport" onClick={onClose}>
                <i>
                  <TbClock24 />
                </i>
                Help & Support
              </Link>
              <p className="support-text">
            Raise queries or find answers to your questions
          </p> 
            </li>
          </ul>
        </div>

        <div className="menu-section">
          
          
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
