

function Login() {

    return (



    <div className="main">
        <h2 className="Log_in">Sign in</h2>
        <p>Invest  Once , Earn Every Month</p>

        <form action="Login" method="post">
            
           <div className="EmailMobile">
            <span className="btnEmail"><a href="email.html">Email</a></span>
             <span className="btnNumber"><a href="Mobile.html">Mobile Number</a></span>
           </div>
            <div className="inbox">
                <input type="text" placeholder="Email id" name="email"/>
            </div>


            <div className="inbox">
                <input type="password" placeholder="Password" name="password"/>
            </div>


            <div className="forget">
                <label><input type="checkbox"/> Remember me</label>
                <a href="ForgotPassword.html">Forgot Password?</a>
            </div>
			
            <button   type="submit" className="bttn">Sign in</button>
           
               <p>Or Sign Up With</p>
            <a href=""><span><i className="fa-brands fa-google"></i></span></a>
            <div className="signup">Don't have an account? <a href="Index.html">Sign Up</a>
            </div>
        </form>
    </div>
    )
};

export default Login