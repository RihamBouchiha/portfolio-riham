'use client';

import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import styles from './PortfolioSection.module.css';

export default function PortfolioSection({ language = 'fr' }) {
  const french = language === 'fr';
  const projects = [
    {
      title: 'Trustify', image: '/trustify.png', accent: '#b85f77', type: { fr: 'Plateforme de due diligence IA', en: 'AI due-diligence platform' },
      description: { fr: 'Une plateforme d’analyse logicielle qui évalue un projet, identifie les risques techniques et aide les équipes à prendre des décisions plus fiables grâce à l’IA.', en: 'A software-analysis platform that assesses projects, identifies technical risks and helps teams make more confident decisions with AI.' },
      stack: 'AI · Software analysis · Web platform', link: 'http://51.170.130.179:3000', featured: true,
    },
    {
      title: 'QuizzMaster App', image: '/quizzMaster.png', accent: '#8f78b2', type: { fr: 'Application mobile de quiz', en: 'Mobile quiz app' },
      description: { fr: 'Une expérience de quiz mobile ludique avec catégories, score en temps réel et progression pensée pour maintenir l’engagement.', en: 'A playful mobile quiz experience with categories, real-time scoring and progression designed to keep users engaged.' },
      stack: 'Mobile · UI/UX · Gamification', link: 'https://github.com/Ay0u8dev/quiz_master', github: 'https://github.com/Ay0u8dev/quiz_master',
    },
    {
      title: 'Éclairage Public', image: '/eclairage.png', accent: '#d39358', type: { fr: 'Application mobile citoyenne', en: 'Civic mobile application' },
      description: { fr: 'Une application qui facilite le signalement des pannes d’éclairage public et améliore le suivi des interventions de maintenance.', en: 'An application that simplifies public-lighting fault reporting and improves maintenance intervention tracking.' },
      stack: 'Mobile · Reporting · Public service', link: 'https://github.com/RihamBouchiha/eclairage_public', github: 'https://github.com/RihamBouchiha/eclairage_public',
    },
    {
      title: 'Gusto RH', image: '/gusto2.png', accent: '#d5748c', type: { fr: 'Plateforme de gestion RH', en: 'Human resources platform' },
      description: { fr: 'Une solution RH centralisée pour organiser les collaborateurs, les congés et les processus internes avec une expérience claire et intuitive.', en: 'A centralised HR solution for organising employees, leave and internal workflows through a clear, intuitive experience.' },
      stack: 'MERN · Dashboard · UX', link: 'https://github.com/RihamBouchiha/grh', github: 'https://github.com/RihamBouchiha/grh',
    },
    {
      title: 'RHK-Hotel', image: '/r.png', accent: '#a98665', type: { fr: 'Plateforme de gestion hôtelière', en: 'Hotel management platform' },
      description: { fr: 'Un écosystème de gestion hôtelière réunissant réservations, chambres, salles, spa et administration du personnel au même endroit.', en: 'A hotel-management ecosystem that brings reservations, rooms, meeting spaces, spa services and staff administration together.' },
      stack: 'Full-stack · Booking · Admin', link: 'https://rihambouchiha.github.io/PFE-HOTEL-RHK-Riham/riham/indexRiham1.html', github: 'https://github.com/RihamBouchiha',
    },
  ];

  const copy = french
    ? { eyebrow: 'SÉLECTION DE PROJETS', title: <>Des idées devenues<br /><i>expériences.</i></>, intro: 'Une sélection de produits où technologie, clarté et sens du détail se rencontrent.', open: 'Ouvrir le projet', code: 'Voir le code', stack: 'Focus' }
    : { eyebrow: 'SELECTED WORK', title: <>Ideas turned into<br /><i>experiences.</i></>, intro: 'A selection of products where technology, clarity and attention to detail meet.', open: 'Open project', code: 'View code', stack: 'Focus' };

  const Card = ({ project, index, featured = false }) => <article className={`${styles.card} ${featured ? styles.featured : ''}`} style={{ '--accent': project.accent }}>
    <a href={project.link} target="_blank" rel="noreferrer" className={styles.visual}><img src={project.image} alt={project.title} /><span>0{index + 1}</span></a>
    <div className={styles.content}><p className={styles.type}>{project.type[french ? 'fr' : 'en']}</p><h3>{project.title}</h3><p className={styles.description}>{project.description[french ? 'fr' : 'en']}</p><div className={styles.meta}><span><b>{copy.stack}</b> {project.stack}</span><div><a href={project.link} target="_blank" rel="noreferrer" aria-label={`${copy.open}: ${project.title}`}><FiArrowUpRight /></a>{project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${copy.code}: ${project.title}`}><FiGithub /></a>}</div></div></div>
  </article>;

  return <section id="portfolio" className={styles.section}>
    <div className={styles.shell}>
      <header className={styles.header}><p>{copy.eyebrow}</p><h2>{copy.title}</h2><span>{copy.intro}</span></header>
      <div className={styles.featuredWrap}><Card project={projects[0]} index={0} featured /></div>
      <div className={styles.grid}>{projects.slice(1).map((project, index) => <Card key={project.title} project={project} index={index + 1} />)}</div>
    </div>
  </section>;
}
