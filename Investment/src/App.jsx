import {  Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Verification from "./components/Verification";
import Setting from "./components/Setting";
import About from "./components/About";
import LiveChat from "./components/LiveChat";
import Refferal from "./components/Refferal";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/About" element={<About />} />
        <Route path="/LiveChat" element={<LiveChat />} />
        <Route path="/Refferal" element={<Refferal />} />
      </Routes>
    </>
  );
}

export default App;
