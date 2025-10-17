import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

function LogOut () {
    return (
<>
 <Link to="logout.html"><span><TbLogout   size={28} /></span></Link>
</>
)
};
export default LogOut;