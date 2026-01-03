import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const message = await response.text();

      if (response.ok) {
        alert(message);
        navigate("/verify-otp", { state: { email, type: "login" } });
      } else {
        alert(message);
      }
    } catch (error) {
      alert("Server error!");
    }
  };

  return (
    <div className="main">
      <h2 className="Log_in">Sign in</h2>
      <p>Invest Once, Earn Every Month</p>

      <form onSubmit={handleLogin}>
        <div className="inbox">
          <input
            type="text"
            placeholder="Email id / Phone No."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inbox">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="forget">
          <label>
            <input type="checkbox" required/> Remember me
          </label>

          <Link to="/forgetPassword">Forgot Password?</Link>
        </div>

        <button type="submit" className="bttn">
          Sign in
        </button>

        <p>Or Sign in With</p>
        <span>
          <FaGoogle size={22} />
        </span>

        <div className="signup">
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
