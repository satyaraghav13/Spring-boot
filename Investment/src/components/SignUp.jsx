import { FaGoogle } from "react-icons/fa6";

function SignUp() {
    return (
       


             <div className="main">
        <h2>Register</h2>
        <p>Welcome to OneTouch</p>

        {/*Fixed parameter names */}
        <form action="Save" method="post">
            

            <div className="inbox">
                <input type="text" placeholder="Enter email/mobile" name="email"/>
            </div>

            <div className="inbox">
                <input type="password" placeholder="Password" name="password"/>
            </div>

            <div className="inbox">
                <input type="password" placeholder="Confirm Password" name="confirm"/>
            </div>

            <div className="forget">
                <label><input type="checkbox" required/>I have read and agree to the OneTouch's  <a href="Terms of Service">Terms of Service</a> and <a href=" Privacy Policy"> Privacy Policy</a></label>
            </div>

            <button type="submit" className="bttn">Create Account</button>

            <p>Or Sign Up With</p>
            <a href=""><span><i className="fa-brands fa-google"><FaGoogle /></i></span></a>
           
        </form>
        </div>
      
    );
}


export default SignUp;