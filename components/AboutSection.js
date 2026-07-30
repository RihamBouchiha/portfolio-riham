'use client';
import { useState, useEffect, useRef } from 'react';

export default function AboutSection({ language }) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const copy = language === 'fr'
    ? {
        title: 'À propos de moi',
        body: 'Tout a commencé par une simple question : « Comment ça fonctionne vraiment ? ». Ce goût pour comprendre les mécanismes derrière les écrans s’est transformé en une vraie passion pour la résolution de problèmes complexes, la création de logiciels fiables et la conception d’expériences digitales élégantes.',
        cv: 'Télécharger le CV',
        contact: 'Me contacter'
      }
    : {
        title: 'About me',
        body: 'It all started with a simple question: “How does this actually work?” That curiosity grew into a genuine passion for understanding complex systems, building reliable software and crafting polished digital experiences.',
        cv: 'Download CV',
        contact: 'Contact me'
      };

  const starsData = mounted ? Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1 + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    duration: Math.random() * 3 + 2 + 's',
    delay: Math.random() * 5 + 's'
  })) : [];

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 8%',
        transition: 'background-color 0.5s ease',
        zIndex: 1
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(166,128,100,0.16), transparent 42%)`, zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {mounted && starsData.map((star) => (
          <div key={star.id} className="star-base" style={{ width: star.size, height: star.size, top: star.top, left: star.left, animationDelay: star.delay, backgroundColor: 'var(--accent)', position: 'absolute', borderRadius: '50%', opacity: 0.5 }} />
        ))}
      </div>

      <div className="glass-card section-shell" style={{ zIndex: 10, position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'center' }}>
        <div>
          <span className="pill" style={{ marginBottom: '0.85rem' }}>{language === 'fr' ? 'À propos' : 'About'}</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', fontFamily: 'serif', marginBottom: '1rem', color: 'var(--accent)' }}>{copy.title}</h2>
          <p style={{ fontSize: '1.04rem', lineHeight: '1.8', color: 'var(--text-sub)', marginBottom: '1.4rem' }}>{copy.body}</p>
          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
            <a href="cv_riham_bouchiha.pdf" target="_blank" className="soft-btn" style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 12px 24px rgba(166,128,100,0.24)' }}>{copy.cv}</a>
            <a href="#contact" className="soft-btn" style={{ background: 'var(--surface-strong)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>{copy.contact}</a>
          </div>
        </div>

        <div style={{ padding: '1.2rem', borderRadius: '24px', background: 'rgba(166,128,100,0.08)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {['Product thinking', 'Clean UI', 'Reliable engineering', 'Curiosity-driven learning'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.8rem 0.9rem', borderRadius: '14px', background: 'var(--surface-strong)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}