'use client';

import { useEffect, useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

export default function Navbar({ activeItem, setActiveItem, language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const items = [
    { key: 'Home', href: '#home', fr: 'Accueil', en: 'Home' },
    { key: 'About', href: '#about', fr: 'À propos', en: 'About' },
    { key: 'Skills', href: '#skills', fr: 'Compétences', en: 'Skills' },
    { key: 'Education', href: '#education', fr: 'Formation', en: 'Education' },
    { key: 'Portfolio', href: '#portfolio', fr: 'Projets', en: 'Projects' },
    { key: 'Experiences', href: '#experiences', fr: 'Expériences', en: 'Experience' },
    { key: 'Contact', href: '#contact', fr: 'Contact', en: 'Contact' },
  ];

  const applyTheme = (dark) => { document.documentElement.classList.toggle('dark-mode', dark); document.body.classList.toggle('dark-mode', dark); window.localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); };
  useEffect(() => { const dark = window.localStorage.getItem('portfolio-theme') === 'dark' || document.documentElement.classList.contains('dark-mode'); setIsDark(dark); applyTheme(dark); }, []);
  useEffect(() => { const onScroll = () => { const point = window.scrollY + 170; items.forEach((item) => { const section = document.querySelector(item.href); if (section && point >= section.offsetTop && point < section.offsetTop + section.offsetHeight) setActiveItem(item.key); }); }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, [setActiveItem]);
  const toggleTheme = () => { try { const context = new (window.AudioContext || window.webkitAudioContext)(); const oscillator = context.createOscillator(); const gain = context.createGain(); oscillator.frequency.value = isDark ? 620 : 420; gain.gain.setValueAtTime(.05, context.currentTime); gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .12); oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + .12); } catch {} const next = !isDark; setIsDark(next); applyTheme(next); };
  const choose = (item) => { setActiveItem(item.key); setIsOpen(false); };
  const FlagSwitch = () => <div className={styles.flags} aria-label="Language"><button type="button" onClick={() => setLanguage('fr')} aria-pressed={language === 'fr'} title="Français"><img src="/flags/fr.svg" alt="Français" /></button><button type="button" onClick={() => setLanguage('en')} aria-pressed={language === 'en'} title="English"><img src="/flags/us.svg" alt="English" /></button></div>;
  const ThemeSwitch = () => <button type="button" className={styles.theme} onClick={toggleTheme} aria-label={isDark ? 'Light mode' : 'Dark mode'}><span className={isDark ? styles.darkKnob : ''}>{isDark ? <FiMoon /> : <FiSun />}</span></button>;

  return <nav className={styles.nav}><a href="#home" className={styles.brand} onClick={() => choose(items[0])}><b>RB</b><span>RIHAM<br />BOUCHIHA</span></a><div className={styles.desktop}><div className={styles.links}>{items.map((item) => <a key={item.key} href={item.href} onClick={() => choose(item)} className={activeItem === item.key ? styles.active : ''}>{item[language]}</a>)}</div><div className={styles.utilities}><FlagSwitch /><ThemeSwitch /></div></div><button type="button" className={styles.menu} onClick={() => setIsOpen(!isOpen)} aria-label="Menu">{isOpen ? <FiX /> : <FiMenu />}</button>{isOpen && <div className={styles.mobilePanel}><div className={styles.mobileTop}><span>MENU</span><button type="button" onClick={() => setIsOpen(false)}><FiX /></button></div><div className={styles.mobileLinks}>{items.map((item, index) => <a key={item.key} href={item.href} onClick={() => choose(item)}><small>0{index + 1}</small>{item[language]}<FiX className={styles.arrow} /></a>)}</div><div className={styles.mobileUtilities}><FlagSwitch /><ThemeSwitch /></div></div>}</nav>;
}
