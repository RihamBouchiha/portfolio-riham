'use client';
import { useState, useEffect } from 'react';
import { 
  SiC, SiCplusplus, SiPython, SiJavascript, SiPhp, SiR, SiGnubash, 
  SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiBootstrap,
  SiExpress, SiJquery, SiChartdotjs, SiPrisma, SiJson, SiPostman,
  SiApache, SiBabel, SiLinux, SiDotnet, SiFlutter, SiSpringboot,
  SiMysql, SiPostgresql, SiMongodb, SiSqlite, SiMariadb,
  SiGit, SiDocker, SiFigma 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa'; 
import { TbBrandCSharp, TbMathFunction, TbSql, TbBrandMongodb } from 'react-icons/tb';

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('Languages');
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Nouvel état pour gérer le mobile
  const [isMobile, setIsMobile] = useState(false);

  const skillsData = {
    'Languages': [
      { name: 'C', icon: <SiC color="#775535" /> },
      { name: 'C++', icon: <SiCplusplus color="#00599C" /> },
      { name: 'C#', icon: <TbBrandCSharp color="#239120" /> },
      { name: 'Java', icon: <FaJava color="#de4605" /> },
      { name: 'JS', icon: <SiJavascript color="#F7DF1E" /> },
      { name: 'Python', icon: <SiPython color="#3776AB" /> },
      { name: 'PHP', icon: <SiPhp color="#777BB4" /> },
      { name: 'Bash', icon: <SiGnubash color="#4EAA25" /> },
      { name: 'R', icon: <SiR color="#276DC3" /> },
    ],
    'Frameworks': [
      { name: 'React', icon: <SiReact color="#61DAFB" /> },
      { name: 'React Native', icon: <SiReact color="#1b5c6e" /> },
      { name: 'Next.js', icon: <SiNextdotjs color="#000000" /> },
      { name: 'Node.js', icon: <SiNodedotjs color="#339933" /> },
      { name: 'Express.js', icon: <SiExpress color="#000000" /> },
      { name: 'Flutter', icon: <SiFlutter color="#2694ee" /> },
      { name: 'Spring Boot', icon: <SiSpringboot color="#6DB33F" /> },
      { name: '.NET', icon: <SiDotnet color="#512BD4" /> },
      { name: 'Bootstrap', icon: <SiBootstrap color="#7952B3" /> },
      { name: 'Tailwind', icon: <SiTailwindcss color="#06B6D4" /> },
      { name: 'jQuery', icon: <SiJquery color="#0769AD" /> },
      { name: 'Prisma', icon: <SiPrisma color="#2D3748" /> },
      { name: 'Mongoose', icon: <TbBrandMongodb color="#880000" /> },
      { name: 'Chart.js', icon: <SiChartdotjs color="#FF6384" /> },
      { name: 'JSON', icon: <SiJson color="#000000" /> },
    ],
    'Databases': [
      { name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1" /> },
      { name: 'MySQL', icon: <SiMysql color="#4479A1" /> },
      { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
      { name: 'SQLite', icon: <SiSqlite color="#169ad7" /> },
      { name: 'MariaDB', icon: <SiMariadb color="#003545" /> },
      { name: 'SQL Server', icon: <TbSql color="#CC2927" /> }, 
    ],
    'Tools': [
      { name: 'Git', icon: <SiGit color="#F05032" /> },
      { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
      { name: 'Figma', icon: <SiFigma color="#f21e76" /> },
      { name: 'Postman', icon: <SiPostman color="#FF6C37" /> },
      { name: 'Apache', icon: <SiApache color="#D22128" /> },
      { name: 'Babel', icon: <SiBabel color="#F9DC3E" /> },
      { name: 'Linux', icon: <SiLinux color="#FCC624" /> },
    ]
  };

  useEffect(() => {
    setMounted(true);
    
    // Détection de la taille d'écran
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initialisation
    handleResize();
    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      if (!isHovered) {
        setRotation(prev => prev + 0.4);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered]);

  if (!mounted) return null;

  const currentSkills = skillsData[activeTab] || [];

  // --- CONFIGURATION RESPONSIVE ---
  // Si mobile, on réduit drastiquement le rayon (150px), sinon on garde le grand rayon
  const rx = isMobile ? 150 : (currentSkills.length > 10 ? 380 : 320); 
  const ry = isMobile ? 60 : 120; // On aplatit l'ovale sur mobile
  const centerCardSize = isMobile ? '100px' : '140px';
  const skillCardSize = isMobile ? '60px' : '90px';
  const iconSize = isMobile ? '1.5rem' : '2rem';
  const titleSize = isMobile ? '2rem' : '3rem';

  return (
    <section id="skills" style={{
      height: '100vh', width: '100vw', backgroundColor: 'var(--bg-color)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
      perspective: '1500px'
    }}>
      
      <style jsx>{`
        .glass-card {
          background: rgb(255, 255, 255);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(210, 210, 210, 0.96);
          box-shadow: 0 15px 35px rgb(158, 158, 158);
          transition: all 0.4s ease;
        }
      `}</style>

      {/* HEADER SECTION */}
      <div style={{ zIndex: 100, textAlign: 'center', marginBottom: isMobile ? '1rem' : '2rem', padding: '0 10px' }}>
        <h2 style={{ fontSize: titleSize, fontFamily: 'serif', color: '#a68064', margin: 0, fontWeight: '900' }}>
          Skills <span style={{ fontWeight: '100', fontStyle: 'italic' }}>Universe</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          {Object.keys(skillsData).map(tab => (
            <button 
              key={tab} 
              onClick={() => { setActiveTab(tab); setRotation(0); }} 
              style={{
                background: activeTab === tab ? '#a68064' : 'rgba(251, 251, 251, 0.78)',
                color: activeTab === tab ? 'white' : '#a68064',
                border: '1px solid #a68064', padding: '6px 12px', borderRadius: '30px',
                cursor: 'pointer', transition: '0.3s', fontWeight: 'bold', fontSize: isMobile ? '0.65rem' : '0.75rem'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CERCLE CONTAINER */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '900px', 
          height: isMobile ? '300px' : '400px', // Hauteur réduite sur mobile
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        {/* OPTIONNEL: Si tu veux remettre le cercle visible, décommente la ligne ci-dessous */}
        {/* <div style={{ position: 'absolute', width: rx * 2, height: ry * 2, border: '2px dashed #a68064', borderRadius: '50%', opacity: 0.3, pointerEvents: 'none' }} /> */}

        {/* CENTRE */}
        <div className="glass-card" style={{
          width: centerCardSize, height: centerCardSize, borderRadius: '40px', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, borderBottom: '5px solid #a68064'
        }}>
          <span style={{ fontSize: '1.8rem' }}></span>
          <span style={{ fontSize: isMobile ? '0.7rem' : '0.85rem', fontWeight: 'bold', color: '#a68064', marginTop: '5px' }}>{activeTab}</span>
        </div>

        {/* ORBITE DES SKILLS */}
        {currentSkills.map((skill, index) => {
          const angle = ((index / currentSkills.length) * Math.PI * 2) + (rotation * Math.PI / 180);
          
          // Utilisation des rx/ry dynamiques
          const x = Math.cos(angle) * rx;
          const y = Math.sin(angle) * ry;
          const factor = (y + ry) / (2 * ry); 
          const scale = 0.5 + (factor * 0.6); 

          return (
            <div key={`${skill.name}-${index}`} style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: 0.4 + (factor * 0.6),
              filter: y > 0 ? 'none' : `blur(${(1 - factor) * 2}px)`,
              zIndex: Math.round(factor * 100),
            }}>
              <div className="glass-card" style={{
                width: skillCardSize, height: skillCardSize, borderRadius: '20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontSize: iconSize }}>{skill.icon}</div>
                <span style={{ 
                  fontSize: '0.6rem', fontWeight: 'bold', color: '#a68064', 
                  marginTop: '4px', textAlign: 'center', width: '100%', padding: '0 2px',
                  display: isMobile ? 'none' : 'block' // Optionnel: cache le texte sur mobile si trop petit
                }}>
                  {skill.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}