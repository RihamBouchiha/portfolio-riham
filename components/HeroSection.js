'use client';

import { useEffect, useState } from 'react';

export default function HeroSection({ setActiveItem, language }) {
  const fullName = 'Riham Bouchiha.';
  const [typedName, setTypedName] = useState('');

  useEffect(() => {
    // On small touch screens, changing the title width can make some mobile
    // browsers adjust the visual viewport. Keep the name stable there.
    if (window.matchMedia('(max-width: 640px)').matches) {
      setTypedName(fullName);
      return undefined;
    }

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
        subtitle: '\u00c9l\u00e8ve ing\u00e9nieure en g\u00e9nie informatique et intelligence artificielle',
        description: 'D\u00e9veloppeuse Full-Stack et Designer UI/UX, passionn\u00e9e par l\u2019intelligence artificielle, le DevOps et les solutions logicielles modernes. Je transforme des id\u00e9es ambitieuses en produits num\u00e9riques fiables, \u00e9volutifs et intuitifs, gr\u00e2ce \u00e0 des architectures robustes, un code maintenable et des interfaces soign\u00e9es.',
        button: 'Voir mes projets',
        contact: 'Contactez-moi',
        badge: 'Ing\u00e9nierie logicielle',
        panelTitle: 'Construire des exp\u00e9riences digitales r\u00e9fl\u00e9chies.',
        panelText: 'Je con\u00e7ois des interfaces et des solutions techniques qui allient impact, clart\u00e9 et fiabilit\u00e9. Mon approche combine une architecture solide, une automatisation fluide et une attention particuli\u00e8re \u00e0 l\u2019exp\u00e9rience utilisateur, afin de cr\u00e9er des produits aussi agr\u00e9ables \u00e0 utiliser que simples \u00e0 faire \u00e9voluer.',
      }
    : {
        greeting: 'Hello, I am',
        name: 'Riham Bouchiha.',
        subtitle: 'Engineering student in computer science and artificial intelligence',
        description: 'Full-Stack Developer and UI/UX Designer, passionate about artificial intelligence, DevOps, and modern software solutions. I turn ambitious ideas into reliable, scalable, intuitive digital products through robust architecture, maintainable code, and polished interfaces.',
        button: 'View my work',
        contact: 'Get in touch',
        badge: 'Software engineering',
        panelTitle: 'Building thoughtful digital experiences.',
        panelText: 'I design interfaces and technical solutions that balance impact, clarity and reliability. My approach brings together sound architecture, seamless automation and a strong focus on the user experience\u2014creating products that feel intuitive today and are ready to evolve tomorrow.',
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
          <h1 className="bp-hero-name"><span className="bp-typed-name">{typedName}<span className="bp-typing-cursor" aria-hidden="true">|</span></span></h1>
          <p className="bp-hero-role">{copy.subtitle}</p>
          <p className="bp-hero-desc">{copy.description}</p>
          <div className="bp-hero-cta">
            <a href="#portfolio" onClick={() => setActiveItem('Portfolio')} className="bp-btn bp-btn-primary">{copy.button}</a>
            <a href="#contact" className="bp-btn bp-btn-secondary">{copy.contact}</a>
          </div>
        </div>

        <aside className="bp-pipeline bp-panel-copy" aria-label={copy.badge}>
          <span className="bp-panel-flower" aria-hidden="true">\u2726</span>
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
