import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  
  // Safely getting data from location state
  const email = location.state?.email || "";
  const password = location.state?.password || ""; 
  const type = location.state?.type || ""; 

  const handleVerify = async (e) => {
    e.preventDefault();

    // Debugging: Check what is being sent
    console.log("Verifying for:", email, "Type:", type);

    const payload = type === "registration" 
      ? { email, otp, password } 
      : { email, otp };

    try {
      const response = await fetch("http://localhost:8080/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.text();

      if (response.ok) {
        alert(type === "registration" ? "Account Created! Please Login." : "Login Successful!");
        navigate(type === "registration" ? "/login" : "/home");
        if (type !== "registration") localStorage.setItem("auth", "true");
      } else {
        // Backend se jo error aayega (e.g. "Invalid OTP") wahi dikhayega
        alert(result);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Cannot connect to server!");
    }
  };

  return (
    <div className="main" >
      <h2 className="Log_in" >OTP Verify</h2>
      <p style={{marginBottom: '20px'}}>Sent to: <b>{email}</b></p>
      
      <form onSubmit={handleVerify}>
        {/* Input box exactly like Login form */}
        <div className="inbox">
          <input
            type="text"
            placeholder="Enter 6-Digit OTP"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ 
              // Ensure it fills the inbox div
            }}
          />
        </div>
        
        {/* Button exactly like Login form */}
        <button type="submit" className="bttn">
          Verify & Continue
        </button>

        <div className="signup" style={{ marginTop: "20px" }}>
          Didn't receive code? <span style={{ color: "skyblue", cursor: "pointer" }} onClick={() => window.location.reload()}>Resend</span>
        </div>
      </form>
    </div>
  );
}

export default VerifyOtp;