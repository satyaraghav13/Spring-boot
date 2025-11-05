import { Link } from "react-router-dom";
import Login from "./Login";
import { AiOutlineLogout } from "react-icons/ai";

function LogOut () {
    return (


        <div className="nav-links">
                 
                 <ul>
                   <li><Link to="/LogOut" >Login</Link></li>
                  <li><Link to="/L" >Logout</Link></li>
                   
                   
                 </ul>
               </div>
)
};
export default LogOut;

