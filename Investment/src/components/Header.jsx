import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { IoLogOut } from "react-icons/io5";
import LogOut from "./LogOut";


function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="header">
        <span className="hamburger" onClick={() => setIsOpen(true)}>
          <GiHamburgerMenu size={26} />
        </span>
        <h2>Invest Once, Earn Every Month</h2>

        <LogOut/> 
      </header>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        
      
    </>
  );
}

export default Header;
