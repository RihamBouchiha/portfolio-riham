'use client';

import { useEffect, useState } from 'react';

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getWinner(board) {
  const line = winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  return line ? board[line[0]] : null;
}

export default function IntroGame({ onOpen, language }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  const text = language === 'fr'
    ? {
        kicker: 'UN PETIT JEU AVANT D’ENTRER', title: 'Gagnez la partie,<br />ouvrez mon univers.',
        intro: 'Vous jouez avec les X. Trois symboles alignés et les portes du portfolio s’ouvrent.',
        yourTurn: 'À vous de jouer', computerTurn: 'L’ordinateur réfléchit…', win: 'Bravo, vous avez gagné !',
        lose: 'Presque ! Une autre partie ?', draw: 'Match nul — on recommence ?', retry: 'Rejouer', enter: 'Entrer dans le portfolio', skip: 'Passer le jeu',
      }
    : {
        kicker: 'A SMALL GAME BEFORE YOU ENTER', title: 'Win the game,<br />unlock my world.',
        intro: 'You play as X. Align three symbols and the doors to my portfolio will open.',
        yourTurn: 'Your turn', computerTurn: 'The computer is thinking…', win: 'You won — well played!',
        lose: 'So close! Another game?', draw: 'A draw — let’s try again?', retry: 'Play again', enter: 'Enter the portfolio', skip: 'Skip the game',
      };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  };

  const chooseCell = (index) => {
    if (board[index] || turn !== 'X' || winner) return;
    const nextBoard = [...board];
    nextBoard[index] = 'X';
    const result = getWinner(nextBoard);
    setBoard(nextBoard);
    if (result) {
      setWinner(result);
      return;
    }
    if (nextBoard.every(Boolean)) {
      setWinner('draw');
      return;
    }
    setTurn('O');
  };

  useEffect(() => {
    if (turn !== 'O' || winner) return undefined;
    const timer = window.setTimeout(() => {
      const emptyCells = board.map((cell, index) => (cell ? null : index)).filter((cell) => cell !== null);
      const choice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const nextBoard = [...board];
      nextBoard[choice] = 'O';
      const result = getWinner(nextBoard);
      setBoard(nextBoard);
      if (result) setWinner(result);
      else if (nextBoard.every(Boolean)) setWinner('draw');
      else setTurn('X');
    }, 560);
    return () => window.clearTimeout(timer);
  }, [board, turn, winner]);

  const status = winner === 'X' ? text.win : winner === 'O' ? text.lose : winner === 'draw' ? text.draw : turn === 'X' ? text.yourTurn : text.computerTurn;

  return (
    <section className="intro-game" aria-label="Portfolio introduction game">
      <div className="intro-orb intro-orb--one" aria-hidden="true" />
      <div className="intro-orb intro-orb--two" aria-hidden="true" />
      <div className="intro-game-shell">
        <div className="intro-copy">
          <p className="intro-kicker">{text.kicker}</p>
          <h1 dangerouslySetInnerHTML={{ __html: text.title }} />
          <p className="intro-description">{text.intro}</p>
          <button type="button" className="intro-skip" onClick={onOpen}>{text.skip} <span>→</span></button>
        </div>

        <div className="intro-game-card">
          <div className="intro-card-top"><span>RIHAM’S GAME</span><span>XO / 01</span></div>
          <div className="intro-board" aria-label="Tic tac toe board">
            {board.map((cell, index) => (
              <button type="button" key={index} className={`intro-cell ${cell ? `intro-cell--${cell.toLowerCase()}` : ''}`} onClick={() => chooseCell(index)} aria-label={`Cell ${index + 1}`}>
                {cell}
              </button>
            ))}
          </div>
          <p className={`intro-status ${winner === 'X' ? 'intro-status--win' : ''}`}>{status}</p>
          {winner && (
            <div className="intro-actions">
              {winner === 'X' ? <button type="button" className="intro-enter" onClick={onOpen}>{text.enter} <span>→</span></button> : <button type="button" className="intro-retry" onClick={resetGame}>{text.retry}</button>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
