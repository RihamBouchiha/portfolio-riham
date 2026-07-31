'use client';

import { useState } from 'react';
import { FiArrowRight, FiCode, FiCpu, FiPenTool } from 'react-icons/fi';
import styles from './IntroGame.module.css';

export default function IntroGame({ onOpen, language = 'fr' }) {
  const [fed, setFed] = useState([]);
  const french = language === 'fr';
  const copy = french ? {
    eyebrow: 'LE JARDIN DES IDÉES', title: <>Fais éclore<br /><i>mon univers.</i></>, intro: 'Chaque produit commence par une idée. Nourris cette tulipe avec les trois forces qui guident mon travail.', skip: 'Passer le jardin', instruction: 'Choisis une goutte à offrir', growing: 'La tulipe grandit…', bloom: 'LA TULIPE FLEURIT', open: 'Entrer dans le portfolio',
  } : {
    eyebrow: 'THE IDEA GARDEN', title: <>Help my world<br /><i>bloom.</i></>, intro: 'Every product starts with an idea. Feed this tulip with the three strengths that guide my work.', skip: 'Skip the garden', instruction: 'Choose a drop to offer', growing: 'The tulip is growing…', bloom: 'THE TULIP IS BLOOMING', open: 'Enter the portfolio',
  };
  const nutrients = [
    { id: 'design', label: 'DESIGN', title: french ? 'Imaginer' : 'Imagine', icon: <FiPenTool /> },
    { id: 'code', label: 'CODE', title: french ? 'Construire' : 'Build', icon: <FiCode /> },
    { id: 'ai', label: 'AI', title: french ? 'Évoluer' : 'Evolve', icon: <FiCpu /> },
  ];
  const bloomed = fed.length === nutrients.length;
  const nourish = (id) => { if (!fed.includes(id)) setFed((current) => [...current, id]); };

  return <section className={styles.section}><div className={styles.sun} aria-hidden="true" /><div className={styles.shell}><div className={styles.copy}><p>{copy.eyebrow}</p><h1>{copy.title}</h1><span>{copy.intro}</span><button type="button" onClick={onOpen}>{copy.skip}<FiArrowRight /></button></div><div className={styles.garden}><div className={styles.gardenTop}><span>RIHAM’S GARDEN</span><b>{String(fed.length).padStart(2, '0')} / 03</b></div><div className={`${styles.scene} ${bloomed ? styles.bloomed : ''}`}><div className={styles.sparkles} aria-hidden="true"><i /><i /><i /><i /></div><div className={styles.tulip}><div className={styles.bloom}><i className={styles.petalOne} /><i className={styles.petalTwo} /><i className={styles.petalThree} /><i className={styles.petalFour} /><i className={styles.petalFive} /></div><div className={styles.stem}><i className={styles.leafLeft} /><i className={styles.leafRight} /></div><div className={styles.pot}><i /></div></div><p>{bloomed ? copy.bloom : copy.growing}</p></div><div className={styles.nutrients}><span>{copy.instruction}</span><div>{nutrients.map((nutrient) => { const active = fed.includes(nutrient.id); return <button type="button" key={nutrient.id} onClick={() => nourish(nutrient.id)} className={active ? styles.nutrientActive : ''} aria-pressed={active}><i>{nutrient.icon}</i><small>{nutrient.label}</small><strong>{nutrient.title}</strong></button>; })}</div></div>{bloomed && <button type="button" className={styles.open} onClick={onOpen}>{copy.open}<FiArrowRight /></button>}</div></div></section>;
}
