'use client';
import { useState, useEffect, useRef } from 'react';

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
      role: "Full Stack Dev",
      image: "r.png", 
      link: "https://rihambouchiha.github.io/PFE-HOTEL-RHK-Riham/riham/indexRiham1.html"
    },
    {
      id: 2,
      title: "Gusto Rh",
      category: "Human Resources Web App",
      role: "UI/UX & Frontend",
      image: "gusto2.png",
      link: "https://github.com/RihamBouchiha/grh"
    },
    {
      id: 3,
      title: "L'oisis Intime",
      category: "Guesthouse Website",
      role: "Design & Dev",
      image: "oasis.png",
      link: "https://rihambouchiha.github.io/maison-d-h-tes-/"
    },
    {
      id: 4,
      title: "Eclairage Publique",
      category: "Public lighting mobile app",
      role: "Mobile Dev",
      image: "eclairage.png",
      link: "https://github.com/RihamBouchiha/eclairage_public"
    },
    {
      id: 5,
      title: "QuizzMaster App",
      category: "Quiz Mobile App",
      role: "Mobile Dev",
      image: "quizzMaster.png",
      link: "https://github.com/Ay0u8dev/quiz_master"
    }
  ];

  if (!mounted) return null;

  return (
    <section id="portfolio" style={{
      backgroundColor: 'var(--inner-avatar)', // S'adapte au thème global
      paddingBottom: '10vh', // Espace à la fin
      transition: 'background-color 0.3s'
    }}>
      
      {/* HEADER FIXE (Introduction) */}
      <div style={{
        padding: '6rem 8% 2rem 8%',
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '0.9rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#a68064',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          Selected Works
        </p>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontFamily: 'serif',
          color: 'var(--text-main)',
          lineHeight: '1.2'
        }}>
          Featured Projects
        </h2>
      </div>

      {/* ZONE D'EMPILEMENT (STACK) */}
      <div style={{
        position: 'relative',
        width: '100%',
        padding: '0 5%'
      }}>
        {projects.map((project, index) => {
          // Calcul du décalage pour l'effet "carte"
          const topOffset = 100 + (index * 40); 
          
          return (
            <div 
              key={project.id} 
              className="project-card"
              style={{
                position: 'sticky', // LA MAGIE EST ICI
                top: `${120 + index * 30}px`, // Chaque carte s'arrête un peu plus bas que la précédente
                height: '70vh', // Hauteur de la carte
                maxWidth: '1200px',
                margin: '0 auto 4rem auto', // Marge en bas pour scroller
                backgroundColor: 'var(--bg-color)', // Fond de la carte = fond du site
                borderRadius: '30px',
                border: '1px solid rgba(166, 128, 100, 0.2)', // Bordure subtile couleur or/marron
                boxShadow: '0 -10px 40px rgba(0,0,0,0.05)', // Ombre vers le haut
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row', // PC : Texte à gauche, Image à droite
                transition: 'transform 0.5s ease',
                zIndex: index + 1
              }}
            >
              
              {/* CÔTÉ GAUCHE : TEXTE */}
              <div style={{
                flex: '1',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRight: '1px solid rgba(166, 128, 100, 0.1)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
              }}>
                {/* Numéro du projet */}
                <span style={{
                  fontSize: '4rem',
                  fontFamily: 'serif',
                  color: 'var(--text-main)',
                  opacity: 0.1,
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  0{index + 1}
                </span>

                <h3 style={{
                  fontSize: '2.5rem',
                  fontFamily: 'serif',
                  color: 'var(--text-main)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.1
                }}>
                  {project.title}
                </h3>
                
                <span style={{
                  fontSize: '0.9rem',
                  color: '#a68064',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '1.5rem',
                  display: 'block'
                }}>
                  {project.category}
                </span>

                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <a href={project.link} style={{
                    textDecoration: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    border: '1px solid var(--text-main)',
                    color: 'var(--text-main)',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--text-main)';
                    e.currentTarget.style.color = 'var(--bg-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-main)';
                  }}
                  >
                    See More
                    <span style={{ fontSize: '1.2rem' }}>→</span>
                  </a>
                </div>
              </div>

              {/* CÔTÉ DROIT : IMAGE */}
              <div style={{
                flex: '1.5',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a' // Placeholder background
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.2)', // Léger filtre pour le contraste
                  zIndex: 1
                }}></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s ease',
                  }}
                  // Effet de zoom au survol via CSS inline + class
                  className="project-image"
                />
              </div>

            </div>
          );
        })}
      </div>
      
      {/* CSS pour le responsive (Mobile) */}
      <style jsx>{`
        @media (max-width: 900px) {
          .project-card {
            flex-direction: column !important;
            height: auto !important;
            min-height: 60vh;
            top: 100px !important; /* Moins d'effet sticky sur mobile */
          }
          .project-image {
            height: 300px !important;
          }
        }
        .project-card:hover .project-image {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}