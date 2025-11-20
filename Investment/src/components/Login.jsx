import { FaGoogle } from "react-icons/fa6";

import { Link } from "react-router-dom";

function Login() {

    return (


    <div className="main">
        <h2 className="Log_in">Sign in</h2>
        <p>Invest  Once , Earn Every Month</p>

        <form action="Login" method="post">
            
       
            <div className="inbox">
                <input type="text" placeholder="Email id/Phone No." name="email" required/>
            </div>


            <div className="inbox">
                <input type="password" placeholder="Password" name="password" required/>
            </div>


            <div className="forget">
                <label><input type="checkbox"/> Remember me</label>
                {/* <a href="ForgotPassword.html">Forgot Password?</a> */}
                <Link to="/forgetPassword" >Forgot Password?</Link>
            </div>
			
            <button   type="submit" className="bttn">Sign in</button>
           
               <p>Or Sign Up With</p>
            <a href=""><span><i className="fa-brands fa-google"><FaGoogle /></i></span></a>
            <div className="signup">Don't have an account? <Link to="/signUp" >Sign Up</Link>
            </div>
        </form>
    </div>
    )
};

export default Login