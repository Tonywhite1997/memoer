import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LevelContext } from "./Context";

export default function Homepage() {
  const [level, setLevel] = useContext(LevelContext);

  function saveLevel(e) {
    setLevel(e.target.value);
  }
  return (
    <main className="main">
      <h3>How good is your memory?</h3>
      <h4>
        Check it out by playing <span>Memoer.</span>
      </h4>
      <label htmlFor="level">Choose Level</label>
      <select id="level" onChange={saveLevel}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
        <option>Very Hard</option>
        <option>Impossible</option>
      </select>
      <Link className="homepage--link" to="/Gamepage">
        Start
      </Link>
      <img src="../Ellipse 1.png" className="elipse1" alt="#" />
      <img src="../Ellipse 2.png" className="elipse2" alt="#" />
    </main>
  );
}
