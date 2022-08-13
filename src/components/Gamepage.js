import React from "react";
import Card from "./card";

function Gamepage() {
  return (
    <main className="main--gamepage">
      <div className="level--div">
        <p>Level:</p>
        <p>Best Moves:</p>
        <p>Current Moves:</p>
      </div>
      <div className="card--div">
        <Card />
      </div>
      <div className="buttons">
        <button>Restart</button>
        <button>Quit</button>
      </div>
    </main>
  );
}

export default Gamepage;
