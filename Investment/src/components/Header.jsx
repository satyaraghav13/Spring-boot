import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { IoLogOut } from "react-icons/io5";
import LogOut from "./LogOut";
import HeaderMenu from "./HeaderMenu";
import "../App.css";



function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="header">
        <span className="hamburger" onClick={() => setIsOpen(true)}>
          <GiHamburgerMenu size={26} />
        </span>

        <HeaderMenu/>
       
        <h2>OneTouch</h2>

        <LogOut/> 
      </header>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        
      
    </>
  );
}

export default Header;
