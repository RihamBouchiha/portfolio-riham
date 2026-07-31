'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './EducationSection.module.css';

export default function EducationSection({ language = 'fr' }) {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const french = language === 'fr';

  const educationData = [
    { school: "École Nationale de l'IA et du Digital", degree: french ? 'Cycle ingénieur — Génie informatique & Intelligence artificielle' : 'Engineering degree — Computer Science & Artificial Intelligence', year: '2024 — aujourd’hui', image: '/eniad.png', accent: '#cf778e', link: 'https://eniad.ump.ma/' },
    { school: 'École Supérieure de Technologie de Fès', degree: french ? 'DUT — Informatique' : 'DUT — Computer Science', year: '2022 — 2024', image: '/estf.png', accent: '#a77aa8', link: 'https://www.est-usmba.ac.ma/' },
    { school: 'Faculté de Médecine de Strasbourg', degree: french ? 'L1 SPS — Spécialité Physique' : 'L1 SPS — Physics specialisation', year: '2021 — 2022', image: '/image.png', accent: '#d7a467', link: 'https://med.unistra.fr/' },
    { school: 'Université de Strasbourg', degree: french ? 'L1 — Spécialité Physique' : 'L1 — Physics specialisation', year: '2021 — 2022', image: '/unistra.png', accent: '#6e9eb4', link: 'https://www.unistra.fr/fr' },
    { school: 'Lycée Abi Abass Sebti', degree: french ? 'Baccalauréat — Sciences Physiques' : 'Baccalaureate — Physical Sciences', year: '2020 — 2021', image: '/lycee.png', accent: '#c68470', link: '#' },
  ];

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('[data-education-index]') ?? [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.educationIndex);
          setVisibleItems((current) => current.includes(index) ? current : [...current, index]);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <section id="education" ref={sectionRef} className={styles.section}>
    <div className={styles.shell}>
      <header className={styles.header}>
        <p>✦ &nbsp; ACADEMIC CONSTELLATION &nbsp; ✦</p>
        <h2>{french ? <>Mon parcours,<br /><i>en constellation.</i></> : <>My journey,<br /><i>in constellations.</i></>}</h2>
        <span>{french ? 'Chaque étape a façonné la personne et l’ingénieure que je deviens.' : 'Every chapter has shaped both the person and engineer I am becoming.'}</span>
      </header>

      <div className={styles.timeline}>
        {educationData.map((item, index) => <article key={item.school} data-education-index={index} className={`${styles.item} ${index % 2 ? styles.right : styles.left} ${visibleItems.includes(index) ? styles.visible : ''}`} style={{ '--accent': item.accent }}>
          <span className={styles.node}><b>0{index + 1}</b></span>
          <a href={item.link} target={item.link === '#' ? undefined : '_blank'} rel={item.link === '#' ? undefined : 'noreferrer'} className={styles.card}>
            <div className={styles.photo}><img src={item.image} alt={item.school} /></div>
            <div className={styles.copy}><span>{item.year}</span><h3>{item.school}</h3><p>{item.degree}</p><em>{french ? 'Découvrir l’établissement ↗' : 'Discover the school ↗'}</em></div>
          </a>
        </article>)}
      </div>
    </div>
  </section>;
}
