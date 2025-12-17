//secure the route based on authentication status




import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("auth") === "true";
  return isLoggedIn ? children : <Navigate to="/login"replace />;
}
