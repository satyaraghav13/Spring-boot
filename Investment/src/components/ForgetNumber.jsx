import { Link } from "react-router-dom";

function ForgetNumber() {
  return (
    <div className="main">
      <h2>Forgot Password</h2>

      <form action="#" method="post">
        <div className="EmailMobile">
          <span className="btnEmail">
            <Link to="/ForgetEmail">Email</Link>
          </span>

          <span className="btnNumber">
            <Link to="/ForgetNumber">Mobile Number</Link>
          </span>
        </div>

        <div className="inbox">
          <input type="text" placeholder="Mobile Number" name="mobile" />
        </div>

        <div className="inbox">
          <input type="password" placeholder="Password" name="password" />
        </div>

        <div className="inbox">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
          />
        </div>

        <button type="submit" className="bttn">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgetNumber;
