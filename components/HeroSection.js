'use client';
import { useState, useEffect } from 'react';

export default function HeroSection({ setActiveItem, language }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copy = language === 'fr'
    ? {
        greeting: 'Bonjour, je suis',
        name: 'Riham Bouchiha.',
        subtitle: 'Étudiante en ingénierie logicielle',
        description: 'Passionnée par le DevOps, l’IA et le design d’interface. Je transforme des idées en produits utiles et élégants.',
        button: 'Voir mes projets',
        panelTitle: 'Construire des expériences digitales réfléchies.',
        panelText: 'Je conçois des interfaces et des solutions techniques qui allient impact, clarté et fiabilité.',
        badge: 'Ingénierie logicielle'
      }
    : {
        greeting: 'Hello, I am',
        name: 'Riham Bouchiha.',
        subtitle: 'Software engineering student',
        description: 'Passionate about DevOps, AI and thoughtful interfaces. I turn ideas into meaningful, polished digital products.',
        button: 'View my work',
        panelTitle: 'Building thoughtful digital experiences.',
        panelText: 'I design interfaces and technical solutions that balance impact, clarity and reliability.',
        badge: 'Software engineering'
      };

  if (!mounted) {
    return <section style={{ height: '100vh', backgroundColor: 'var(--bg-color)' }} />;
  }

  return (
    <section id="home" className="hero-section" style={{
      minHeight: '100vh', width: '100vw',
      position: 'relative', overflow: 'hidden',
      background: 'transparent',
      display: 'flex', alignItems: 'center', padding: '0 8%',
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{ position: 'absolute', inset: '-10%', zIndex: 1, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 800" width="120%" height="120%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradTop1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#775535" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#cbb19937" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradTop2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9d7042f0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#71410b80" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradBot1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#b08968" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#b08968" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradBot2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#71410b80" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#9d7042f0" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path className="cloud-layer cloud-top-1" d="M-200 250C100 100 400 400 700 200C1000 50 1300 250 1600 150V0H-200V250Z" fill="url(#gradTop1)" />
          <path className="cloud-layer cloud-top-2" d="M-100 350C200 200 500 500 800 300C1100 150 1400 350 1700 250V0H-100V350Z" fill="url(#gradTop2)" opacity="0.6" />
          <path className="cloud-layer cloud-top-3" d="M0 200C300 50 600 300 900 150C1200 0 1500 200 1800 100V0H0V200Z" fill="url(#gradTop1)" opacity="0.4" />
          <path className="cloud-layer cloud-top-4" d="M-300 150C0 0 300 250 600 100C900 -50 1200 150 1500 50V0H-300V150Z" fill="url(#gradTop2)" opacity="0.3" />
          <path className="cloud-layer cloud-bot-1" d="M1600 600C1300 450 1000 750 700 600C400 450 100 650 -200 550V800H1600V600Z" fill="url(#gradBot1)" />
          <path className="cloud-layer cloud-bot-2" d="M1500 700C1200 600 900 850 600 750C300 650 0 800 -300 750V900H1500V700Z" fill="url(#gradBot2)" />
          <path className="cloud-layer cloud-bot-3" d="M1440 500C1100 400 800 600 500 500C200 400 -100 550 -400 500V800H1440V500Z" fill="url(#gradBot1)" opacity="0.5" />
          <path className="cloud-layer cloud-bot-4" d="M1700 750C1400 650 1100 850 800 750C500 650 200 800 -100 750V900H1700V750Z" fill="url(#gradBot2)" opacity="0.7" />
        </svg>
      </div>

      <div className="hero-grid" style={{
        width: '100%', maxWidth: '1400px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.15fr 0.85fr',
        alignItems: 'center', position: 'relative', zIndex: 10, gap: '2rem'
      }}>
        <div className="animate-in fade-in duration-1000">
          <span className="pill" style={{ marginBottom: '1rem' }}>{copy.greeting}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.6rem)', fontFamily: 'serif', color: 'var(--text-main)', lineHeight: '1.02', marginBottom: '1rem' }}>
            <span style={{ fontWeight: '700' }}>{copy.name}</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-sub)', maxWidth: '520px', marginBottom: '1.4rem', lineHeight: '1.75' }}>
            {copy.subtitle}<br /><br />{copy.description}
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a href="#portfolio" onClick={() => setActiveItem('Portfolio')} className="soft-btn" style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 12px 24px rgba(166,128,100,0.26)' }}>
              {copy.button}
            </a>
            <a href="#contact" className="soft-btn" style={{ background: 'var(--surface)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
              {language === 'fr' ? 'Contactez-moi' : 'Get in touch'}
            </a>
          </div>
        </div>

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: '390px', minHeight: '320px',
            background: 'linear-gradient(135deg, rgba(166,128,100,0.2), rgba(255,255,255,0.1))',
            borderRadius: '32px',
            padding: '2rem',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            backdropFilter: 'blur(14px)'
          }}>
            <div>
              <p style={{ margin: 0, color: 'var(--text-sub)', letterSpacing: '0.24rem', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 700 }}>
                {copy.badge}
              </p>
              <h2 style={{ fontSize: '1.7rem', fontFamily: 'serif', color: 'var(--text-main)', margin: '0.8rem 0 1rem' }}>
                {copy.panelTitle}
              </h2>
              <p style={{ fontSize: '0.97rem', color: 'var(--text-sub)', lineHeight: 1.7, margin: 0 }}>
                {copy.panelText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" onClick={() => setActiveItem('About')} style={{
        position: 'absolute', bottom: '30px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 30, textDecoration: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'pointer', transition: 'opacity 0.3s'
      }}>
        <div style={{ color: '#775535', fontSize: '24px', animation: 'scrollSlide 2.5s infinite ease-in-out' }}>
          ↓
        </div>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #775535, transparent)', opacity: 0.5, marginTop: '5px' }}></div>
      </a>
    </section>
  );
}