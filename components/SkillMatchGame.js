'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './SkillMatchGame.module.css';
import softStyles from './SoftSkillsNormal.module.css';

function playGameSound(notes) {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const now = context.currentTime;
    notes.forEach(({ frequency, start, duration, type = 'sine', volume = 0.08 }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now + start);
      gain.gain.setValueAtTime(0.001, now + start);
      gain.gain.exponentialRampToValueAtTime(volume, now + start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + start);
      oscillator.stop(now + start + duration + 0.03);
    });
    window.setTimeout(() => context.close(), 1000);
  } catch { /* Audio is optional. */ }
}

export default function SkillMatchGame({ language, hardSkills, technologyColors }) {
  const french = language === 'fr';
  const [world, setWorld] = useState('hard');
  const [level, setLevel] = useState('Languages');
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const softSkills = french
    ? [['Résolution de problèmes', 'Transformer la complexité en solutions concrètes.'], ['Créativité', 'Imaginer des expériences utiles qui marquent.'], ['Communication', 'Rendre les idées claires et accessibles.'], ['Esprit d’équipe', 'Construire avec écoute, confiance et partage.'], ['Adaptabilité', 'Apprendre vite et évoluer avec le contexte.'], ['Curiosité', 'Explorer sans cesse les outils et les idées.']]
    : [['Problem solving', 'Turning complexity into concrete solutions.'], ['Creativity', 'Imagining useful experiences that leave a mark.'], ['Communication', 'Making ideas clear and accessible.'], ['Team spirit', 'Building through trust and active listening.'], ['Adaptability', 'Learning fast and evolving with context.'], ['Curiosity', 'Continuously exploring tools and ideas.']];

  const items = world === 'hard' ? hardSkills[level].slice(0, 6) : softSkills.map(([name, detail]) => ({ name, detail }));
  const cards = useMemo(() => items.flatMap((item, index) => {
    const key = `${world}-${level}-${index}`;
    if (world === 'hard') return [
      { id: `${key}-logo`, key, type: 'logo', content: item.icon, name: item.name, color: technologyColors[item.name] },
      { id: `${key}-name`, key, type: 'name', content: item.name, name: item.name },
    ];
    return [
      { id: `${key}-title`, key, type: 'title', content: item.name, name: item.name },
      { id: `${key}-detail`, key, type: 'detail', content: item.detail, name: item.name },
    ];
  }), [items, level, technologyColors, world]);

  useEffect(() => { setFlipped([]); setMatched([]); setMoves(0); }, [world, level]);

  const play = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.key)) return;
    playGameSound([
      { frequency: 660, start: 0, duration: 0.09, type: 'triangle', volume: 0.07 },
      { frequency: 880, start: 0.055, duration: 0.12, type: 'sine', volume: 0.055 },
    ]);
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((value) => value + 1);
      const first = cards.find((item) => item.id === next[0]);
      const second = cards.find((item) => item.id === next[1]);
      if (first.key === second.key) {
        setMatched((value) => [...value, first.key]);
        playGameSound([{ frequency: 784, start: 0, duration: 0.12, type: 'triangle', volume: 0.09 }]);
        if (matched.length + 1 === items.length) window.setTimeout(() => playGameSound([
          { frequency: 523.25, start: 0, duration: 0.18, type: 'triangle', volume: 0.1 },
          { frequency: 659.25, start: 0.13, duration: 0.18, type: 'triangle', volume: 0.1 },
          { frequency: 783.99, start: 0.26, duration: 0.22, type: 'triangle', volume: 0.1 },
          { frequency: 1046.5, start: 0.42, duration: 0.42, type: 'sine', volume: 0.12 },
        ]), 180);
        setTimeout(() => setFlipped([]), 350);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const completed = matched.length === items.length;
  const labels = { hard: french ? 'Hard skills' : 'Hard skills', soft: french ? 'Soft skills' : 'Soft skills' };

  if (world === 'soft') return <section id="skills" className={softStyles.section}>
    <div className={softStyles.shell}>
      <header className={softStyles.header}><p>RIHAM’S SOFT SKILLS</p><h2>{french ? 'Mes forces<br /><i>au quotidien.</i>' : 'My strengths<br /><i>every day.</i>'}</h2><p>{french ? 'Les qualités qui accompagnent ma manière de créer, apprendre et collaborer.' : 'The strengths that support the way I create, learn and collaborate.'}</p></header>
      <div className={softStyles.tabs}><button type="button" onClick={() => setWorld('hard')}>⌘ {labels.hard}</button><button type="button" aria-current="page">♡ {labels.soft}</button></div>
      <div className={softStyles.grid}>{softSkills.map(([name, detail], index) => <article className={softStyles.card} key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{detail}</p><i>✦</i></article>)}</div>
    </div>
  </section>;

  return <section id="skills" className={styles.game}>
    <div className={styles.shell}>
      <header className={styles.header}><div><p>SKILL MEMORY GAME</p><h2>{french ? <>Associe, mémorise,<br /><i>gagne le niveau.</i></> : <>Match, remember,<br /><i>win the level.</i></>}</h2></div><div className={styles.counter}><span>MOVES</span><strong>{String(moves).padStart(2, '0')}</strong><small>{matched.length} / {items.length} PAIRS</small></div></header>
      <div className={styles.worlds} role="tablist"><button type="button" role="tab" aria-selected={world === 'hard'} onClick={() => setWorld('hard')}><span>⌘</span>{labels.hard}</button><button type="button" role="tab" aria-selected={world === 'soft'} onClick={() => setWorld('soft')}><span>♡</span>{labels.soft}</button></div>
      {world === 'hard' && <nav className={styles.levels}>{Object.keys(hardSkills).map((tab, index) => <button key={tab} type="button" onClick={() => setLevel(tab)} aria-current={level === tab}><span>0{index + 1}</span>{french ? ({ Languages: 'Langages', Frameworks: 'Frameworks', Databases: 'Bases de données', Tools: 'Outils', DevOps: 'DevOps', AI: 'Intelligence artificielle' }[tab]) : tab}</button>)}</nav>}
      <div className={styles.boardWrap}><div className={styles.boardHeader}><span>{world === 'hard' ? (french ? 'Associe les logos à leur technologie' : 'Match logos with technologies') : (french ? 'Associe chaque qualité à sa définition' : 'Match each quality with its definition')}</span><span>✦</span></div><div className={styles.board}>{cards.map((card) => { const open = flipped.includes(card.id) || matched.includes(card.key); return <button type="button" key={card.id} className={`${styles.card} ${open ? styles.open : ''} ${matched.includes(card.key) ? styles.pair : ''}`} onClick={() => play(card)}><span className={styles.cardBack}>✦</span><span className={styles.cardFace}>{card.type === 'logo' ? <i style={{ color: card.color }}>{card.content}</i> : <strong>{card.content}</strong>}</span></button>; })}</div>{completed && <div className={styles.win}><span>✦</span><div><strong>{french ? 'Niveau complété !' : 'Level completed!'}</strong><p>{french ? 'Tu as trouvé toutes les paires.' : 'You found every pair.'}</p></div><button type="button" onClick={() => { setFlipped([]); setMatched([]); setMoves(0); }}>{french ? 'Rejouer' : 'Play again'}</button></div>}</div>
    </div>
  </section>;
}
