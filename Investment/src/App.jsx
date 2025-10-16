import HamburgerMenu from './components/HamburgurMenu'
import Verification from './components/Verification'
import Setting from './components/Setting'
import About from './components/About'
import LiveChat from './components/LiveChat'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
       <Header />
      
       <Routes>
        <Route path="/" element={<HamburgerMenu />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/About" element={<About />} />
        <Route path="/LiveChat" element={<LiveChat />} />
       
        </Routes>
    </>
  )
}

export default App
