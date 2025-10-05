import { useState, useEffect} from 'react';
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
  const [flipped, setFlipped] = useState([]);
  const [turns, setTurns] = useState(0);
  const [win, setWin] = useState(false);

  function handleCardClick(clicked) {
    if (win) return;
    // ignore clicks on already flipped or matched cards
    if (clicked.isFlipped || clicked.isMatched) return;

    if (flipped.length === 2) return;

    // flip the clicked card
    const updated = cards.map(card => {
      if (card.key === clicked.key) {
        return { ...card, isFlipped: true };
      }
      return card;
    });

    setCards(updated);

    // List of flipped cards
    const newFlipped = [...flipped, clicked];
    setFlipped([...flipped, clicked]);

      // check if we have two open
      if (newFlipped.length === 2) {
        setTurns(t => t + 1);

        const [a, b] = newFlipped;

        if (a.symbol === b.symbol) {
          // match found
          const matched = updated.map(c =>
            c.key === a.key || c.key === b.key
              ? { ...c, isMatched: true }
              : c
          );
          setCards(matched);
          setFlipped([]);
        } else {
          // not a match: flip back after delay
          setTimeout(() => {
            const reverted = updated.map(c =>
              c.key === a.key || c.key === b.key
                ? { ...c, isFlipped: false }
                : c
            );
            setCards(reverted);
            setFlipped([]);
          }, 800);
        }
      }
    }

  useEffect(() => {
    if (cards.every(c => c.isMatched)) setWin(true);
  }, [cards]);

  function restart() {
    setCards(createDeck());
    setFlipped([]);
    setTurns(0);
    setWin(false);
  }


  return (
    <>
      <h1>Memory Light</h1>

      <div className="controls">
        <button onClick={restart}>New Game</button>
        <p>Turns: {turns}</p>
      </div>

      {win ? <p className="win">You did it in {turns} moves</p> : null}

      <div className="game">
        {cards.map(card => (
          <Card key={card.key} card={card} onSelect={handleCardClick} />
        ))}
      </div>
    </>
  );
}

export default App;
