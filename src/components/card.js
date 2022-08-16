import React from "react";

function Card({ icon, cards, card, revealCard }) {
  let containerStyle;
  let iconSize;
  if (cards.length >= 24) {
    containerStyle = {
      height: "40px",
    };
    iconSize = {
      fontSize: "1.5rem",
    };
  }
  return (
    <div className="card--container" style={containerStyle}>
      <div
        className={card.isFlipped ? "card reveal" : "card"}
        onClick={revealCard}
      >
        <div className="card--back">Tap</div>
        <div className="card--front">
          <i style={iconSize} className={icon}></i>
        </div>
      </div>
    </div>
  );
}

export default Card;
