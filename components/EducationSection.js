'use client';
import { useRef, useEffect, useState } from 'react';

export default function EducationSection() {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  const educationData = [
    {
      id: 1,
      school: "Ecole Nationale de l'IA et du Digital",
      degree: "Software Engineering Degree",
      year: "2024 - Present",
      image: "eniad.png", 
      color: "#a68064",
      link: "https://eniad.ump.ma/"
    },
    {
      id: 2,
      school: "Ecole Supérieure de Technologie de Fès",
      degree: "DUT - Computer Science",
      year: "2022 - 2024",
      image: "estf.png",
      color: "#8b6b52",
      link: "https://www.est-usmba.ac.ma/"
    },
    {
      id: 3,
      school: "Faculté de Médecine Strasbourg",
      degree: "L1 SPS - Spé Physique",
      year: "2021 - 2022",
      image: "image.png",
      color: "#775535",
      link: "https://med.unistra.fr/"
    },
    {
      id: 4,
      school: "University of Strasbourg",
      degree: "L1 spé Physique",
      year: "2021 - 2022",
      image: "unistra.png",
      color: "#634329",
      link: "https://www.unistra.fr/fr"
    },
    {
      id: 5,
      school: "Lycée Abi Abass Sebti",
      degree: "Baccalauréat Sciences Physiques",
      year: "2020 - 2021",
      image: "lycee.png",
      color: "#4e3422",
      link: "#"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: 0.1 } // Seuil légèrement réduit pour le mobile
    );

    const items = document.querySelectorAll('.edu-item');
    items.forEach((item) => observer.observe(item));

    return () => items.forEach((item) => observer.unobserve(item));
  }, []);

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="education-section"
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: 'var(--about-bg)', // Assurez-vous que cette var existe, sinon mettez une couleur hex
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Titre Stylisé */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 2, padding: '0 1rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          textTransform: 'uppercase', 
          letterSpacing: '4px', 
          color: 'var(--text-sub, #888)',
          marginBottom: '0.5rem'
        }}>
          My Academic Journey
        </h3>
        <h2 className="section-title" style={{ 
          fontFamily: 'serif', 
          color: 'var(--about-star, #333)', 
          margin: 0,
          lineHeight: 1.1
        }}>
          Education
        </h2>
      </div>

      {/* Ligne centrale décorative (Masquée sur mobile via CSS) */}
      <div className="central-line" style={{
        position: 'absolute',
        top: '200px',
        bottom: '100px',
        left: '50%',
        width: '2px',
        background: 'linear-gradient(to bottom, transparent, #a68064, transparent)',
        opacity: 0.2,
        transform: 'translateX(-50%)',
        zIndex: 0
      }} />

      {/* Conteneur des items */}
      <div style={{ width: '100%', maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
        {educationData.map((item, index) => {
          const isEven = index % 2 === 0;
          const isVisible = visibleItems.includes(index);

          return (
            <div 
              key={item.id}
              className="edu-item"
              data-index={index}
              style={{
                display: 'flex',
                // Le justify-content sera écrasé par le CSS mobile
                justifyContent: isEven ? 'flex-start' : 'flex-end',
                marginBottom: '6rem',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                // On garde l'animation Y ici, l'animation X est gérée dans la carte
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)'
              }}
            >
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="edu-card-container"
                style={{
                  display: 'flex',
                  // Inline style par défaut (Desktop)
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  alignItems: 'flex-start',
                  width: '100%',
                  maxWidth: '900px', 
                  gap: '2rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer'
                }} 
              >
                
                {/* 1. L'IMAGE (Polaroid) */}
                <div className="img-wrapper" style={{
                  flexShrink: 0,
                  width: '240px',
                  height: '300px',
                  backgroundColor: '#fff',
                  padding: '10px 10px 40px 10px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  // Rotation conditionnelle (Desktop)
                  transform: isVisible ? `rotate(${isEven ? '-3deg' : '3deg'}) scale(1)` : 'scale(0.8)',
                  transition: 'transform 0.5s ease 0.2s',
                  zIndex: 2,
                  borderRadius: '4px',
                  marginTop: '20px'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    overflow: 'hidden', 
                    backgroundColor: '#eee',
                    position: 'relative'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.school}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(20%)' }} 
                    />
                    <div style={{ 
                      display: 'none', 
                      width: '100%', height: '100%', 
                      alignItems: 'center', justifyContent: 'center',
                      color: '#999', fontSize: '0.8rem', flexDirection: 'column'
                    }}>
                      <span>No Image</span>
                    </div>
                  </div>
                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '10px', 
                    fontFamily: 'cursive', 
                    color: '#555', 
                    fontSize: '0.9rem' 
                  }}>
                    {item.year.split(' ')[0]}
                  </div>
                </div>

                {/* 2. LE TEXTE (Carte) */}
                <div className="glass-card" style={{
                  flexGrow: 1,
                  padding: '2.5rem',
                  position: 'relative',
                  // Alignement Desktop
                  textAlign: isEven ? 'left' : 'right',
                  backdropFilter: 'blur(12px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  // Animation latérale (Desktop seulement, sera écrasée sur mobile)
                  transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-50px' : '50px'})`,
                  transition: 'transform 0.8s ease 0.1s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isEven ? 'flex-start' : 'flex-end'
                }}>
                  
                  {/* Point de couleur */}
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    boxShadow: `0 0 0 4px var(--about-bg, #fff), 0 0 10px ${item.color}`,
                    marginBottom: '1.5rem'
                  }}></div>

                  <span style={{
                    display: 'inline-block',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    backgroundColor: `${item.color}22`,
                    color: item.color,
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    marginBottom: '1rem'
                  }}>
                    {item.year}
                  </span>
                  
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    color: 'var(--text-main, #000)', 
                    marginBottom: '0.5rem',
                    fontFamily: 'serif',
                    lineHeight: 1.2
                  }}>
                    {item.school}
                  </h3>
                  
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    color: 'var(--text-sub, #555)', 
                    fontWeight: '400',
                    fontStyle: 'italic',
                    opacity: 0.8
                  }}>
                    {item.degree}
                  </h4>

                  {/* Numéro en fond */}
                  <div className="bg-number" style={{
                    position: 'absolute',
                    bottom: '10px',
                    [isEven ? 'right' : 'left']: '20px',
                    fontSize: '5rem',
                    fontWeight: '900',
                    color: item.color,
                    opacity: 0.05,
                    pointerEvents: 'none',
                    fontFamily: 'sans-serif'
                  }}>
                    0{item.id}
                  </div>
                </div>
              </a>

            </div>
          );
        })}
      </div>

      <style jsx>{`
        /* Style de base (Desktop) */
        .education-section {
          padding: 6rem 5%;
        }
        .section-title {
          font-size: 3.5rem;
        }

        /* --- RESPONSIVE MOBILE (< 768px) --- */
        @media (max-width: 768px) {
          .education-section {
            padding: 4rem 1rem !important;
          }
          
          /* On cache la ligne centrale */
          .central-line {
            display: none !important;
          }

          .section-title {
            font-size: 2.5rem !important;
          }
          
          /* On centre l'item global */
          .edu-item {
            justify-content: center !important;
            margin-bottom: 4rem !important;
          }

          /* Important : On force la colonne et on écrase le style inline row/reverse */
          .edu-card-container {
            flex-direction: column !important; 
            gap: 1.5rem !important;
            align-items: center !important;
            max-width: 100% !important;
          }

          /* Reset de l'image (plus de rotation, taille adaptée) */
          .img-wrapper {
            width: 200px !important;
            height: 250px !important;
            transform: none !important; /* Annule la rotation et le scale */
            margin-top: 0 !important;
          }

          /* Reset de la carte texte */
          .glass-card {
            width: 100% !important;
            text-align: center !important;
            align-items: center !important;
            /* Annule le translateX de l'animation d'entrée latérale pour éviter le scroll horizontal */
            transform: none !important; 
            padding: 2rem 1.5rem !important;
          }
          
          /* Repositionnement du numéro de fond */
          .bg-number {
             left: auto !important;
             right: 10px !important;
             font-size: 3rem !important;
             bottom: 5px !important;
          }
        }
      `}</style>
    </section>
  );
}