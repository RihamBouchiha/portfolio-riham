'use client';
import { useState, useEffect, useRef } from 'react';

export default function AboutSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fonction pour suivre la souris
  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
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
        backgroundColor: 'var(--about-bg, #2f1d0b)',
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
      
      {/* 1. EFFET SPOTLIGHT : Une lueur qui suit la souris */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(78, 60, 48, 0.44), transparent 40%)`,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* 2. LES ÉTOILES */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {mounted && starsData.map((star) => (
          <div 
            key={star.id} 
            className="star-base" 
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              backgroundColor: 'var(--about-star, #775535)',
              position: 'absolute',
              borderRadius: '50%',
              opacity: 0.5
            }} 
          />
        ))}
      </div>

      {/* 3. CONTENU DANS UNE CARTE GLASSMORPHISM */}
      <div className="glass-card" style={{ maxWidth: '900px', textAlign: 'center', zIndex: 10, position: 'relative' }}>
        
        {/* Petite touche décorative : Code Brackets */}
        <div style={{ fontSize: '4rem', color: '#534235', opacity: 0.1, position: 'absolute', top: -30, left: 20, fontFamily: 'monospace' }}>
          {'{'}
        </div>

        <h2 style={{ fontSize: '3rem', fontFamily: 'serif', marginBottom: '2rem', color: 'var(--about-star, #775535)' }}>
          About Me
        </h2>
        
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main, #333)', textAlign: 'justify', marginBottom: '2.5rem' }}>
          "It all began with a simple question: 'How does this actually work?' What started as tinkering with computers quickly 
          evolved into a genuine obsession with the logic behind the screen. Now, as a fourth-year Software Engineering student,
           I’ve moved beyond just using technology to actively shaping it. I thrive on the challenge of problem-solving taking messy, 
           complex requirements and crafting them into efficient, secure code and seamless user experiences."
        </p>

        {/* 4. LES DEUX BOUTONS */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="cv_riham_bouchiha.pdf" target="_blank" className="btn-primary">
            Download CV
          </a>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
        </div>

         {/* Petite touche décorative : Code Brackets Fin */}
         <div style={{ fontSize: '4rem', color: '#876953', opacity: 0.1, position: 'absolute', bottom: -40, right: 20, fontFamily: 'monospace' }}>
          {'}'}
        </div>

      </div>
    </section>
  );
}