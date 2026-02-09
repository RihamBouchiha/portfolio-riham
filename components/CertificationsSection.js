'use client';
import { useState, useEffect } from 'react';

export default function CertificationsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState(2); 

  useEffect(() => {
    setMounted(true);
  }, []);

  const certs = [
    {
      id: 1,
      title: 'Hackathon 1',
      subtitle: 'OrientalHack 1.0',
      org: 'ENCG Oujda',
      image: '/encg.png', 
      date: '2025'
    },
    {
      id: 2,
      title: 'Public Speaker',
      subtitle: 'Girl in ICT',
      org: 'Majal Berkane',
      image: '/ict.png',
      date: '2025'
    },
    {
      id: 3,
      title: 'Hackathon 2',
      subtitle: 'Esisa senior developers hackathon',
      org: 'ESISA FES',
      image: '/esisa.png',
      date: '2025'
    },
    {
      id: 4,
      title: 'Organisation',
      subtitle: 'INNOVERSE Team',
      org: 'ENIAD Berkane',
      image: '/inno.png',
      date: '2025'
    }
  ];

  const handlePanelClick = (imagePath) => {
    window.open(imagePath, '_blank');
  };

  if (!mounted) return null;

  return (
    <section 
      id="certifications" 
      style={{ 
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--bg-color)', // Fond de base
        padding: '0 5%',
        boxSizing: 'border-box',
        position: 'relative', // Nécessaire pour contenir l'animation
        overflow: 'hidden'    // Cache les formes qui sortent du cadre
      }}
    >
      
      {/* --- CSS ET ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 1. ANIMATION KEYFRAMES */
        @keyframes moveOrb {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* 2. FORMES FLOTTANTES (BLOBS) */
        .anim-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px); /* Le flou crée l'effet de lueur */
          z-index: 0; /* Derrière le contenu */
          animation: moveOrb 15s infinite ease-in-out;
        }

        .blob-1 {
          top: -10%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: #a68064; /* Votre couleur accent (Marron/Or) */
          opacity: 0.15;
        }

        .blob-2 {
          bottom: -10%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: #4a5568; /* Une couleur secondaire (Gris bleuté) */
          opacity: 0.15;
          animation-delay: -5s; /* Décale l'animation */
          animation-duration: 20s;
        }

        .blob-3 {
          top: 40%;
          left: 40%;
          width: 300px;
          height: 300px;
          background: #683612;
          opacity: 0.1;
          animation: pulse 8s infinite ease-in-out;
        }

        /* 3. CONTENU (doit être au-dessus du fond) */
        .content-wrapper {
          position: relative;
          z-index: 2; 
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* 4. LE STYLE ACCORDÉON EXISTANT */
        .accordion-container {
          display: flex;
          width: 100%;
          max-width: 1200px;
          height: 450px;
          gap: 10px;
        }

        .panel {
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          height: 100%;
          border-radius: 30px;
          cursor: pointer;
          flex: 0.5;
          transition: flex 0.7s cubic-bezier(0.25, 1, 0.5, 1), filter 0.3s ease;
          overflow: hidden;
          filter: grayscale(100%);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .panel.active {
          flex: 5;
          filter: grayscale(0%);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .panel-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0,0,0,0.3) 40%, transparent 100%);
          opacity: 0.8;
          transition: opacity 0.5s;
        }
        .panel.active .panel-overlay { opacity: 0.6; }

        .panel-content {
          position: absolute;
          bottom: 20px; left: 20px; right: 20px;
          opacity: 0;
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
          transform: translateY(20px);
          color: white;
        }

        .panel.active .panel-content {
          opacity: 1;
          transform: translateY(0);
        }

        .vertical-title {
          position: absolute;
          bottom: 30px; left: 50%;
          transform: translateX(-50%) rotate(-90deg);
          white-space: nowrap;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          opacity: 1;
          transition: opacity 0.3s;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .panel.active .vertical-title { opacity: 0; }

        .meta-tag {
          display: inline-block;
          background: #a68064;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .view-btn {
          margin-top: 15px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: bold;
          text-transform: uppercase;
          color: white;
          border-bottom: 1px solid white;
          padding-bottom: 3px;
        }
        .view-btn span { font-size: 1.2rem; }

        @media (max-width: 768px) {
          .accordion-container { flex-direction: column; height: 60vh; width: 100%; }
          .panel { width: 100%; flex: 1; }
          .panel.active { flex: 4; }
          .vertical-title {
            transform: translateY(-50%);
            top: 50%; bottom: auto; left: 20px;
            writing-mode: vertical-rl;
          }
        }
      `}} />

      {/* --- ELEMENTS D'ARRIÈRE PLAN --- */}
      <div className="anim-blob blob-1"></div>
      <div className="anim-blob blob-2"></div>
      <div className="anim-blob blob-3"></div>

      {/* --- CONTENU PRINCIPAL WRAPPED --- */}
      <div className="content-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', color: 'var(--text-main)', margin: 0 }}>
            Parcours & Certifications
          </h2>
          <p style={{ color: 'var(--text-main)', opacity: 0.6, marginTop: '0.5rem' }}>
            Reconnaissances et événements clés
          </p>
        </div>

        <div className="accordion-container">
          {certs.map((cert) => (
            <div 
              key={cert.id} 
              className={`panel ${activeId === cert.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveId(cert.id)}
              onClick={() => handlePanelClick(cert.image)}
              style={{ backgroundImage: `url(${cert.image})` }}
            >
              <div className="panel-overlay"></div>
              
              <div className="vertical-title">
                {cert.date} • {cert.title}
              </div>

              <div className="panel-content">
                <span className="meta-tag">{cert.date}</span>
                <h3 style={{ fontSize: '2rem', margin: '5px 0', fontFamily: 'serif' }}>
                  {cert.subtitle}
                </h3>
                <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                  {cert.org}
                </p>

                <div className="view-btn">
                  Voir le certificat <span>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}