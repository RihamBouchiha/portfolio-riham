'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import styles from './PortfolioPlayground.module.css';

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const winnerOf = (board) => winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c])?.map(String).join('-') || null;

function tacticalMove(board, symbol) {
  for (const line of winningLines) {
    const empty = line.filter((index) => !board[index]);
    if (empty.length === 1 && line.filter((index) => board[index] === symbol).length === 2) return empty[0];
  }
  return null;
}

function studioMove(board, givePlayerAnOpening = false) {
  const win = tacticalMove(board, 'O');
  if (win !== null) return win;
  const block = tacticalMove(board, 'X');
  if (block !== null && !givePlayerAnOpening) return block;

  const available = board.map((cell, index) => cell ? null : index).filter((index) => index !== null && index !== block);
  if (givePlayerAnOpening && available.length) {
    const strategicAlternatives = available.filter((index) => index === 4 || [0, 2, 6, 8].includes(index));
    const choices = strategicAlternatives.length ? strategicAlternatives : available;
    return choices[Math.floor(Math.random() * choices.length)];
  }
  if (!board[4]) return 4;

  const corners = [0, 2, 6, 8].filter((index) => !board[index]);
  const edges = [1, 3, 5, 7].filter((index) => !board[index]);
  const options = corners.length ? corners : edges;
  return options[Math.floor(Math.random() * options.length)];
}

export default function PortfolioPlayground({ language = 'fr' }) {
  const french = language === 'fr';
  const copy = french ? {
    eyebrow: 'INTERLUDE CRÉATIF', title: <>Une petite partie<br /><i>avant la suite.</i></>, intro: 'Parce qu’un portfolio peut aussi laisser une place au jeu. Tu joues X, l’atelier joue O.', you: 'Toi · X', studio: 'Atelier · O', turn: 'À toi de jouer.', thinking: 'L’atelier réfléchit…', won: 'Bien joué — tu as gagné !', lost: 'Cette manche est pour l’atelier.', draw: 'Égalité parfaite.', reveal: 'Un bon produit commence toujours par une idée, puis une première interaction.', reset: 'Nouvelle partie', hint: 'Aligne 3 symboles pour gagner.',
  } : {
    eyebrow: 'CREATIVE INTERLUDE', title: <>A quick game<br /><i>before the next chapter.</i></>, intro: 'Because a portfolio can leave room for play, too. You play X; the studio plays O.', you: 'You · X', studio: 'Studio · O', turn: 'Your move.', thinking: 'The studio is thinking…', won: 'Well played — you won!', lost: 'This round belongs to the studio.', draw: 'A perfect draw.', reveal: 'Every good product starts with an idea, then a first interaction.', reset: 'Play again', hint: 'Align 3 symbols to win.',
  };
  const [board, setBoard] = useState(Array(9).fill(''));
  const [state, setState] = useState('playing');
  const [thinking, setThinking] = useState(false);
  const moveTimer = useRef(null);
  const openingGiven = useRef(false);
  const preservedScrollY = useRef(null);
  const line = winnerOf(board);

  useEffect(() => () => window.clearTimeout(moveTimer.current), []);

  const preserveMobileScroll = () => {
    if (window.matchMedia('(max-width: 760px)').matches) preservedScrollY.current = window.scrollY;
  };

  useLayoutEffect(() => {
    if (preservedScrollY.current === null) return;
    window.scrollTo(0, preservedScrollY.current);
    preservedScrollY.current = null;
  }, [board, state, thinking]);

  const reset = () => {
    window.clearTimeout(moveTimer.current);
    setBoard(Array(9).fill(''));
    setState('playing');
    setThinking(false);
    openingGiven.current = false;
  };

  const play = (index) => {
    if (board[index] || state !== 'playing' || thinking) return;
    preserveMobileScroll();
    const next = [...board];
    next[index] = 'X';
    const playerLine = winnerOf(next);
    setBoard(next);
    if (playerLine) { setState('won'); return; }
    if (next.every(Boolean)) { setState('draw'); return; }

    setThinking(true);
    moveTimer.current = window.setTimeout(() => {
      preserveMobileScroll();
      setBoard((current) => {
        const blockingMove = tacticalMove(current, 'X');
        const offerOpening = !openingGiven.current && blockingMove !== null && Math.random() < 0.62;
        const selected = studioMove(current, offerOpening);
        if (offerOpening && selected !== blockingMove) openingGiven.current = true;
        const computerBoard = [...current];
        computerBoard[selected] = 'O';
        if (winnerOf(computerBoard)) setState('lost');
        else if (computerBoard.every(Boolean)) setState('draw');
        setThinking(false);
        return computerBoard;
      });
    }, 520);
  };

  const status = thinking ? copy.thinking : state === 'won' ? copy.won : state === 'lost' ? copy.lost : state === 'draw' ? copy.draw : copy.turn;

  return (
    <section id="play" className={styles.section}>
      <div className={styles.orbit} aria-hidden="true"><i /><i /><i /></div>
      <div className={styles.shell}>
        <div className={styles.copy}>
          <p>{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <span>{copy.intro}</span>
          <div className={styles.legend}><b><i className={styles.x}>X</i>{copy.you}</b><b><i className={styles.o}>O</i>{copy.studio}</b></div>
          <small>{copy.hint}</small>
        </div>
        <div className={styles.game}>
          <div className={styles.board} aria-label="Tic tac toe">
            {board.map((cell, index) => <button key={index} type="button" onClick={() => play(index)} disabled={Boolean(cell) || state !== 'playing' || thinking} className={`${cell === 'X' ? styles.cross : cell === 'O' ? styles.circle : ''} ${line?.includes(String(index)) ? styles.winning : ''}`} aria-label={`Case ${index + 1}`}>{cell}</button>)}
          </div>
          <div className={styles.status}><span className={state === 'won' ? styles.success : ''}>{status}</span>{state !== 'playing' && <button type="button" onClick={reset}><FiRefreshCw />{copy.reset}</button>}</div>
          <p className={`${styles.reveal} ${state === 'won' ? styles.revealVisible : styles.revealHidden}`}>✦ {copy.reveal}</p>
        </div>
      </div>
    </section>
  );
}
