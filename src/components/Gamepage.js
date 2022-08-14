import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { LevelContext, CardContext } from "./Context";

function Gamepage() {
  const [level, setLevel] = useContext(LevelContext);
  const [cardData] = useContext(CardContext);
  const [cards, setCards] = useState([]);

  let shuffledCardArray;

  function loadGame() {
    let randomCards = [];
    let j = 0;

    if (level === "Easy") {
      let length = 8;
      while (randomCards.length !== length) {
        j = Math.floor(Math.random() * (length + 1));
        if (!randomCards.includes(cardData[j])) {
          randomCards.push(cardData[j]);
        }
      }
    } else if (level === "Medium") {
      let length = 10;
      while (randomCards.length !== length) {
        j = Math.floor(Math.random() * (length + 1));
        if (!randomCards.includes(cardData[j])) {
          randomCards.push(cardData[j]);
        }
      }
    } else if (level === "Hard") {
      let length = 12;
      while (randomCards.length !== length) {
        j = Math.floor(Math.random() * (length + 1));
        if (!randomCards.includes(cardData[j])) {
          randomCards.push(cardData[j]);
        }
      }
    } else if (level === "Very Hard") {
      let length = 15;
      while (randomCards.length !== length) {
        j = Math.floor(Math.random() * (length + 1));
        if (!randomCards.includes(cardData[j])) {
          randomCards.push(cardData[j]);
        }
      }
    } else if (level === "Impossible") {
      let length = 18;
      while (randomCards.length !== length) {
        j = Math.floor(Math.random() * (length + 1));
        if (!randomCards.includes(cardData[j])) {
          randomCards.push(cardData[j]);
        }
      }
    }

    const duplicateTheRandomCards = [...randomCards, ...randomCards];
    shuffledCardArray = duplicateTheRandomCards.sort(() => {
      return Math.random() - 0.5;
    });
    setCards(shuffledCardArray);
  }

  useEffect(() => {
    loadGame();
  }, [level]);

  //   console.log(cardData);

  function restart() {
    loadGame();
  }

  function resetStates() {
    setCards([level]);
    setLevel("Easy");
  }

  let cardDivStyle;
  if (cards.length === 20) {
    cardDivStyle = {
      gridTemplateColumns: "repeat(5, 50px)",
    };
  } else if (cards.length === 24) {
    cardDivStyle = {
      gridTemplateColumns: "repeat(4, 50px)",
    };
  } else if (cards.length >= 30) {
    cardDivStyle = {
      gridTemplateColumns: "repeat(6, 40px)",
    };
  }

  const cardRef = useRef();

  function revealCard(index) {
    setCards(
      cards.map((card, i) => {
        if (i === index) {
          console.log(card.name);
          return { ...card, isFlipped: true };
        } else {
          return card;
        }
      })
    );
  }

  return (
    <main className="main--gamepage">
      <div className="level--div">
        <p>Level: {level}</p>
        <p>Best Moves:</p>
        <p>Current Moves:</p>
      </div>
      <div className="card--div" style={cardDivStyle}>
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              icon={card.url}
              cards={cards}
              card={card}
              revealCard={() => revealCard(index)}
              cardRef={cardRef}
            />
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={restart}>Restart</button>
        <Link className="gamepage--link" to="/" onClick={resetStates}>
          Quit
        </Link>
      </div>
    </main>
  );
}

export default Gamepage;
