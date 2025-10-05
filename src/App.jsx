import { useState} from 'react';
import './App.css';
import Card from './Card';

const icons = ["✦", "✴", "❖", "☽", "☀", "✺", "☯", "☾"];

function createDeck() {
  const base = [...icons, ...icons];
  const deck = [];

  for (let i = base.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }

  for (let i = 0; i < base.length; i++) {
    deck.push({
      key: i,
      symbol: base[i],
      isFlipped: false,
      isMatched: false,
    });
  }

  return deck;
}

function App() {
  const [cards, setCards] = useState(createDeck());

  function handleCardClick(clicked) {
  // ignore clicks on already flipped or matched cards
  if (clicked.isFlipped || clicked.isMatched) return;

  // flip the clicked card
  const updated = cards.map(card => {
    if (card.key === clicked.key) {
      return { ...card, isFlipped: true };
    }
    return card;
  });

  setCards(updated);
}


  return (
    <>
      <h1>Memory Light</h1>
      <div className="game">
        {cards.map((card) => (
          <Card key={card.key} card={card} onSelect={handleCardClick} />
        ))}
      </div>
    </>
  );
}

export default App;
