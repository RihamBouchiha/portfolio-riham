'use client';

import { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiCode, FiFeather, FiHexagon } from 'react-icons/fi';
import styles from './IntroGame.module.css';

const artifacts = [
  { id: 'quill', x: 22, y: 34, Icon: FiFeather },
  { id: 'rune', x: 51, y: 64, Icon: FiCode },
  { id: 'orb', x: 81, y: 30, Icon: FiHexagon },
];

export default function IntroGame({ onOpen, language = 'fr' }) {
  const galleryRef = useRef(null);
  const [light, setLight] = useState({ x: 50, y: 74 });
  const [discovered, setDiscovered] = useState([]);
  const french = language === 'fr';
  const complete = discovered.length === artifacts.length;
  const copy = french ? {
    eyebrow: 'LA GALERIE ENCHANTÉE',
    title: <>Révèle les traces<br /><i>de mon univers.</i></>,
    intro: 'Une baguette de lumière, trois artefacts à retrouver et un passage vers mes créations.',
    hint: 'Déplace la lumière dans la galerie',
    skip: 'Passer le sort', open: 'Le passage s’ouvre…',
    quill: 'L’encre du design', rune: 'La logique du code', orb: 'L’étincelle de l’IA',
  } : {
    eyebrow: 'THE ENCHANTED GALLERY',
    title: <>Reveal the traces<br /><i>of my world.</i></>,
    intro: 'One wand of light, three artifacts to find and a passage into my work.',
    hint: 'Move the light through the gallery',
    skip: 'Skip the spell', open: 'The passage is opening…',
    quill: 'The ink of design', rune: 'The logic of code', orb: 'The spark of AI',
  };

  const explore = (event) => {
    const box = galleryRef.current?.getBoundingClientRect();
    if (!box || complete) return;
    const point = { x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 };
    setLight({ x: Math.max(0, Math.min(100, point.x)), y: Math.max(0, Math.min(100, point.y)) });
    artifacts.forEach((artifact) => {
      if (Math.hypot(point.x - artifact.x, point.y - artifact.y) < 12) {
        setDiscovered((current) => current.includes(artifact.id) ? current : [...current, artifact.id]);
      }
    });
  };
  useEffect(() => {
    if (!complete) return undefined;
    const timer = window.setTimeout(onOpen, 2700);
    return () => window.clearTimeout(timer);
  }, [complete, onOpen]);

  return <section className={styles.section}>
    <div className={styles.shell}>
      <header className={styles.header}><p>{copy.eyebrow}</p><h1>{copy.title}</h1><span>{copy.intro}</span></header>
      <div ref={galleryRef} className={`${styles.gallery} ${complete ? styles.complete : ''}`} onPointerMove={explore} onPointerDown={explore} style={{ '--light-x': `${light.x}%`, '--light-y': `${light.y}%` }}>
        <div className={styles.ceiling} aria-hidden="true"><i /><i /><i /><i /></div>
        <div className={styles.shelves} aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className={styles.arch} aria-hidden="true"><div /><span /></div>
        {artifacts.map(({ id, x, y, Icon }) => {
          const found = discovered.includes(id);
          return <div key={id} className={`${styles.artifact} ${styles[id]} ${found ? styles.discovered : ''}`} style={{ left: `${x}%`, top: `${y}%` }}>
            <div><Icon /></div><span>{copy[id]}</span>
          </div>;
        })}
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.wand} aria-hidden="true"><i /><b /></div>
        <div className={styles.spellHint}>{complete ? copy.open : <><i>{String(discovered.length).padStart(2, '0')}</i> {copy.hint}</>}</div>
        <div className={styles.portal} aria-hidden="true"><b>RB</b><span>RIHAM BOUCHIHA · PORTFOLIO</span></div>
      </div>
      <footer className={styles.footer}><button type="button" onClick={onOpen}>{copy.skip}<FiArrowRight /></button><span>{artifacts.map((item) => <i key={item.id} className={discovered.includes(item.id) ? styles.active : ''} />)}</span></footer>
    </div>
  </section>;
}
