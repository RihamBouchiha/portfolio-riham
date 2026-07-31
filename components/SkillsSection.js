'use client';

import { useState } from 'react';
import styles from './SkillsSection.module.css';
import SkillMatchGame from './SkillMatchGame';
import {
  SiC, SiCplusplus, SiPython, SiJavascript, SiPhp, SiR, SiTypescript,
  SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiBootstrap,
  SiExpress, SiChartdotjs, SiPrisma, SiJson, SiPostman,
  SiApache, SiBabel, SiLinux, SiDotnet, SiFlutter, SiSpringboot,
  SiMysql, SiPostgresql, SiMongodb, SiSqlite, SiMariadb, SiFirebase, SiGit, SiGithub, SiGithubactions, SiJenkins, SiDocker, SiFigma, SiCanva, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy, SiRabbitmq, SiN8N, SiKubernetes, SiPrometheus, SiGrafana, SiNginx, SiTrello
} from 'react-icons/si';
import { FaJava, FaChartBar } from 'react-icons/fa';
import { TbBrandCSharp, TbSql, TbBrandMongodb } from 'react-icons/tb';

const hardSkills = {
  Languages: [{ name: 'C', icon: <SiC /> }, { name: 'C++', icon: <SiCplusplus /> }, { name: 'C#', icon: <TbBrandCSharp /> }, { name: 'Java', icon: <FaJava /> }, { name: 'JavaScript', icon: <SiJavascript /> }, { name: 'TypeScript', icon: <SiTypescript /> }, { name: 'Python', icon: <SiPython /> }, { name: 'PHP', icon: <SiPhp /> }, { name: 'R', icon: <SiR /> }],
  Frameworks: [{ name: 'React', icon: <SiReact /> }, { name: 'React Native', icon: <SiReact /> }, { name: 'Next.js', icon: <SiNextdotjs /> }, { name: 'Node.js', icon: <SiNodedotjs /> }, { name: 'Express.js', icon: <SiExpress /> }, { name: 'Flutter', icon: <SiFlutter /> }, { name: 'Spring Boot', icon: <SiSpringboot /> }, { name: '.NET', icon: <SiDotnet /> }, { name: 'Bootstrap', icon: <SiBootstrap /> }, { name: 'Tailwind', icon: <SiTailwindcss /> }, { name: 'Prisma', icon: <SiPrisma /> }, { name: 'Mongoose', icon: <TbBrandMongodb /> }, { name: 'Chart.js', icon: <SiChartdotjs /> }, { name: 'JSON', icon: <SiJson /> }],
  Databases: [{ name: 'PostgreSQL', icon: <SiPostgresql /> }, { name: 'MySQL', icon: <SiMysql /> }, { name: 'MongoDB', icon: <SiMongodb /> }, { name: 'Firebase', icon: <SiFirebase /> }, { name: 'SQLite', icon: <SiSqlite /> }, { name: 'MariaDB', icon: <SiMariadb /> }, { name: 'SQL Server', icon: <TbSql /> }],
  Tools: [{ name: 'Git', icon: <SiGit /> }, { name: 'Docker', icon: <SiDocker /> }, { name: 'Figma', icon: <SiFigma /> }, { name: 'Canva', icon: <SiCanva /> }, { name: 'Power BI', icon: <FaChartBar /> }, { name: 'Postman', icon: <SiPostman /> }, { name: 'Apache', icon: <SiApache /> }, { name: 'Babel', icon: <SiBabel /> }, { name: 'Linux', icon: <SiLinux /> }],
  DevOps: [{ name: 'Git', icon: <SiGit /> }, { name: 'GitHub', icon: <SiGithub /> }, { name: 'GitHub Actions', icon: <SiGithubactions /> }, { name: 'Jenkins', icon: <SiJenkins /> }, { name: 'Docker', icon: <SiDocker /> }, { name: 'Kubernetes', icon: <SiKubernetes /> }, { name: 'RabbitMQ', icon: <SiRabbitmq /> }, { name: 'n8n', icon: <SiN8N /> }, { name: 'Prometheus', icon: <SiPrometheus /> }, { name: 'Grafana', icon: <SiGrafana /> }, { name: 'Nginx', icon: <SiNginx /> }, { name: 'Trello', icon: <SiTrello /> }],
  AI: [{ name: 'Python', icon: <SiPython /> }, { name: 'TensorFlow', icon: <SiTensorflow /> }, { name: 'PyTorch', icon: <SiPytorch /> }, { name: 'Scikit-learn', icon: <SiScikitlearn /> }, { name: 'Pandas', icon: <SiPandas /> }, { name: 'NumPy', icon: <SiNumpy /> }],
};

