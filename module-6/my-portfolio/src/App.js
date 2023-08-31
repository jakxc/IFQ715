import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Header from "./components/Header";
import Home from "./pages/Home"


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<p>My Portfolio</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
