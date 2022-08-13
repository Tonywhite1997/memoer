import React from "react";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gamepage from "./components/Gamepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function app() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/Gamepage" element={<Gamepage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default app;
