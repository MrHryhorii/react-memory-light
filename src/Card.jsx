import React from 'react'

const Card = ({ card, onSelect }) => {
  // show symbol if flipped or matched
  const isVisible = card.isFlipped || card.isMatched;

  return (
    <div className="card" onClick={() => onSelect(card)}>
      <div className="symbol">{card.symbol}</div>
      {!isVisible && <div className="cover">?</div>}
    </div>
  );
}

export default Card