'use client';

import { useEffect, useState } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import styles from './IntroGame.module.css';

export default function IntroGame({ onOpen, language = 'fr' }) {
  const [folds, setFolds] = useState([]);
  const [takeoff, setTakeoff] = useState(false);
  const french = language === 'fr';
  const complete = folds.length === 3;
  const copy = french ? {
    eyebrow: 'L’ORIGAMI D’UNE IDÉE',
    title: <>Une idée prend forme,<br /><i>un univers s’ouvre.</i></>,
    intro: 'Trois facettes composent ma façon de créer. Plie chacune d’elles pour donner vie à mon univers.',
    instruction: 'Choisis un pli pour commencer',
    design: 'Design', code: 'Code', ai: 'IA',
    designNote: 'penser l’expérience', codeNote: 'construire avec soin', aiNote: 'imaginer la suite',
    progress: 'composition en cours', ready: 'l’origami est prêt',
    skip: 'Entrer directement', enter: 'Ouvrir le portfolio',
    bird: 'Riham Bouchiha · portfolio',
  } : {
    eyebrow: 'THE ORIGAMI OF AN IDEA',
    title: <>An idea takes shape,<br /><i>a world opens.</i></>,
    intro: 'Three facets shape the way I create. Fold each one to bring my world to life.',
    instruction: 'Choose a fold to begin',
    design: 'Design', code: 'Code', ai: 'AI',
    designNote: 'shape the experience', codeNote: 'build with care', aiNote: 'imagine what’s next',
    progress: 'composition in progress', ready: 'the origami is ready',
    skip: 'Enter directly', enter: 'Open portfolio',
    bird: 'Riham Bouchiha · portfolio',
  };

  const foldsData = [
    { id: 'design', label: copy.design, note: copy.designNote },
    { id: 'code', label: copy.code, note: copy.codeNote },
    { id: 'ai', label: copy.ai, note: copy.aiNote },
  ];

  const addFold = (id) => {
    if (complete || folds.includes(id)) return;
    const next = [...folds, id];
    setFolds(next);
    if (next.length === 3) window.setTimeout(() => setTakeoff(true), 850);
  };

  useEffect(() => {
    if (!takeoff) return undefined;
    const timer = window.setTimeout(onOpen, 3100);
    return () => window.clearTimeout(timer);
  }, [takeoff, onOpen]);

  return (
    <section className={styles.section}>
      <div className={styles.mesh} aria-hidden="true"><i /><i /><i /></div>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <span>{copy.intro}</span>
        </header>

        <div className={`${styles.stage} ${complete ? styles.complete : ''} ${takeoff ? styles.takeoff : ''}`}>
          <div className={styles.paperShadow} aria-hidden="true" />
          <div className={styles.paper}>
            <div className={styles.paperLines} aria-hidden="true"><i /><i /><i /><i /></div>
            <div className={styles.paperCore}><b>RB</b><span>DESIGN · CODE · AI</span></div>
            {foldsData.map((fold, index) => {
              const folded = folds.includes(fold.id);
              return <button key={fold.id} type="button" className={`${styles.fold} ${styles[`fold${index + 1}`]} ${folded ? styles.folded : ''}`} onClick={() => addFold(fold.id)} disabled={folded || complete}>
                <span className={styles.foldNumber}>{String(index + 1).padStart(2, '0')}</span>
                <strong>{folded ? <FiCheck /> : fold.label}</strong>
                <small>{folded ? fold.note : copy.instruction}</small>
              </button>;
            })}
          </div>
          <div className={styles.bird} aria-hidden="true">
            <i className={styles.wingLeft} /><i className={styles.wingRight} /><i className={styles.tail} /><b>RB</b>
          </div>
          <p className={styles.birdLabel}>{copy.bird}</p>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.skip} onClick={onOpen}>{copy.skip}<FiArrowRight /></button>
          <div className={styles.progress} aria-live="polite">
            <span>{complete ? copy.ready : copy.progress}</span>
            <i>{foldsData.map((fold) => <b key={fold.id} className={folds.includes(fold.id) ? styles.active : ''} />)}</i>
          </div>
          <button type="button" className={`${styles.enter} ${complete ? styles.visible : ''}`} onClick={onOpen}>{copy.enter}<FiArrowRight /></button>
        </footer>
      </div>
    </section>
  );
}
