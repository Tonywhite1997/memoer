import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { LevelContext, CardContext } from "./Context";

function Gamepage() {
  const [level, setLevel] = useContext(LevelContext);
  const [cardData] = useContext(CardContext);
  const [cards, setCards] = useState([]);
  const [openCardCount, setOpenCardCount] = useState(0);

  let shuffledCardArray;

  function getRandomCards(length, randomCardsArray) {
    let j = 0;
    while (randomCardsArray.length !== length) {
      j = Math.floor(Math.random() * (length + 1));
      if (!randomCardsArray.includes(cardData[j])) {
        randomCardsArray.push(cardData[j]);
      }
    }
  }

  function loadGame() {
    let randomCardsArray = [];
    if (level === "Easy") {
      let length = 8;
      getRandomCards(length, randomCardsArray);
    } else if (level === "Medium") {
      let length = 10;
      getRandomCards(length, randomCardsArray);
    } else if (level === "Hard") {
      let length = 12;
      getRandomCards(length, randomCardsArray);
    } else if (level === "Very Hard") {
      let length = 15;
      getRandomCards(length, randomCardsArray);
    } else if (level === "Impossible") {
      let length = 18;
      getRandomCards(length, randomCardsArray);
    }

    const duplicateTheRandomCards = [...randomCardsArray, ...randomCardsArray];
    shuffledCardArray = duplicateTheRandomCards.sort(() => {
      return Math.random() - 0.5;
    });
    setCards(shuffledCardArray);
  }

  useEffect(() => {
    loadGame();
  }, [level]);

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

  function revealCard(index) {
    setCards(
      cards.map((card, i) => {
        if (i === index && openCardCount !== 2 && !card.isFlipped) {
          setOpenCardCount((prevCount) => prevCount + 1);
          return { ...card, isFlipped: true };
        } else {
          return card;
        }
      })
    );
  }

  function checkIfCardsMatch() {
    let selectedCards = cards.filter((card) => {
      if (card.isFlipped && !card.isMatched) {
        return card;
      }
    });

    if (selectedCards.length === 2) {
      if (selectedCards[0].name === selectedCards[1].name) {
        setOpenCardCount(0);
        setCards(
          cards.map((card) => {
            if (
              card.name === selectedCards[0].name ||
              card.name === selectedCards[1].name
            ) {
              return { ...card, isMatched: true };
            } else {
              return card;
            }
          })
        );
      } else {
        setTimeout(() => {
          setOpenCardCount(0);
          setCards(
            cards.map((card) => {
              if (
                card.name === selectedCards[0].name ||
                card.name === selectedCards[1].name
              ) {
                return { ...card, isFlipped: false };
              } else {
                return card;
              }
            })
          );
        }, 1000);
      }
    }
  }

  useEffect(() => {
    checkIfCardsMatch();
  });

  //   console.log(openCardCount);

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
              revealCard={() => openCardCount !== 2 && revealCard(index)}
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
