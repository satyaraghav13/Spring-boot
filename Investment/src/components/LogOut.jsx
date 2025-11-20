import { Link } from "react-router-dom";
import Login from "./Login";
import { AiOutlineLogout } from "react-icons/ai";

function LogOut () {
    return (


        <div className="nav-links">
                 
                 <ul>
                   <li><Link to="/Login" >Login</Link></li>
                  <li><Link to="/Logout" >Logout</Link></li> 
                 </ul>
               </div>
)
};
export default LogOut;

