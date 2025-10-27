import Home from "./Home"
import Trade from "./Trade";
import Market from "./Market";
import Futures from "./Futures";
import Assests from "./Assets";
import { Link } from "react-router-dom";



function HeaderMenu(){
   return(


        <div className="nav-links">
                 
                 <ul>
                   <li><Link to="/Home" >  Home</Link></li>
                  <li><Link to="/Market" >Markets </Link></li>
                   <li><Link to="/Trade">  Trade</Link></li>
                   <li><Link to="/Futures"> Futures</Link></li>
                     <li><Link to="/Assets" > Assets</Link></li>
                   
                 </ul>
               </div>
   
   )


}

export default HeaderMenu;