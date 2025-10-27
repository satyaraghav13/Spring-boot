import {  Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Verification from "./components/Verification";
import Setting from "./components/Setting";
import About from "./components/About";
import SecuritySetting from "./components/SecuritySetting";
import Refferal from "./components/Refferal";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/About" element={<About />} />
        <Route path="/SecuritySetting" element={<SecuritySetting />} />
        <Route path="/Refferal" element={<Refferal />} />
      </Routes>
    </>
  );
}

export default App;
