import React, { useState } from "react";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gamepage from "./components/Gamepage";
import { LevelContext, CardContext } from "./components/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Data from "./components/Data";

function App() {
  const [level, setLevel] = useState("Easy");
  const [cardData, setCardData] = useState(Data);
  return (
    <>
      <Header />
      <LevelContext.Provider value={[level, setLevel]}>
        <CardContext.Provider value={[cardData, setCardData]}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/Gamepage" element={<Gamepage />} />
            </Routes>
          </Router>
        </CardContext.Provider>
      </LevelContext.Provider>
      <Footer />
    </>
  );
}

export default App;
