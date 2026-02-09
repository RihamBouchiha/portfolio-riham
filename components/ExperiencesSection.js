'use client';
import { useState, useEffect, useRef } from 'react';

export default function ExperiencesSection() {
  const [mounted, setMounted] = useState(false);
  // On garde en mémoire l'ID de l'expérience survolée (la 1ère par défaut)
  const [activeExpId, setActiveExpId] = useState(1);
  const sectionRef = useRef(null);

  // Données des expériences AVEC PHOTOS
  const experiences = [
    {
      id: 1,
      company: "Commune de Tanger",
      role: "Stagiaire Mobile",
      period: "2025",
      desc: "Développement d'une app Flutter pour la gestion de l'éclairage urbain avec géolocalisation.",
      tags: ["Flutter", "Firebase"],
      // REMPLACE PAR TES VRAIES IMAGES (ex: /images/tanger.jpg)
      image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1931&auto=format&fit=crop",
      link: "https://fr.tanger.ma/"
    },
    {
      id: 2,
      company: "Activ Digital",
      role: "Full Stack Dev",
      period: "2024",
      desc: "Dashboard ERP RH : Analytics, gestion de paie, congés et rôles utilisateurs.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      link: "https://www.linkedin.com/company/activ-digital/"
    },
    {
      id: 3,
      company: "ESTF",
      role: "Projet Académique",
      period: "2023-24",
      desc: "Architecture d'une plateforme de réservation hôtelière temps réel.",
      stack: ["Laravel", "MySQL"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
      link: "http://www.est-usmba.ac.ma/"
    },
    {
      id: 4,
      company: "D3 Soft",
      role: "Back-end Dev",
      period: "2023",
      desc: "Sécurisation d'API REST pour transactions bancaires.",
      tags: ["Spring Boot", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1556742049-0c29bc35193f?q=80&w=2070&auto=format&fit=crop",
      link: "https://d3soft.ma/"
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Génération des particules pour le background animé
  const particles = mounted ? Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    size: Math.random() * 4 + 2 + 'px',
    duration: Math.random() * 20 + 10 + 's',
    delay: Math.random() * -20 + 's',
    opacity: Math.random() * 0.5 + 0.1
  })) : [];

  // Trouver l'expérience active pour afficher son image
  const activeExperience = experiences.find(exp => exp.id === activeExpId);

  if (!mounted) return null;

  return (
    <section id="experiences" className="cinematic-section" ref={sectionRef}>
      
      {/* --- 1. BACKGROUND ANIMÉ (Particules) --- */}
      <div className="animated-bg">
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity
          }}></div>
        ))}
      </div>

      <div className="container content-wrapper">
        {/* --- 2. COLONNE GAUCHE : LA LISTE --- */}
        <div className="list-column">
          <h2 className="section-title">Career Journey</h2>
          <p className="section-subtitle">Survolez pour voir les projets.</p>
          
          <div className="exp-list">
            {experiences.map((exp) => (
              <div 
                key={exp.id} 
                className={`exp-item ${activeExpId === exp.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveExpId(exp.id)}
                onClick={() => window.open(exp.link, '_blank')}
              >
                <span className="exp-period">{exp.period}</span>
                <div className="exp-info">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-company">@ {exp.company}</span>
                  {activeExpId === exp.id && (
                     <p className="exp-desc-mobile">{exp.desc}</p>
                  )}
                </div>
                <div className="exp-indicator">→</div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 3. COLONNE DROITE : LE PROJECTEUR (Image) --- */}
        <div className="stage-column">
           <div className="image-stage">
              {experiences.map((exp) => (
                <img 
                  key={exp.id}
                  src={exp.image} 
                  alt={exp.company}
                  className={`stage-image ${activeExpId === exp.id ? 'visible' : ''}`}
                />
              ))}
              
              {/* Overlay d'infos sur l'image */}
              <div className="stage-overlay">
                <h3>{activeExperience.company} — {activeExperience.role}</h3>
                <p>{activeExperience.desc}</p>
              </div>
           </div>
        </div>
      </div>


      {/* --- CSS INTERNE --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .cinematic-section {
          min-height: 100vh;
          background-color: var(--bg-color); /* Fond de base */
          position: relative;
          overflow: hidden;
          padding: 6rem 5%;
          display: flex;
          align-items: center;
        }

        /* --- ANIMATED BACKGROUND --- */
        .animated-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          /* Un léger dégradé sombre pour faire ressortir les particules */
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%);
        }

        .particle {
          position: absolute;
          bottom: -10px;
          background: #a68064; /* Couleur or/terre */
          border-radius: 50%;
          box-shadow: 0 0 10px #a68064, 0 0 20px rgba(166, 128, 100, 0.5);
          animation: riseUp linear infinite;
        }

        @keyframes riseUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 1; transform: translateX(20px); }
          100% { transform: translateY(-120vh) translateX(-20px); opacity: 0; }
        }

        /* --- LAYOUT --- */
        .content-wrapper {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1.5fr; /* Gauche plus petite que droite */
          gap: 4rem;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
        }

        /* --- GAUCHE : LISTE --- */
        .section-title {
          font-family: serif;
          font-size: 3.5rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        .section-subtitle {
            color: var(--text-sub);
            margin-bottom: 3rem;
        }

        .exp-item {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(166, 128, 100, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .exp-item:hover, .exp-item.active {
          opacity: 1;
          background: rgba(166, 128, 100, 0.05);
          padding-left: 2rem;
          border-color: #a68064;
        }

        .exp-period {
          font-family: monospace;
          font-weight: bold;
          color: #a68064;
          margin-right: 2rem;
        }

        .exp-info { flex-grow: 1; }

        .exp-role {
          font-size: 1.4rem;
          margin: 0;
          color: #2f1d0b;
        }
        .exp-company {
            font-weight: bold;
            color: #775535;
        }
        .exp-desc-mobile { display: none; }

        .exp-indicator {
          font-size: 1.5rem;
          color: #a68064;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        .exp-item.active .exp-indicator {
          opacity: 1;
          transform: translateX(0);
        }

        /* --- DROITE : LA SCÈNE (IMAGES) --- */
        .stage-column {
            height: 600px;
            position: relative;
        }

        .image-stage {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 30px 60px rgba(0,0,0,0.2);
            border: 2px solid rgba(255,255,255,0.1);
        }

        /* Superposition des images pour le crossfade */
        .stage-image {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transform: scale(1.1);
            transition: opacity 0.7s ease, transform 7s ease;
            filter: brightness(0.7) sepia(0.2); /* Look un peu cinéma */
        }

        .stage-image.visible {
            opacity: 1;
            transform: scale(1);
            z-index: 1;
        }

        .stage-overlay {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            padding: 2rem;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: white;
            z-index: 2;
        }
        .stage-overlay h3 { font-family: serif; font-size: 1.8rem; margin: 0 0 10px 0; }
        .stage-overlay p { opacity: 0.9; max-width: 80%; }

        /* --- MOBILE --- */
        @media (max-width: 1024px) {
            .content-wrapper { grid-template-columns: 1fr; gap: 2rem; }
            .stage-column { display: none; /* On cache la grande image sur mobile */ }
            .exp-item.active { background: transparent; padding-left: 1.5rem; }
            .exp-desc-mobile { display: block; margin-top: 1rem; color: #555; }
            .exp-indicator { display: none; }
        }
      `}} />
    </section>
  );
}