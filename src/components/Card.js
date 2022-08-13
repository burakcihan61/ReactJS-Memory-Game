import React from "react";

function Card({ framework, close, complete, click }) {
  const clicked = (framework) => {
    click(framework);
  };
  return (
    <div
      className={
        "card" + (!close ? " opened" : "") + (complete ? " matched" : "")
      }
      onClick={() => clicked(framework)}
    >
      <div className="front">?</div>
      <div className="back">
        <img
          src={
            "https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" +
            framework +
            ".png"
          }
          alt={`$framework`}
        />
      </div>
    </div>
  );
}

export default Card;
