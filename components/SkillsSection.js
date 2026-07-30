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
import { TbBrandCSharp, TbSql, TbBrandMongodb } from 'react-icons/tb';

export default function SkillsSection({ language }) {
  const [activeTab, setActiveTab] = useState('Languages');
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const copy = language === 'fr'
    ? {
        heading: 'Univers des compétences',
        subtitle: 'Un mélange de logique, d’outils modernes et de goût pour l’expérience utilisateur.',
        tabs: { Languages: 'Langages', Frameworks: 'Frameworks', Databases: 'Bases de données', Tools: 'Outils' }
      }
    : {
        heading: 'Skills universe',
        subtitle: 'A blend of logic, modern tooling and a strong eye for user experience.',
        tabs: { Languages: 'Languages', Frameworks: 'Frameworks', Databases: 'Databases', Tools: 'Tools' }
      };

  const skillsData = {
    Languages: [
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
    Frameworks: [
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
    Databases: [
      { name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1" /> },
      { name: 'MySQL', icon: <SiMysql color="#4479A1" /> },
      { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
      { name: 'SQLite', icon: <SiSqlite color="#169ad7" /> },
      { name: 'MariaDB', icon: <SiMariadb color="#003545" /> },
      { name: 'SQL Server', icon: <TbSql color="#CC2927" /> },
    ],
    Tools: [
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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      if (!isHovered) {
        setRotation((prev) => prev + 0.4);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered]);

  if (!mounted) return null;

  const currentSkills = skillsData[activeTab] || [];
  const rx = isMobile ? 150 : (currentSkills.length > 10 ? 380 : 320);
  const ry = isMobile ? 60 : 120;
  const centerCardSize = isMobile ? '100px' : '140px';
  const skillCardSize = isMobile ? '58px' : '86px';
  const iconSize = isMobile ? '1.35rem' : '1.8rem';
  const titleSize = isMobile ? '2rem' : '3rem';

  return (
    <section id="skills" style={{
      minHeight: '100vh', width: '100vw',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '4rem 1rem', perspective: '1500px'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(166,128,100,0.16), transparent 58%)', pointerEvents: 'none' }} />

      <div style={{ zIndex: 100, textAlign: 'center', marginBottom: isMobile ? '1rem' : '1.5rem', padding: '0 10px' }}>
        <span className="pill" style={{ marginBottom: '0.75rem' }}>{language === 'fr' ? 'Compétences' : 'Skills'}</span>
        <h2 style={{ fontSize: titleSize, fontFamily: 'serif', color: 'var(--accent)', margin: 0, fontWeight: '900' }}>
          {copy.heading}
        </h2>
        <p style={{ marginTop: '0.7rem', color: 'var(--text-sub)', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          {copy.subtitle}
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          {Object.keys(skillsData).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setRotation(0); }}
              style={{
                background: activeTab === tab ? '#a68064' : 'rgba(255,255,255,0.72)',
                color: activeTab === tab ? 'white' : '#a68064',
                border: '1px solid rgba(166, 128, 100, 0.3)', padding: '7px 12px', borderRadius: '999px',
                cursor: 'pointer', transition: '0.3s', fontWeight: '700', fontSize: isMobile ? '0.65rem' : '0.75rem'
              }}
            >
              {copy.tabs[tab]}
            </button>
          ))}
        </div>
      </div>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative', width: '100%', maxWidth: '920px', height: isMobile ? '300px' : '420px',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <div className="glass-card" style={{
          width: centerCardSize, height: centerCardSize, borderRadius: '32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, borderBottom: '5px solid var(--accent)', background: 'var(--surface-strong)'
        }}>
          <span style={{ fontSize: isMobile ? '1.2rem' : '1.6rem' }}>✦</span>
          <span style={{ fontSize: isMobile ? '0.7rem' : '0.85rem', fontWeight: '700', color: '#a68064', marginTop: '5px' }}>{copy.tabs[activeTab]}</span>
        </div>

        {currentSkills.map((skill, index) => {
          const angle = ((index / currentSkills.length) * Math.PI * 2) + (rotation * Math.PI / 180);
          const x = Math.cos(angle) * rx;
          const y = Math.sin(angle) * ry;
          const factor = (y + ry) / (2 * ry);
          const scale = 0.48 + (factor * 0.62);

          return (
            <div key={`${skill.name}-${index}`} style={{
              position: 'absolute', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`,
              transform: `translate(-50%, -50%) scale(${scale})`, opacity: 0.45 + (factor * 0.55),
              filter: y > 0 ? 'none' : `blur(${(1 - factor) * 2}px)`, zIndex: Math.round(factor * 100)
            }}>
              <div className="glass-card" style={{
                width: skillCardSize, height: skillCardSize, borderRadius: '22px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.84)', boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{ fontSize: iconSize }}>{skill.icon}</div>
                <span style={{
                  fontSize: '0.6rem', fontWeight: '700', color: '#a68064',
                  marginTop: '4px', textAlign: 'center', width: '100%', padding: '0 2px',
                  display: isMobile ? 'none' : 'block'
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