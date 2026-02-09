'use client';
import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';

export default function PortfolioSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "RHK-Hotel",
      category: "Hotel Management Platform",
      description: "Une solution complète de gestion hôtelière permettant les réservations en ligne, la gestion des chambres et l'administration du personnel.",
      role: "Full Stack Dev",
      image: "r.png", 
      link: "https://rihambouchiha.github.io/PFE-HOTEL-RHK-Riham/riham/indexRiham1.html",
      github: "https://github.com/RihamBouchiha"
    },
    {
      id: 2,
      title: "Gusto Rh",
      category: "Human Resources Web App",
      description: "Plateforme RH intuitive pour la gestion des employés, des congés et de la paie, optimisant les processus internes.",
      role: "UI/UX & Frontend",
      image: "gusto2.png",
      link: "https://github.com/RihamBouchiha/grh",
      github: "https://github.com/RihamBouchiha/grh"
    },
    {
      id: 3,
      title: "L'oisis Intime",
      category: "Guesthouse Website",
      description: "Site vitrine élégant pour une maison d'hôtes, mettant en valeur les espaces et facilitant la prise de contact.",
      role: "Design & Dev",
      image: "oasis.png",
      link: "https://rihambouchiha.github.io/maison-d-h-tes-/",
      github: "https://github.com/RihamBouchiha"
    },
    {
      id: 4,
      title: "Eclairage Publique",
      category: "Public lighting mobile app",
      description: "Application mobile pour le signalement et la maintenance de l'éclairage public dans la ville.",
      role: "Mobile Dev",
      image: "eclairage.png",
      link: "https://github.com/RihamBouchiha/eclairage_public",
      github: "https://github.com/RihamBouchiha/eclairage_public"
    },
    {
      id: 5,
      title: "QuizzMaster App",
      category: "Quiz Mobile App",
      description: "Jeu de quiz interactif sur mobile pour tester ses connaissances avec un système de score en temps réel.",
      role: "Mobile Dev",
      image: "quizzMaster.png",
      link: "https://github.com/Ay0u8dev/quiz_master",
      github: "https://github.com/Ay0u8dev/quiz_master"
    }
  ];

  if (!mounted) return null;

  return (
    <section id="portfolio" className="portfolio-section">
      {/* CSS INTERNE POUR GARANTIR LE STYLE */}
      <style dangerouslySetInnerHTML={{__html: `
        .portfolio-section {
          /* UTILISATION DES VARIABLES GLOBALES */
          background-color: var(--bg-color);
          color: var(--text-main);
          
          --accent-color: #a68064;
          --border-light: rgba(125, 125, 125, 0.2);
          
          padding: 6rem 5%;
          position: relative;
          overflow: hidden;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* HEADER */
        .section-header {
          text-align: center;
          margin-bottom: 6rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .header-label {
          color: var(--accent-color);
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-size: 0.85rem;
          display: block;
          margin-bottom: 1rem;
        }
        .header-title {
          font-size: 3rem;
          font-family: serif; /* Ou votre police titre */
          margin: 0;
          line-height: 1.2;
        }

        /* CONTAINER PROJETS */
        .projects-container {
          display: flex;
          flex-direction: column;
          gap: 8rem; /* Espace entre les projets */
          max-width: 1200px;
          margin: 0 auto;
        }

        /* PROJET ITEM (ZIG ZAG) */
        .project-item {
          display: flex;
          align-items: center;
          gap: 4rem;
        }
        /* Inverse l'ordre une fois sur deux */
        .project-item.reverse {
          flex-direction: row-reverse;
        }

        /* IMAGE SIDE */
        .project-visual {
          flex: 1.2;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transition: transform 0.4s ease;
          background-color: rgba(125,125,125,0.1); /* Placeholder gris */
        }
        .project-visual:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }
        .project-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .project-visual:hover .project-img {
          transform: scale(1.03);
        }

        /* TEXT SIDE */
        .project-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .project-num {
          font-size: 4rem;
          font-weight: 700;
          color: var(--text-main);
          opacity: 0.05;
          line-height: 1;
          margin-bottom: -1rem;
          margin-left: -5px;
        }

        .project-category {
          color: var(--accent-color);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }

        .project-title {
          font-size: 2.2rem;
          margin: 0 0 1.5rem 0;
          font-family: serif;
        }

        .project-desc {
          font-size: 1rem;
          opacity: 0.7;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .tech-pill {
          display: inline-block;
          padding: 6px 12px;
          border: 1px solid var(--border-light);
          border-radius: 20px;
          font-size: 0.75rem;
          margin-bottom: 2rem;
          opacity: 0.8;
        }

        /* BOUTONS */
        .actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background-color: var(--text-main); /* Contraste fort */
          color: var(--bg-color);
          border: 1px solid var(--text-main);
        }
        .btn-primary:hover {
          background-color: transparent;
          color: var(--text-main);
        }

        .btn-outline {
          background-color: transparent;
          color: var(--text-main);
          border: 1px solid var(--border-light);
        }
        .btn-outline:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        /* RESPONSIVE MOBILE */
        @media (max-width: 900px) {
          .project-item, .project-item.reverse {
            flex-direction: column;
            gap: 2rem;
          }
          .projects-container {
            gap: 5rem;
          }
          .section-header {
            margin-bottom: 4rem;
          }
          .header-title {
            font-size: 2.2rem;
          }
          .project-title {
            font-size: 1.8rem;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="section-header">
        <span className="header-label">Portfolio</span>
        <h2 className="header-title">Selected Works</h2>
      </div>

      {/* LISTE DES PROJETS */}
      <div className="projects-container">
        {projects.map((project, index) => {
          // On inverse l'ordre si l'index est impair (1, 3, 5...)
          const isReverse = index % 2 !== 0;

          return (
            <div key={project.id} className={`project-item ${isReverse ? 'reverse' : ''}`}>
              
              {/* IMAGE */}
              <div className="project-visual">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <img src={project.image} alt={project.title} className="project-img" />
                </a>
              </div>

              {/* CONTENU */}
              <div className="project-content">
                <div className="project-num">0{index + 1}</div>
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                
                {/* Description ajoutée dans le tableau de données plus haut */}
                <p className="project-desc">
                  {project.description || "Un projet innovant développé avec passion pour répondre aux besoins utilisateurs."}
                </p>

                <div className="tech-badge">
                  <span className="tech-pill">{project.role}</span>
                </div>

                <div className="actions">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Live Demo <FiArrowRight />
                  </a>
                  <a href={project.github || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <FiGithub /> Code
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}