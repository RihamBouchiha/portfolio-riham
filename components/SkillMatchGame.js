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
  const [flippedSoft, setFlippedSoft] = useState([]);
  const [certificateOpen, setCertificateOpen] = useState(null);

  const softSkills = french
    ? [['Résolution de problèmes', 'Transformer la complexité en solutions concrètes.'], ['Créativité', 'Imaginer des expériences utiles qui marquent.'], ['Communication', 'Rendre les idées claires et accessibles.'], ['Esprit d’équipe', 'Construire avec écoute, confiance et partage.'], ['Leadership & organisation', 'Coordonner un événement et donner de l’énergie à une équipe.'], ['Public Speaking', 'Prendre la parole avec clarté, confiance et impact.']]
    : [['Problem solving', 'Turning complexity into concrete solutions.'], ['Creativity', 'Imagining useful experiences that leave a mark.'], ['Communication', 'Making ideas clear and accessible.'], ['Team spirit', 'Building through trust and active listening.'], ['Leadership & organisation', 'Coordinating an event and energising a team.'], ['Public Speaking', 'Speaking with clarity, confidence and impact.']];

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

  useEffect(() => {
    if (world !== 'soft') return undefined;
    const timer = window.setTimeout(() => {
      const episodeLinks = document.querySelectorAll('a[href*="youtu.be"]');
      if (episodeLinks.length < 2) return;
      episodeLinks[0].href = 'https://youtu.be/pXS3U1E4-MU?si=NmikOL9Dm-xvia__';
      episodeLinks[1].href = 'https://youtu.be/wXkBrFJWra8?si=X5_SYMJYMktN_J9d';
    }, 0);
    return () => window.clearTimeout(timer);
  }, [world]);

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
  const handleSoftCard = (name, certificate) => {
    setFlippedSoft((cards) => cards.includes(name) ? cards.filter((card) => card !== name) : [...cards, name]);
    if (certificate) setCertificateOpen(certificate);
  };

  if (world === 'hard') return <section id="skills" className={styles.catalog}>
    <div className={styles.shell}>
      <header className={styles.header}><div><p>TECH TOOLKIT</p><h2>{french ? <>Mes outils,<br /><i>en pratique.</i></> : <>My toolkit,<br /><i>in practice.</i></>}</h2></div><div className={styles.counter}><span>COLLECTION</span><strong>{String(hardSkills[level].length).padStart(2, '0')}</strong><small>{french ? 'TECHNOLOGIES' : 'TECHNOLOGIES'}</small></div></header>
      <div className={styles.worlds} role="tablist"><button type="button" role="tab" aria-selected="true"><span>⌘</span>{labels.hard}</button><button type="button" role="tab" aria-selected="false" onClick={() => setWorld('soft')}><span>♡</span>{labels.soft}</button></div>
      <nav className={styles.levels}>{Object.keys(hardSkills).map((tab, index) => <button key={tab} type="button" onClick={() => setLevel(tab)} aria-current={level === tab}><span>0{index + 1}</span>{french ? ({ Languages: 'Langages', Frameworks: 'Frameworks & bibliothèques', Databases: 'Bases de données', Tools: 'Outils', DevOps: 'DevOps', AI: 'Intelligence artificielle' }[tab]) : ({ Frameworks: 'Frameworks & libraries' }[tab] || tab)}</button>)}</nav>
      <div className={styles.catalogPanel}><div className={styles.catalogHeading}><span>{french ? 'COLLECTION ACTIVE' : 'ACTIVE COLLECTION'}</span><h3>{french ? ({ Languages: 'Langages', Frameworks: 'Frameworks & bibliothèques', Databases: 'Bases de données', Tools: 'Outils', DevOps: 'DevOps', AI: 'Intelligence artificielle' }[level]) : ({ Frameworks: 'Frameworks & libraries' }[level] || level)}</h3><p>{french ? 'Une sélection de technologies que j’utilise et explore au fil de mes projets.' : 'A selection of technologies I use and explore through my projects.'}</p></div><div className={styles.catalogGrid}>{hardSkills[level].map((item, index) => <article key={item.name} className={styles.techCard} style={{ '--tech-color': technologyColors[item.name] || '#b85f77', '--order': index }}><span className={styles.techIndex}>{String(index + 1).padStart(2, '0')}</span><i>{item.icon}</i><strong>{item.name}</strong><small>{french ? 'Dans mon toolkit' : 'In my toolkit'}</small></article>)}</div></div>
    </div>
  </section>;

  if (world === 'soft') return <section id="skills" className={softStyles.section}>
    <div className={softStyles.shell}>
      <header className={softStyles.header}><p>RIHAM’S SOFT SKILLS</p><h2>{french ? <>Mes forces<br /><i>au quotidien.</i></> : <>My strengths<br /><i>every day.</i></>}</h2><p>{french ? 'Les qualités qui accompagnent ma manière de créer, apprendre et collaborer.' : 'The strengths that support the way I create, learn and collaborate.'}</p></header>
      <div className={softStyles.tabs}><button type="button" onClick={() => setWorld('hard')}>⌘ {labels.hard}</button><button type="button" aria-current="page">♡ {labels.soft}</button></div>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '78px 1fr', alignItems: 'center', gap: '1.15rem', maxWidth: '820px', margin: '0 0 1.45rem', padding: '1.2rem 1.4rem', overflow: 'hidden', border: '1px solid rgba(182,91,114,.23)', borderRadius: '22px', background: 'linear-gradient(120deg, rgba(255,253,253,.95), rgba(249,225,232,.78))', boxShadow: '0 14px 28px rgba(120,65,84,.1)' }}><span style={{ display: 'grid', placeItems: 'center', width: '68px', height: '68px', borderRadius: '22px 22px 22px 4px', background: 'linear-gradient(145deg, #c26a80, #9f5167)', color: '#fff', fontSize: '1.8rem', boxShadow: '6px 6px 0 #edc8d2' }}>✦</span><div><span style={{ display: 'block', marginBottom: '.3rem', color: '#af6478', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.14em' }}>PROOF FILE — 01</span><strong style={{ display: 'block', color: '#512f3b', fontSize: 'clamp(1.15rem, 2.3vw, 1.55rem)', fontFamily: 'Georgia, serif' }}>{french ? 'Des compétences, avec des preuves.' : 'Skills, with real proof.'}</strong><p style={{ maxWidth: '600px', margin: '.5rem 0 0', color: '#6f535e', fontSize: 'clamp(.9rem, 1.5vw, 1rem)', lineHeight: 1.65 }}>{french ? 'Retourne les cartes marquées pour découvrir les certificats, réalisations et moments qui racontent mon parcours.' : 'Flip marked cards to discover the certificates, projects and moments behind my skills.'}</p><span style={{ display: 'inline-block', marginTop: '.7rem', color: '#b36379', fontSize: '.8rem', fontWeight: 700 }}>{french ? 'Clique, retourne, découvre' : 'Click, flip, discover'}</span></div><span aria-hidden="true" style={{ position: 'absolute', right: '-12px', top: '-15px', color: 'rgba(187,99,121,.13)', fontSize: '6rem', transform: 'rotate(16deg)' }}>♡</span></div>
      <div className={softStyles.grid}>{softSkills.map(([name, detail], index) => { const isFlipped = flippedSoft.includes(name); const certificate = index === 0 ? { src: '/problem-solving-certificate.jpg', label: french ? '6ᵉ place sur 45 équipes — ESISA Senior Developers Hackathon 2025' : '6th place out of 45 teams — ESISA Senior Developers Hackathon 2025' } : name === 'Créativité' || name === 'Creativity' ? { gallery: [{ src: '/creative-spa.png', title: 'RHK Spa — affiche' }, { src: '/spa.png', title: 'RHK Spa — visuel' }, { src: '/spa2.png', title: 'RHK Spa — identité visuelle' }, { src: '/sok.png', title: 'SOK' }, { src: '/innov.png', title: 'InnoVerse' }, { src: '/creative-gusto.png', title: 'Gusto RH' }, { src: '/creative-mother-day.png', title: 'Mother’s Day' }, { src: '/creative-r2ao.png', title: 'R2AO' }], label: french ? 'Galerie créative — branding, affiche et supports visuels' : 'Creative gallery — branding, posters and visual assets' } : name === 'Public Speaking' ? { src: '/public-speeking.jpg', label: french ? '2ᵉ place — Public Speaking' : '2nd place — Public Speaking' } : name === 'Esprit d’équipe' || name === 'Team spirit' ? { src: '/ess.jpg', label: french ? 'Participation — Hackathon « OrientalHack 1.0 », ENCG Oujda' : 'Participation — OrientalHack 1.0 Hackathon, ENCG Oujda' } : name === 'Leadership & organisation' ? { src: '/orga.jpg', label: french ? 'Certificat d’organisation — Tech Connect, InnoVerse (nov. 2025)' : 'Organisation certificate — Tech Connect, InnoVerse (Nov. 2025)' } : null; const preview = certificate?.src || certificate?.gallery?.[0]?.src; return <button type="button" className={`${softStyles.card} ${isFlipped ? softStyles.flipped : ''}`} key={name} onClick={() => handleSoftCard(name, certificate)}><span className={softStyles.cardInner}><span className={softStyles.cardFront}><span>0{index + 1}</span><h3>{name}</h3><p>{detail}</p><i>✦</i></span><span className={softStyles.cardBack}>{certificate ? <><img src={preview} alt={certificate.label} style={{ width: '100%', height: '112px', objectFit: 'cover', borderRadius: '10px', background: '#fff' }} /><strong style={{ fontSize: '.76rem' }}>{certificate.label}</strong></> : <><b>✦</b><strong>{french ? 'Certificat à ajouter' : 'Certificate to add'}</strong><small>{french ? 'Clique pour revenir' : 'Click to return'}</small></>}</span></span></button>; })}</div>
      <aside style={{ position: 'relative', marginTop: 'clamp(1.4rem, 3vw, 2.5rem)', padding: 'clamp(1.2rem, 3.5vw, 2.1rem)', overflow: 'hidden', borderRadius: '22px', background: 'linear-gradient(125deg, #3e2534, #764154 58%, #b76178)', color: '#fff8f7', boxShadow: '0 18px 36px rgba(96,47,67,.22)' }}><span aria-hidden="true" style={{ position: 'absolute', top: '-1.5rem', right: '1rem', color: 'rgba(255,255,255,.1)', fontSize: '8rem', lineHeight: 1 }}>✦</span><p style={{ position: 'relative', margin: 0, color: '#ffd9e0', fontSize: '.7rem', fontWeight: 800, letterSpacing: '.16em' }}>COMMUNICATION — ON AIR</p><h3 style={{ position: 'relative', maxWidth: '720px', margin: '.55rem 0 .65rem', fontFamily: 'Georgia, serif', fontSize: 'clamp(1.35rem, 3vw, 2.1rem)', lineHeight: 1.15 }}>La voix d’InnoVerse, sur scène comme à l’écran.</h3><p style={{ position: 'relative', maxWidth: '720px', margin: 0, color: 'rgba(255,248,247,.88)', lineHeight: 1.65 }}>Responsable communication du club InnoVerse, animatrice principale d’Innov Talks et animatrice de Tech Connect ainsi que d’EnigmaVerse.</p><div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '.7rem', marginTop: '1.1rem' }}><a href="https://youtu.be/wXkBrFJWra8?si=X5_SYMJYMktN_J9d" target="_blank" rel="noreferrer" style={{ padding: '.68rem .95rem', borderRadius: '999px', background: '#fff8f7', color: '#6e3850', fontSize: '.86rem', fontWeight: 800, textDecoration: 'none' }}>Innov Talks — épisode 01</a><a href="https://youtu.be/pXS3U1E4-MU?si=NmikOL9Dm-xvia__" target="_blank" rel="noreferrer" style={{ padding: '.68rem .95rem', border: '1px solid rgba(255,255,255,.55)', borderRadius: '999px', color: '#fff', fontSize: '.86rem', fontWeight: 800, textDecoration: 'none' }}>Innov Talks — épisode 02</a></div></aside>
      {certificateOpen && <div role="dialog" aria-modal="true" aria-label="Certificate" onClick={() => setCertificateOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'grid', placeItems: 'center', padding: '1.25rem', background: 'rgba(42, 23, 33, .78)', backdropFilter: 'blur(9px)' }}><div onClick={(event) => event.stopPropagation()} style={{ position: 'relative', width: 'min(1000px, 100%)', maxHeight: '90vh', overflow: 'auto', padding: 'clamp(1.2rem, 4vw, 2.6rem)', borderRadius: '10px', background: 'linear-gradient(135deg, #f9f0e5, #efe0ca)', boxShadow: '0 30px 80px rgba(0,0,0,.35), inset 0 0 0 8px rgba(130,83,61,.08)' }}><button type="button" onClick={() => setCertificateOpen(null)} aria-label="Close certificate" style={{ position: 'absolute', zIndex: 2, top: '10px', right: '10px', display: 'grid', placeItems: 'center', width: '40px', height: '40px', border: '0', borderRadius: '50%', background: '#815343', color: '#fff', cursor: 'pointer', fontSize: '1.3rem' }}>×</button>{certificateOpen.gallery ? <><div style={{ marginBottom: '1.2rem', color: '#714433', fontFamily: 'Georgia, serif', fontSize: 'clamp(1.45rem, 3vw, 2.15rem)', fontStyle: 'italic' }}>Creative scrapbook <span style={{ color: '#b7677a' }}>✦</span></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'clamp(1rem, 3vw, 2rem)', padding: 'clamp(.5rem, 2vw, 1.3rem)', background: 'rgba(255,255,255,.24)', boxShadow: 'inset 0 0 0 1px rgba(112,68,48,.12)' }}>{certificateOpen.gallery.map((item, index) => <figure key={item.src} style={{ margin: 0, padding: 'clamp(.45rem, 1.5vw, .8rem)', background: '#fffdf9', boxShadow: '0 10px 19px rgba(83,49,35,.2)', transform: `rotate(${index % 2 === 0 ? -2.2 : 2.2}deg) translateY(${index % 2 === 0 ? 0 : 8}px)` }}><img src={item.src} alt={item.title} style={{ display: 'block', width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', filter: 'saturate(.95) contrast(.98)' }} /><figcaption style={{ padding: '.55rem .15rem .05rem', color: '#754837', fontFamily: 'Georgia, serif', fontSize: 'clamp(.82rem, 1.5vw, 1rem)', fontStyle: 'italic' }}>{item.title}</figcaption></figure>)}</div></> : <img src={certificateOpen.src} alt={certificateOpen.label} style={{ display: 'block', width: '100%', maxHeight: 'calc(90vh - 2rem)', objectFit: 'contain', borderRadius: '13px' }} />}<p style={{ margin: '1rem 0 0', color: '#8f5063', textAlign: 'center', fontWeight: 700 }}>{certificateOpen.label}</p></div></div>}
    </div>
  </section>;

  return <section id="skills" className={styles.game}>
    <div className={styles.shell}>
      <header className={styles.header}><div><p>SKILL MEMORY GAME</p><h2>{french ? <>Associe, mémorise,<br /><i>gagne le niveau.</i></> : <>Match, remember,<br /><i>win the level.</i></>}</h2></div><div className={styles.counter}><span>MOVES</span><strong>{String(moves).padStart(2, '0')}</strong><small>{matched.length} / {items.length} PAIRS</small></div></header>
      <div className={styles.worlds} role="tablist"><button type="button" role="tab" aria-selected={world === 'hard'} onClick={() => setWorld('hard')}><span>⌘</span>{labels.hard}</button><button type="button" role="tab" aria-selected={world === 'soft'} onClick={() => setWorld('soft')}><span>♡</span>{labels.soft}</button></div>
      {world === 'hard' && <nav className={styles.levels}>{Object.keys(hardSkills).map((tab, index) => <button key={tab} type="button" onClick={() => setLevel(tab)} aria-current={level === tab}><span>0{index + 1}</span>{french ? ({ Languages: 'Langages', Frameworks: 'Frameworks & bibliothèques', Databases: 'Bases de données', Tools: 'Outils', DevOps: 'DevOps', AI: 'Intelligence artificielle' }[tab]) : ({ Frameworks: 'Frameworks & libraries' }[tab] || tab)}</button>)}</nav>}
      <div className={styles.boardWrap}><div className={styles.boardHeader}><span>{world === 'hard' ? (french ? 'Associe les logos à leur technologie' : 'Match logos with technologies') : (french ? 'Associe chaque qualité à sa définition' : 'Match each quality with its definition')}</span><span>✦</span></div><div className={styles.board}>{cards.map((card) => { const open = flipped.includes(card.id) || matched.includes(card.key); return <button type="button" key={card.id} className={`${styles.card} ${open ? styles.open : ''} ${matched.includes(card.key) ? styles.pair : ''}`} onClick={() => play(card)}><span className={styles.cardBack}>✦</span><span className={styles.cardFace}>{card.type === 'logo' ? <i style={{ color: card.color }}>{card.content}</i> : <strong>{card.content}</strong>}</span></button>; })}</div>{completed && <div className={styles.win}><span>✦</span><div><strong>{french ? 'Niveau complété !' : 'Level completed!'}</strong><p>{french ? 'Tu as trouvé toutes les paires.' : 'You found every pair.'}</p></div><button type="button" onClick={() => { setFlipped([]); setMatched([]); setMoves(0); }}>{french ? 'Rejouer' : 'Play again'}</button></div>}</div>
    </div>
  </section>;
}
