import React from "react";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Success from "./components/success";
import Cancel from "./components/cancel";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </Router>
        
      </div>
    </>
  );
};

export default App;
