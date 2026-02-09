'use client';
import { useState, useRef } from 'react';

export default function ExperiencesSection() {
  const [activeExpId, setActiveExpId] = useState(1);
  const sectionRef = useRef(null);

  const experiences = [
    {
      id: 1,
      company: "Commune de Tanger",
      role: "Technical Internship",
      period: "2025",
      desc: "Development of a Flutter app for urban lighting management with geolocation.",
      tags: ["React Native", "PostgreSQL"], // Note: La description dit Flutter mais le tag React Native, vérifiez lequel est le bon.
      image: "commune.png",
      link: "https://fr.tanger.ma/"
    },
    {
      id: 2,
      company: "Activ Digital",
      role: "Technical Internship",
      period: "2024",
      desc: "HR application for managing employees, leave, and payroll, optimizing internal processes.",
      tags: ["React", "Node.js", "MongoDB","Express.js"],
      image: "activ.png",
      link: "https://activdigital.ma/#hero"
    },
    {
      id: 3,
      company: "ESTF",
      role: "Academic Project",
      period: "2023-24",
      desc: "Architecture of a real-time hotel booking platform.",
      tags: ["html","css","javascript","JQuery", "MySQL"],
      image: "estf.png",
      link: "http://www.est-usmba.ac.ma/"
    },
    {
      id: 4,
      company: "D3 Soft",
      role: "Introductory Internship",
      period: "2023",
      desc: "Payroll management application for companies, including payslip generation and employee management.",
      tags: ["Windev", "MariaDB"],
      image: "d.png",
      link: "https://www.d3soft.ma/"
    }
  ];

  // Expérience active
  const activeExperience = experiences.find(exp => exp.id === activeExpId) || experiences[0];

  return (
    <section id="experiences" className="exp-section">
      
      {/* Fond subtil (Grille sombre) */}
      <div className="bg-grid"></div>

      <div className="exp-container">
        
        {/* En-tête */}
        <div className="exp-header">
          <h4 className="exp-subtitle">MY PATH</h4>
          <h2 className="exp-title">Professional Experience</h2>
        </div>

        <div className="exp-layout">
          
          {/* COLONNE GAUCHE : LISTE */}
          <div className="exp-list">
            {experiences.map((exp) => (
              <div 
                key={exp.id} 
                className={`exp-card ${activeExpId === exp.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveExpId(exp.id)}
                onClick={() => window.open(exp.link, '_blank')}
              >
                <div className="exp-card-left">
                  <span className="exp-period">{exp.period}</span>
                  {/* Ligne verticale connectrice */}
                  <div className="line-connector"></div>
                </div>
                
                <div className="exp-card-content">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-company">@ {exp.company}</span>
                  
                  <div className="exp-tags">
                    {exp.tags && exp.tags.map(tag => (
                      <span key={tag} className="exp-tag">{tag}</span>
                    ))}
                  </div>
                  
                  {/* Visible uniquement sur mobile */}
                  <p className="exp-desc-mobile">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* COLONNE DROITE : PREVIEW FIXE (STICKY) */}
          <div className="exp-preview-col">
            <div className="preview-card">
              <div className="preview-image-wrapper">
                 <img 
                   src={activeExperience.image} 
                   alt={activeExperience.company}
                   className="preview-image"
                 />
                 {/* Overlay pour assombrir l'image légèrement */}
                 <div className="img-overlay"></div>
              </div>
              
              <div className="preview-details">
                 <h3>{activeExperience.role}</h3>
                 <p>{activeExperience.desc}</p>
                 
                 <button className="visit-btn">
                    Visit Website <span>→</span>
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* STYLE CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        /* --- VARIABLES DE VOTRE THÈME --- */
        .exp-section {
          --accent: #a68064;          /* Votre Marron/Or */
          --bg-main: var(--bg-color); /* Fond global (noir) */
          --text-main: var(--text-main); /* Texte principal (blanc) */
          --text-sub:#a68064;
          --glass-bg: rgba(255, 255, 255, 0.03);
          --glass-border: rgba(255, 255, 255, 0.08);
          
          background-color: var(--bg-main);
          min-height: 100vh;
          padding: 6rem 5%;
          font-family: sans-serif;
          color: var(--text-main);
          position: relative;
          overflow: hidden;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.5;
          pointer-events: none;
        }

        .exp-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* --- HEADER --- */
        .exp-header { margin-bottom: 4rem; }
        .exp-subtitle {
          color: var(--accent);
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .exp-title {
          font-size: 3rem;
          font-family: serif;
          margin: 0;
          color: var(--text-main);
        }

        /* --- LAYOUT --- */
        .exp-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* --- LISTE --- */
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .exp-card {
          display: flex;
          padding: 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          border: 1px solid transparent; /* Bordure invisible par défaut */
          transition: all 0.3s ease;
          background: transparent;
        }

        .exp-card:hover {
          background: var(--glass-bg);
          border-color: var(--glass-border);
          transform: translateX(10px);
        }

        .exp-card.active {
          background: linear-gradient(90deg, rgba(166, 128, 100, 0.1) 0%, transparent 100%);
          border-left: 2px solid var(--accent);
          border-color: var(--accent); /* Bordure colorée si actif */
          transform: translateX(10px);
        }

        /* Gauche de la carte (Date) */
        .exp-card-left {
          min-width: 80px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-right: 1.5rem;
        }
        .exp-period {
          font-family: monospace;
          font-weight: bold;
          color: var(--text-sub);
          font-size: 0.9rem;
        }
        .exp-card.active .exp-period { color: var(--accent); }

        .line-connector {
          width: 1px;
          flex-grow: 1;
          background: var(--glass-border);
          margin-top: 10px;
          margin-left: 5px; /* Centrer sous la date */
        }

        /* Droite de la carte (Infos) */
        .exp-card-content { flex: 1; }
        
        .exp-role {
          margin: 0 0 0.25rem 0;
          font-size: 1.3rem;
          color: var(--text-main);
        }
        
        .exp-company {
          font-size: 0.95rem;
          color: var(--text-sub);
          font-style: italic;
        }

        .exp-tags {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .exp-tag {
          font-size: 0.7rem;
          padding: 4px 10px;
          background: rgba(166, 128, 100, 0.15); /* Fond marron très transparent */
          color: var(--accent);
          border: 1px solid rgba(166, 128, 100, 0.3);
          border-radius: 20px;
        }

        .exp-desc-mobile { display: none; margin-top: 1rem; color: var(--text-sub); font-size: 0.9rem; line-height: 1.5; }

        /* --- PREVIEW COLONNE --- */
        .exp-preview-col {
          position: sticky;
          top: 100px;
        }

        .preview-card {
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .preview-image-wrapper {
          height: 250px;
          position: relative;
          background: #000;
        }
        
        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }
        
        .img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--bg-main) 0%, transparent 100%);
        }

        .preview-details {
          padding: 2rem;
          border-top: 1px solid var(--glass-border);
        }
        
        .preview-details h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          font-family: serif;
          color: var(--text-main);
        }
        
        .preview-details p {
          color: var(--text-sub);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .visit-btn {
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 10px 24px;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .visit-btn:hover {
          background: var(--accent);
          color: white; /* ou noir selon votre préférence */
        }

        /* --- RESPONSIVE MOBILE --- */
        @media (max-width: 900px) {
          .exp-section { padding: 4rem 1.5rem; }
          .exp-title { font-size: 2.2rem; }
          
          .exp-layout { grid-template-columns: 1fr; gap: 2rem; }
          .exp-preview-col { display: none; } /* Cache la colonne droite */

          .exp-card {
            flex-direction: column;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            margin-bottom: 1rem;
            transform: none !important;
          }
          
          .exp-card.active { transform: none; border-left: 1px solid var(--glass-border); }

          .line-connector { display: none; }
          .exp-card-left { margin-bottom: 0.5rem; }
          
          .exp-desc-mobile {
            display: block; /* Affiche la description sur mobile */
          }
        }
      `}} />
    </section>
  );
}