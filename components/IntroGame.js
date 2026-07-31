'use client';

import { useState } from 'react';
import { FiArrowRight, FiCheck, FiCode, FiCpu, FiPenTool } from 'react-icons/fi';
import styles from './IntroGame.module.css';

export default function IntroGame({ onOpen, language = 'fr' }) {
  const [activeModules, setActiveModules] = useState([]);
  const french = language === 'fr';
  const copy = french ? {
    eyebrow: 'RIHAM.OS · LAUNCH SEQUENCE', title: <>Construisons<br /><i>quelque chose de grand.</i></>, intro: 'Active les trois modules qui définissent ma manière de créer. La capsule portfolio est prête à décoller.', skip: 'Passer la séquence', launch: 'Ouvrir le portfolio', locked: 'SÉQUENCE VERROUILLÉE', ready: 'SYSTÈME PRÊT', activate: 'Activer le module', active: 'Module activé',
  } : {
    eyebrow: 'RIHAM.OS · LAUNCH SEQUENCE', title: <>Let’s build<br /><i>something great.</i></>, intro: 'Activate the three modules that define the way I create. The portfolio capsule is ready to launch.', skip: 'Skip sequence', launch: 'Open the portfolio', locked: 'SEQUENCE LOCKED', ready: 'SYSTEM READY', activate: 'Activate module', active: 'Module active',
  };
  const modules = [
    { id: 'design', label: 'DESIGN', title: french ? 'Clarté visuelle' : 'Visual clarity', detail: french ? 'Des interfaces pensées pour être belles et utiles.' : 'Interfaces designed to be both beautiful and useful.', icon: <FiPenTool /> },
    { id: 'code', label: 'CODE', title: french ? 'Solutions solides' : 'Solid solutions', detail: french ? 'Du code fiable, structuré et prêt à évoluer.' : 'Reliable, structured code ready to grow.', icon: <FiCode /> },
    { id: 'ai', label: 'AI', title: french ? 'Intelligence appliquée' : 'Applied intelligence', detail: french ? 'L’IA au service de produits plus intelligents.' : 'AI in service of smarter products.', icon: <FiCpu /> },
  ];
  const ready = activeModules.length === modules.length;
  const activate = (id) => { if (!activeModules.includes(id)) setActiveModules((current) => [...current, id]); };

  return <section className={styles.section}><div className={styles.grid} aria-hidden="true" /><div className={styles.shell}><div className={styles.copy}><p>{copy.eyebrow}</p><h1>{copy.title}</h1><span>{copy.intro}</span><button type="button" onClick={onOpen}>{copy.skip}<FiArrowRight /></button></div><div className={styles.console}><div className={styles.consoleTop}><span>PORTFOLIO / BOOT</span><b>{String(activeModules.length).padStart(2, '0')} / 03</b></div><div className={styles.modules}>{modules.map((module, index) => { const active = activeModules.includes(module.id); return <button key={module.id} type="button" onClick={() => activate(module.id)} className={active ? styles.moduleActive : ''} aria-pressed={active}><span className={styles.moduleNumber}>0{index + 1}</span><i>{active ? <FiCheck /> : module.icon}</i><span className={styles.moduleCopy}><small>{module.label}</small><strong>{module.title}</strong><em>{module.detail}</em></span><b>{active ? copy.active : copy.activate}</b></button>; })}</div><div className={`${styles.capsule} ${ready ? styles.capsuleReady : ''}`}><div className={styles.capsuleHalo} /><div className={styles.capsuleCore}><span>RB</span></div><div className={styles.capsuleInfo}><small>{ready ? copy.ready : copy.locked}</small><strong>{ready ? 'PORTFOLIO' : 'RIHAM.OS'}</strong></div>{ready && <button type="button" onClick={onOpen}>{copy.launch}<FiArrowRight /></button>}</div></div></div></section>;
}
