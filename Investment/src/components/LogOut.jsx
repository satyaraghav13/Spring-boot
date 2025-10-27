import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

function LogOut () {
    return (
<>
 <Link to="logout.html"><span><AiOutlineLogout size={28}/> </span></Link>
</>
)
};
export default LogOut;