const technologyColors = {
  C: '#5c6bc0', 'C++': '#00599c', 'C#': '#8b4bc1', Java: '#e76f00', JavaScript: '#f0bf21', TypeScript: '#3178c6', Python: '#3776ab', PHP: '#777bb4', R: '#276dc3',
  React: '#149eca', 'React Native': '#149eca', 'Next.js': '#1d1d1d', 'Node.js': '#4b9d3e', 'Express.js': '#444', Flutter: '#42a5f5', 'Spring Boot': '#6db33f', '.NET': '#6d3fb5', Bootstrap: '#7952b3', Tailwind: '#22a9c8', Prisma: '#2d3748', Mongoose: '#8f2020', 'Chart.js': '#e85878', JSON: '#333',
  PostgreSQL: '#336791', MySQL: '#4479a1', MongoDB: '#47a248', Firebase: '#f5a300', SQLite: '#1689c0', MariaDB: '#003545', 'SQL Server': '#cc2927', Git: '#f05032', GitHub: '#24292e', Jenkins: '#d24939', Docker: '#2496ed', 'GitHub Actions': '#2088ff', Kubernetes: '#326ce5', RabbitMQ: '#ff6600', n8n: '#ea4b71', Prometheus: '#e6522c', Grafana: '#f46800', Nginx: '#009639', Trello: '#0052cc', Figma: '#f24e1e', Canva: '#00c4cc', 'Power BI': '#f2c811', Postman: '#ff6c37', Apache: '#d22128', Babel: '#f9c928', Linux: '#d6a900', TensorFlow: '#ff6f00', PyTorch: '#ee4c2c', 'Scikit-learn': '#f7931e', Pandas: '#150458', NumPy: '#4dabcf',
};

