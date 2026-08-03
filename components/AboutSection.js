'use client';

import { useEffect, useState } from 'react';

export default function AboutSection({ language }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const isFrench = language === 'fr';
  const slides = isFrench
    ? [
        { label: '01 — MON HISTOIRE', title: 'À propos de moi.', text: 'Tout a commencé par une simple question : « Comment ça fonctionne vraiment ? ». Ce goût pour comprendre les mécanismes derrière les écrans s’est transformé en une vraie passion pour la résolution de problèmes complexes, la création de logiciels fiables et la conception d’expériences digitales élégantes.', accent: 'curiosity' },
        { label: '02 — MA FAÇON DE PENSER', title: 'Ce qui me guide.', text: 'Chaque projet est l’occasion de relier une idée ambitieuse à une expérience claire, utile et durable.', accent: 'values', values: ['Penser produit', 'Soigner l’expérience', 'Construire pour durer', 'Apprendre sans cesse'] },
        { label: '03 — ET DEMAIN', title: 'Créer avec intention.', text: 'Je veux participer à des produits qui ont du sens : des solutions intelligentes, accessibles et techniquement solides, pensées pour évoluer avec leurs utilisateurs.', accent: 'vision' },
      ]
    : [
        { label: '01 — MY STORY', title: 'About me.', text: 'It all started with a simple question: “How does this actually work?” That curiosity grew into a genuine passion for understanding complex systems, building reliable software and crafting polished digital experiences.', accent: 'curiosity' },
        { label: '02 — HOW I THINK', title: 'What guides me.', text: 'Every project is an opportunity to connect an ambitious idea to an experience that is clear, useful and built to last.', accent: 'values', values: ['Product thinking', 'Thoughtful experiences', 'Built to last', 'Always learning'] },
        { label: '03 — WHAT’S NEXT', title: 'Creating with intention.', text: 'I want to contribute to products that matter: intelligent, accessible and technically sound solutions designed to grow alongside their users.', accent: 'vision' },
      ];

  const slide = slides[activeSlide];
  const previous = () => setActiveSlide((activeSlide - 1 + slides.length) % slides.length);
  const next = () => setActiveSlide((activeSlide + 1) % slides.length);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [activeSlide, slides.length]);

  return (
    <section id="about" className="about-hero about-carousel-section">
      <div className="about-grid" aria-hidden="true" />
      <div className={`about-orb about-orb--one about-orb--${slide.accent}`} aria-hidden="true" />
      <div className="about-orb about-orb--two" aria-hidden="true" />
      <div className="about-carousel-shell">
        <div className="about-carousel-count"><span>ABOUT</span><span>0{activeSlide + 1} / 0{slides.length}</span></div>
        <div className="about-carousel-progress" aria-hidden="true"><span key={activeSlide} /></div>
        <article className={`about-slide about-slide--${slide.accent}`} key={activeSlide}>
          <div className="about-slide-mark" aria-hidden="true"><span>{activeSlide + 1}</span><i>✦</i></div>
          <p className="about-eyebrow">{slide.label}</p>
          <h2>{slide.title}</h2>
          <p className="about-body">{slide.text}</p>
          {slide.values && <ul className="about-values">{slide.values.map((value, index) => <li key={value}><span>0{index + 1}</span>{value}</li>)}</ul>}
          {activeSlide === 0 && <div className="about-actions"><a href="/documents/CV_Riham_Bouchiha_ATS.pdf" download="CV_Riham_Bouchiha_ATS.pdf" className="about-btn about-btn--primary">{isFrench ? 'Télécharger le CV' : 'Download CV'} <span>↓</span></a><a href="#contact" className="about-btn about-btn--secondary">{isFrench ? 'Me contacter' : 'Contact me'}</a></div>}
        </article>
        <div className="about-carousel-controls">
          <button type="button" onClick={previous} aria-label={isFrench ? 'Diapositive précédente' : 'Previous slide'}>←</button>
          <div className="about-carousel-dots">{slides.map((item, index) => <button key={item.label} type="button" aria-label={`Slide ${index + 1}`} aria-current={activeSlide === index} onClick={() => setActiveSlide(index)}><span /></button>)}</div>
          <button type="button" onClick={next} aria-label={isFrench ? 'Diapositive suivante' : 'Next slide'}>→</button>
        </div>
      </div>
    </section>
  );
}
