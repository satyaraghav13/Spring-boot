
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsService from "./TermsService";

function SignUp() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <div className="main">
        <h2>Register</h2>
        <p>Welcome to OneTouch</p>

        <form action="Save" method="post">

          <div className="inbox">
            <input type="text" placeholder="Enter email/mobile" name="email" />
          </div>

          <div className="inbox">
            <input type="password" placeholder="Password" name="password" />
          </div>

          <div className="inbox">
            <input type="password" placeholder="Confirm Password" name="confirm" />
          </div>

          <div className="forget">
            <label>
              <input type="checkbox" required />
              I have read and agree to OneTouch's{" "}
              
           
              <span
                style={{ color: "skyblue", cursor: "pointer" }}
                onClick={() => setShowTerms(true)}
              >
                Terms of Service
              </span>

              {" "}and{" "}
              
              <span
                style={{ color: "skyblue", cursor: "pointer" }}
                onClick={() => setShowPrivacy(true)}
              >
                Privacy Policy
              </span>
            </label>
          </div>

          <button type="submit" className="bttn">Create Account</button>

          <p>Or Sign Up With</p>
          <span><FaGoogle /></span>
        </form>
      </div>

     
      <PrivacyPolicy show={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsService show={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
}

export default SignUp;
