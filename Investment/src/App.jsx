import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Verification from "./components/Verification";
import Setting from "./components/Setting";
import About from "./components/About";
import SecuritySetting from "./components/SecuritySetting";
import Refferal from "./components/Refferal";
import "./App.css";

import Home from "./components/Home";
import Market from "./components/Market";
import Trade from "./components/Trade";
import Futures from "./components/Futures";
import Assests from "./components/Assets";
import IsOpenProvider from "./context/IsOpenProvider";

import Login from "./components/Login";
import Logout from "./components/LogOut";
import SignUp from "./components/SignUp";

import ForgetNumber from "./components/ForgetNumber";
import ForgetEmail from "./components/ForgetEmail";
import ForgetPassword from "./components/ForgetPassword";
import Assets from "./components/Assets";

import HelpSupport from "./components/HelpSupport";

import { PortfolioProvider } from "./context/PortfolioContext";
import TermsService from "./components/TermsService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import VerifyOtp from "./components/VerifyOtp";
import PrivateRoute from "./components/PrivateRoute"; //secure the route based on authentication status
function App() {
  return (
    <PortfolioProvider>
      <IsOpenProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            {/* //secure the route based on authentication status */}
            <Route
              path="/assets" element={
                <PrivateRoute>
                  <Assets />
                </PrivateRoute>} />

            <Route path="/Refferal" element={
                <PrivateRoute>
                  <Refferal />
                </PrivateRoute> }/>

            <Route path="/SecuritySetting" element={
                <PrivateRoute>
                  <SecuritySetting />
                </PrivateRoute>}/>


                 <Route path="/Verification" element={
                <PrivateRoute>
                  <Verification />
                </PrivateRoute> }/>

            <Route path="/HelpSupport" element={
                <PrivateRoute>
                  <HelpSupport />
                </PrivateRoute>}/>
            
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/futures" element={<Futures />} />
            <Route path="/assets" element={<Assests />} />
            <Route path="/login" element={<Login />} />

            <Route path="/verification" element={<Verification />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/about" element={<About />} />
            <Route path="/securitysetting" element={<SecuritySetting />} />
            <Route path="/refferal" element={<Refferal />} />
            <Route path="/helpsupport" element={<HelpSupport />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signUp" element={<SignUp />} />

            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/forgetNumber" element={<ForgetNumber />} />
            <Route path="/forgetEmail" element={<ForgetEmail />} />

            <Route path="/TermsService" element={<TermsService />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/home" element={<Home />} />


            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Routes>
        </BrowserRouter>
      </IsOpenProvider>
    </PortfolioProvider>
  );
}
export default App;
