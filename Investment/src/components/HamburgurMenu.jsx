import { RiVerifiedBadgeFill } from "react-icons/ri";
import {Link } from 'react-router-dom';
import { SiLivechat } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { MdRoundaboutRight } from "react-icons/md";


function HamburgerMenu() {
return (


 <div className="color_container">
    <div className="Profile">
      <Link to="#"></Link>
    </div>

    <div className="Menu">
      <Link to="#"> <RiVerifiedBadgeFill />Verification Progress</Link>
      <Link to="#">Statement</Link>
       <Link to="#"><SiLivechat /> LiveChat</Link>
      <Link to="#"><IoMdSettings /> Setting</Link>
      <Link to="#"> Refferal</Link>
      <Link to="#"><MdRoundaboutRight /> About the app</Link>
    </div>
  </div>





)
};
export default HamburgerMenu