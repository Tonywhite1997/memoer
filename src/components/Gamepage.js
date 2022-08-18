import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { LevelContext, CardContext } from "./Context";
import Confetti from "react-confetti";

function Gamepage() {
  const [level, setLevel] = useContext(LevelContext);
  const [cardData] = useContext(CardContext);
  const [cards, setCards] = useState([]);
  const [openCardCount, setOpenCardCount] = useState(0);
  const [userPerformance, setUserPerformance] = useState([
    { level: "Easy", BestMoves: null },
    { level: "Medium", BestMoves: null },
    { level: "Hard", BestMoves: null },
    { level: "VeryHard", BestMoves: null },
    { level: "Impossible", BestMoves: null },
  ]);

  const [currentMoves, setCurrentMoves] = useState(0);

  const [isWon, setIsWon] = useState(false);

  let shuffledCardArray;

  function getRandomCards(length, randomCardsArray) {
    let j = 0;
    let array = [];
    while (randomCardsArray.length !== length) {
      j = Math.floor(Math.random() * cardData.length);
      if (!randomCardsArray.includes(cardData[j])) {
        array.push(j);
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
  }, []);

  function restart() {
    loadGame();
    setIsWon(false);
    setCurrentMoves(0);
    setOpenCardCount(0);
  }

  function resetStates() {
    setCards([]);
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

  function countUserMoves() {
    setCurrentMoves((prevMoves) => prevMoves + 1);
  }

  function revealCard(index) {
    setCards(
      cards.map((card, i) => {
        if (i === index && openCardCount !== 2 && !card.isFlipped) {
          countUserMoves();

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

  let userMoves;

  if (level === "Easy") {
    userMoves = userPerformance[0];
  } else if (level === "Medium") {
    userMoves = userPerformance[1];
  } else if (level === "Hard") {
    userMoves = userPerformance[2];
  } else if (level === "Very Hard") {
    userMoves = userPerformance[3];
  } else {
    userMoves = userPerformance[4];
  }

  const previousBestScoreRef = useRef();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Memoer"));
    if (!data) return;
    if (!isWon) {
      if (level === "Easy") {
        const { BestMoves } = data[0];
        previousBestScoreRef.current = BestMoves;
      } else if (level === "Medium") {
        const { BestMoves } = data[1];
        previousBestScoreRef.current = BestMoves;
      } else if (level === "Hard") {
        const { BestMoves } = data[2];
        previousBestScoreRef.current = BestMoves;
      } else if (level === "Very Hard") {
        const { BestMoves } = data[3];
        previousBestScoreRef.current = BestMoves;
      } else {
        const { BestMoves } = data[4];
        previousBestScoreRef.current = BestMoves;
      }
    }
  }, [isWon, level]);

  useEffect(() => {
    let allCardsMatched;
    if (cards.length) {
      allCardsMatched = cards.every((card) => card.isMatched);
      if (allCardsMatched) {
        setIsWon(true);
      } else {
        setIsWon(false);
      }
    }
  }, [cards]);

  function setBestMoves(index) {
    setUserPerformance(
      userPerformance.map((performance, i) => {
        if (i === index) {
          let moves;
          if (performance.BestMoves === null) {
            moves = currentMoves;
          } else if (performance.BestMoves > currentMoves) {
            moves = currentMoves;
          } else {
            moves = performance.BestMoves;
          }
          return {
            ...performance,
            BestMoves: moves,
          };
        } else {
          return performance;
        }
      })
    );
  }

  useEffect(() => {
    if (isWon) {
      if (level === "Easy") {
        setBestMoves(0);
      } else if (level === "Medium") {
        setBestMoves(1);
      } else if (level === "Hard") {
        setBestMoves(2);
      } else if (level === "Very Hard") {
        setBestMoves(3);
      } else {
        setBestMoves(4);
      }
    }
  }, [isWon]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Memoer"));
    if (data) {
      setUserPerformance(data);
    }
  }, []);

  useEffect(() => {
    if (isWon) {
      localStorage.setItem("Memoer", JSON.stringify(userPerformance));
    }
  }, [userPerformance]);

  const [userWidth] = useState(window.innerWidth);

  return (
    <main className="main--gamepage">
      {isWon && <Confetti width={userWidth} tweenDuration={3000} />}
      <div className="level--div">
        <p>Level: {level}</p>
        <p>Best Score: {userMoves.BestMoves}</p>
        <p>Current Moves: {currentMoves}</p>
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
        <button onClick={restart} className="restart--button">
          Restart
        </button>
        <Link className="gamepage--link" to="/" onClick={resetStates}>
          Quit
        </Link>
      </div>
      {isWon && currentMoves < previousBestScoreRef.current && (
        <div className="best--score">
          <h3>New Best Score: {userMoves.BestMoves}</h3>
        </div>
      )}
    </main>
  );
}

export default Gamepage;
