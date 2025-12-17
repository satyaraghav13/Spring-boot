
// import { FaGoogle } from "react-icons/fa6";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PrivacyPolicy from "./PrivacyPolicy";
// import TermsService from "./TermsService";

// function SignUp() {
//   const navigate = useNavigate();

//   const [showPrivacy, setShowPrivacy] = useState(false);
//   const [showTerms, setShowTerms] = useState(false);
//   const [number, setNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirm) {
//       alert("Password and Confirm Password do not match!");
//       return;
//     }

//     const data = {number, email, password };

//     try {
//       const response = await fetch("http://localhost:8080/Save", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         alert("Account Created Successfully!");

//         navigate("/login");
//       } else {
//         alert("Something went wrong!");
//       }
//     } catch (error) {
//       alert("Server not responding!");
//     }
//   };

//   return (
//     <>
//       <div className="main">
//         <h2>Register</h2>
//         <p>Welcome to OneTouch</p>

//         <form onSubmit={handleSubmit}>
//           <div className="inbox">
//             <input
//               type="text"
//               placeholder="Enter email/mobile"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          


//           <div className="inbox">
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="inbox">
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               name="confirm"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               required
//             />
//           </div>

//           <div className="forget">
//             <label>
//               <input type="checkbox" required /> I agree to{" "}
//               <span
//                 style={{ color: "skyblue" }}
//                 onClick={() => setShowTerms(true)}
//               >
//                 Terms of Service
//               </span>{" "}
//               and{" "}
//               <span
//                 style={{ color: "skyblue" }}
//                 onClick={() => setShowPrivacy(true)}
//               >
//                 Privacy Policy
//               </span>
//             </label>
//           </div>

//           <button type="submit" className="bttn">
//             Create Account
//           </button>

//           <p>Or Sign Up With</p>
//           <FaGoogle size={24} />
//         </form>
//       </div>

//       <PrivacyPolicy show={showPrivacy} onClose={() => setShowPrivacy(false)} />
//       <TermsService show={showTerms} onClose={() => setShowTerms(false)} />
//     </>
//   );
// }

// export default SignUp;













import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsService from "./TermsService";

function SignUp() {
  const navigate = useNavigate();
  
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(""); // Phone number state
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Phase 1: OTP Trigger
      const response = await fetch("http://localhost:8080/Save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: number, email, password }), // Backend key 'phone' honi chahiye
      });

      const message = await response.text();

      if (response.ok) {
        alert("OTP sent to your Gmail!");
        // 🔥 Sabhi fields ko aage bhej rahe hain taaki Final Save ho sake
        navigate("/verify-otp", { 
          state: { email, password, phone: number, type: "registration" } 
        });
      } else {
        alert(message);
      }
    } catch (error) {
      alert("Server error! Please check if backend is running.");
    }
  };

  return (
    <div className="main">
      <h2 className="Log_in">Register</h2>
      <p>Invest Once, Earn Every Month</p>
      <form onSubmit={handleSubmit}>
        
        {/* Email Box */}
        <div className="inbox">
          <input type="email" placeholder="Gmail ID" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        {/* Phone Number Box (Added for Consistency)
        <div className="inbox">
          <input type="text" placeholder="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
        </div> */}

        {/* Password Box */}
        <div className="inbox">
          <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {/* Confirm Password Box */}
        <div className="inbox">
          <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>

            
          <div className="forget">
            <label>
              <input type="checkbox" required /> I agree to{" "}
              <span
                style={{ color: "skyblue" }}
                onClick={() => setShowTerms(true)}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                style={{ color: "skyblue" }}
                onClick={() => setShowPrivacy(true)}
              >
                Privacy Policy
              </span>
            </label>
          </div>

         <button type="submit" className="bttn">Register</button>
        
        <p>Or Sign Up With</p>
        <span style={{cursor: "pointer"}}><FaGoogle size={24} /></span>

        <PrivacyPolicy show={showPrivacy} onClose={() => setShowPrivacy(false)} />
        <TermsService show={showTerms} onClose={() => setShowTerms(false)} />

        <PrivacyPolicy show={showPrivacy} onClose={() => setShowPrivacy(false)} />
        <TermsService show={showTerms} onClose={() => setShowTerms(false)} />

      </form>
    </div>
  );
}

 export default SignUp;