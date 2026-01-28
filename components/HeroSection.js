'use client';
import { useState, useEffect } from 'react';

export default function HeroSection({ setActiveItem }) {
  const [mounted, setMounted] = useState(false);

  // Empêche le mismatch serveur/client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Si on n'est pas encore sur le client, on rend un conteneur vide avec la bonne couleur
  if (!mounted) {
    return <section style={{ height: '100vh', backgroundColor: 'var(--bg-color)' }} />;
  }

  return (
    <section id="home" className="hero-section" style={{
      height: '100vh', width: '100vw',
      position: 'relative', overflow: 'hidden',
      backgroundColor: 'var(--bg-color)',
      display: 'flex', alignItems: 'center', padding: '0 8%',
      transition: 'background-color 0.3s ease'
    }}>
      
      {/* Background avec 8 Nuages en dégradé */}
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

      {/* Contenu principal */}
      <div className="hero-grid" style={{
        width: '100%', maxWidth: '1400px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.2fr 0.8fr',
        alignItems: 'center', position: 'relative', zIndex: 10
      }}>
        <div className="animate-in fade-in duration-1000">
          <h1 className="hero-title" style={{ fontSize: '5.5rem', fontFamily: 'serif', color: 'var(--text-main)', lineHeight: '1', marginBottom: '1.5rem' }}>
            Hello, I'm<br />
            <span style={{ fontWeight: 'bold' }}>Riham Bouchiha.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-sub)', maxWidth: '450px', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Software Engineering Student<br/><br/> passionate about DevOps, AI and UI/UX design.
            I create beautiful and functional websites to bring ideas to life.
          </p>
          <a href="#portfolio" onClick={() => setActiveItem('Portfolio')}>
            <button style={{
              padding: '1rem 2.5rem', backgroundColor: '#a68064', color: 'white',
              border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '600',
              cursor: 'pointer', boxShadow: '0 10px 25px rgba(166, 128, 100, 0.3)'
            }}>
              View My Work
            </button>
          </a>
        </div>

        <div style={{ position: 'relative' }}>
          <div className="avatar-frame" style={{
            position: 'absolute', width: '380px', height: '420px',
            backgroundColor: '#d4b5a0', borderRadius: '50px',
            transform: 'translate(20px, 20px)', zIndex: -1
          }}></div>
          <div className="avatar-container" style={{
            width: '380px', height: '420px',
            backgroundColor: 'var(--white-to-dark)', borderRadius: '50px',
            padding: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
            border: '10px solid var(--white-to-dark)',
            transition: 'background-color 0.3s, border-color 0.3s'
          }}>
             <div style={{
               width: '100%', height: '100%',
               backgroundColor: 'var(--inner-avatar)', borderRadius: '35px',
               overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
               transition: 'background-color 0.3s'
             }}>
               <img src="/avatar.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
          </div>
        </div>
      </div>

      {/* LA FLÈCHE FINALE */}
      <a href="#about" onClick={() => setActiveItem('About')} style={{
        position: 'absolute', bottom: '30px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 30, textDecoration: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'pointer', transition: 'opacity 0.3s'
      }}>
        <div style={{
          color: '#775535', fontSize: '24px',
          animation: 'scrollSlide 2.5s infinite ease-in-out',
        }}>
          ↓
        </div>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, #775535, transparent)',
          opacity: 0.5, marginTop: '5px'
        }}></div>
      </a>

      <style jsx>{`
        @keyframes scrollSlide {
          0% { transform: translateY(-8px); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}