export default function SkillsSection({ language }) {
  const [skillKind, setSkillKind] = useState('hard');
  const [activeTab, setActiveTab] = useState('Languages');
  const [discovered, setDiscovered] = useState([]);
  const isFrench = language === 'fr';
  const copy = language === 'fr'
    ? { eyebrow: 'L’ATELIER DE MES COMPÉTENCES', title: 'Technique &<br />humain, en équilibre.', intro: 'Un espace où la précision technique rencontre la curiosité, la créativité et le travail d’équipe.', hard: 'Hard skills', soft: 'Soft skills', tabs: { Languages: 'Langages', Frameworks: 'Frameworks', Databases: 'Bases de données', Tools: 'Outils', AI: 'Intelligence artificielle' }, softSkills: [{ title: 'Résolution de problèmes', detail: 'Transformer la complexité en solutions concrètes.' }, { title: 'Esprit d’analyse', detail: 'Comprendre les systèmes avant de les améliorer.' }, { title: 'Créativité', detail: 'Imaginer des expériences utiles qui marquent.' }, { title: 'Communication', detail: 'Rendre les idées claires et accessibles.' }, { title: 'Esprit d’équipe', detail: 'Construire avec écoute, confiance et partage.' }, { title: 'Adaptabilité', detail: 'Apprendre vite et évoluer avec le contexte.' }, { title: 'Organisation', detail: 'Avancer avec méthode, jusqu’au détail.' }, { title: 'Curiosité', detail: 'Explorer sans cesse les outils et les idées.' }, { title: 'Autonomie', detail: 'Prendre des initiatives et les mener à bien.' }] }
    : { eyebrow: 'MY SKILLS STUDIO', title: 'Technical &<br />human, in balance.', intro: 'A space where technical precision meets curiosity, creativity and teamwork.', hard: 'Hard skills', soft: 'Soft skills', tabs: { Languages: 'Languages', Frameworks: 'Frameworks', Databases: 'Databases', Tools: 'Tools', AI: 'Artificial intelligence' }, softSkills: [{ title: 'Problem solving', detail: 'Turning complexity into concrete solutions.' }, { title: 'Analytical mindset', detail: 'Understanding systems before improving them.' }, { title: 'Creativity', detail: 'Imagining useful experiences that leave a mark.' }, { title: 'Communication', detail: 'Making ideas clear and accessible.' }, { title: 'Team spirit', detail: 'Building through trust and active listening.' }, { title: 'Adaptability', detail: 'Learning fast and evolving with context.' }, { title: 'Organisation', detail: 'Moving forward with care and method.' }, { title: 'Curiosity', detail: 'Continuously exploring tools and ideas.' }, { title: 'Autonomy', detail: 'Taking initiative and carrying it through.' }] };
  const displayedSkills = hardSkills[activeTab];
  const toggleDiscovery = (name) => setDiscovered((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);

  return <SkillMatchGame language={language} hardSkills={hardSkills} technologyColors={technologyColors} />;

  return (
    <section id="skills" className={styles.game}>
      <div className={styles.gameStars} aria-hidden="true">✦　·　✧　·　✦</div>
      <div className={styles.gameShell}>
        <header className={styles.gameHeader}><div><p>SKILL QUEST — RIHAM.B</p><h2>{isFrench ? 'Choisis un monde,<br />découvre mes pouvoirs.' : 'Choose a world,<br />discover my powers.'}</h2></div><div className={styles.score}><span>COLLECTION</span><strong>{String(discovered.length).padStart(2, '0')}</strong><small> / {skillKind === 'hard' ? displayedSkills.length : copy.softSkills.length}</small></div></header>
        <div className={styles.worlds} role="tablist"><button type="button" role="tab" aria-selected={skillKind === 'hard'} onClick={() => setSkillKind('hard')}><span>⌘</span><strong>{copy.hard}</strong><small>{isFrench ? 'Le laboratoire' : 'The lab'}</small></button><button type="button" role="tab" aria-selected={skillKind === 'soft'} onClick={() => setSkillKind('soft')}><span>♡</span><strong>{copy.soft}</strong><small>{isFrench ? 'Les super-pouvoirs' : 'Super powers'}</small></button></div>
        <div className={styles.gameBoard} key={skillKind}>
          <div className={styles.boardTop}><span>{skillKind === 'hard' ? 'LEVEL SELECT' : 'POWER-UP SELECT'}</span><span>{isFrench ? 'Clique sur une carte' : 'Click a card'}</span></div>
          {skillKind === 'hard' ? <><nav className={styles.levels}>{Object.keys(hardSkills).map((tab, index) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} aria-current={activeTab === tab}><span>0{index + 1}</span>{copy.tabs[tab]}</button>)}</nav><div className={styles.collectibleGrid}>{displayedSkills.map((skill, index) => { const id = `${activeTab}-${skill.name}-${index}`; const isFound = discovered.includes(id); return <button type="button" className={`${styles.collectible} ${isFound ? styles.found : ''}`} key={id} onClick={() => toggleDiscovery(id)}><span className={styles.collectIcon} style={{ color: technologyColors[skill.name] }}>{skill.icon}</span><strong>{skill.name}</strong><small>{isFound ? (isFrench ? 'Trouvé !' : 'Found!') : `+${index + 1} XP`}</small></button>; })}</div></> : <div className={styles.powerGrid}>{copy.softSkills.map((skill, index) => { const id = `soft-${skill.title}`; const isFound = discovered.includes(id); return <button type="button" className={`${styles.powerCard} ${isFound ? styles.found : ''}`} key={skill.title} onClick={() => toggleDiscovery(id)}><span>✦ 0{index + 1}</span><h3>{skill.title}</h3><p>{skill.detail}</p><i>{isFound ? '✓' : '+'}</i></button>; })}</div>}
        </div>
      </div>
    </section>
  );
}
