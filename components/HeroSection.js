'use client';
import { useEffect, useState } from 'react';

export default function HeroSection({ setActiveItem, language }) {
  const fullName = 'Riham Bouchiha.';
  const [typedName, setTypedName] = useState('');

  useEffect(() => {
    let index = 0;
    let pauseTimer;
    const typeName = () => {
      index += 1;
      setTypedName(fullName.slice(0, index));
      if (index === fullName.length) {
        pauseTimer = window.setTimeout(() => {
          index = 0;
          setTypedName('');
          typeName();
        }, 2200);
      } else {
        pauseTimer = window.setTimeout(typeName, 210);
      }
    };
    pauseTimer = window.setTimeout(typeName, 400);
    return () => window.clearTimeout(pauseTimer);
  }, []);
  const copy = language === 'fr'
    ? {
        greeting: 'Bonjour, je suis',
        name: 'Riham Bouchiha.',
        subtitle: 'Élève ingénieure en génie informatique et intelligence artificielle',
        description: 'Développeuse Full-Stack | Designer UI/UX | Passionnée par l’IA et le Machine Learning | Passionnée par le DevOps et les logiciels évolutifs. Je conçois des produits numériques fiables et à fort impact, qui transforment des idées ambitieuses en expériences soignées.',
        button: 'Voir mes projets', contact: 'Contactez-moi',
        badge: 'Ingénierie logicielle',
        panelTitle: 'Construire des expériences digitales réfléchies.',
        panelText: 'Je conçois des interfaces et des solutions techniques qui allient impact, clarté et fiabilité. Mon approche combine une architecture solide, une automatisation fluide et une attention particulière à l’expérience utilisateur, afin de créer des produits aussi agréables à utiliser que simples à faire évoluer.',
      }
    : {
        greeting: 'Hello, I am', name: 'Riham Bouchiha.', subtitle: 'Engineering student in computer science and artificial intelligence',
        description: 'Full-Stack Developer | UI/UX Designer | AI & Machine Learning Enthusiast | Passionate About DevOps & Scalable Software. I build reliable, high-impact digital products that turn ambitious ideas into polished experiences.',
        button: 'View my work', contact: 'Get in touch',
        badge: 'Software engineering',
        panelTitle: 'Building thoughtful digital experiences.',
        panelText: 'I design interfaces and technical solutions that balance impact, clarity and reliability. My approach brings together sound architecture, seamless automation and a strong focus on the user experience—creating products that feel intuitive today and are ready to evolve tomorrow.',
      };

  return (
    <section id="home" className="bp-hero">
      <div className="bp-hero-grid" aria-hidden="true" />
      <div className="bp-hero-orb bp-hero-orb--one" aria-hidden="true" />
      <div className="bp-hero-orb bp-hero-orb--two" aria-hidden="true" />
      <div className="bp-hero-orb bp-hero-orb--three" aria-hidden="true" />

      <div className="bp-hero-frame">
        <div className="bp-hero-copy">
          <span className="bp-hero-eyebrow">{copy.greeting}</span>
          <h1 className="bp-hero-name"><span>{typedName}</span><span className="bp-typing-cursor" aria-hidden="true">|</span></h1>
          <p className="bp-hero-role">{copy.subtitle}</p>
          <p className="bp-hero-desc">{copy.description}</p>
          <div className="bp-hero-cta">
            <a href="#portfolio" onClick={() => setActiveItem('Portfolio')} className="bp-btn bp-btn-primary">{copy.button}</a>
            <a href="#contact" className="bp-btn bp-btn-secondary">{copy.contact}</a>
          </div>
        </div>

        <aside className="bp-pipeline bp-panel-copy" aria-label={copy.badge}>
          <span className="bp-panel-flower" aria-hidden="true">✦</span>
          <p className="bp-panel-badge">{copy.badge}</p>
          <h2>{copy.panelTitle}</h2>
          <p>{copy.panelText}</p>
        </aside>
      </div>

      <a href="#about" onClick={() => setActiveItem('About')} className="bp-hero-scroll" aria-label="Scroll to about section">
        <span className="bp-hero-scroll-label">SCROLL</span><span className="bp-hero-scroll-line" />
      </a>
    </section>
  );
}
