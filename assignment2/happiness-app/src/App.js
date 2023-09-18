import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Home from "./pages/Home";
import Register from './pages/Register'
import Login from "./pages/Login";
import CountryRankings from "./pages/CountryRankings";
import HappinessFactors from "./pages/HappinessFactors";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} onLoginChanged={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLoginChanged={setIsLoggedIn}/>} />
          <Route path="/countryRankings" element={<CountryRankings />} />
          <Route path="/happinessFactors" element={<HappinessFactors />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
