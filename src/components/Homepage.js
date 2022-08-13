import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <main className="main">
      <h3>How good is your memory?</h3>
      <h4>
        Check it out by playing <span>Memoer.</span>
      </h4>
      <label htmlFor="level">Choose Level</label>
      <select id="level">
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
        <option>Very Hard</option>
        <option>impossible</option>
      </select>
      <Link className="homepage--link" to="/Gamepage">
        Start
      </Link>
      <img src="../Ellipse 1.png" className="elipse1" />
      <img src="../Ellipse 2.png" className="elipse2" />
    </main>
  );
}
