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
          {/* <MdAccountCircle size={40} /> */}
          <img
            src="data:image/jpeg;base64,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"
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
                {" "}
                <i>
                  <MdVerified />
                </i>{" "}
                Verification
              </Link>
            </li>
            <li>
              <Link to="/Setting" onClick={onClose}>
                {" "}
                <i>
                  <IoSettings />{" "}
                </i>{" "}
                Setting
              </Link>
            </li>
            <li>
              <Link to="/About" onClick={onClose}>
                {" "}
                <i>
                  <MdRoundaboutRight />{" "}
                </i>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/SecuritySetting" onClick={onClose}>
                {" "}
                <i>
                  <SiGnuprivacyguard />{" "}
                </i>
                Security
              </Link>
            </li>
            <li>
              <Link to="/Refferal" onClick={onClose}>
                {" "}
                <i>
                  <MdIosShare />{" "}
                </i>
                Refferal
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <div className="menu-title">
            <span>Help & Support</span>
            <MdKeyboardArrowDown />
          </div>
          <p className="support-text">
            Raise queries or find answers to your questions
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
