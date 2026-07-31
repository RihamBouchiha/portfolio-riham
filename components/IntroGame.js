'use client';

import { useEffect, useState } from 'react';
import { FiArrowRight, FiVolume2, FiVolumeX } from 'react-icons/fi';
import styles from './IntroGame.module.css';

export default function IntroGame({ onOpen, language = 'fr' }) {
  const french = language === 'fr';
  const story = french ? [
    'Bonjour. Je suis une idée.',
    'Riham m’a d’abord imaginée.',
    'Puis elle m’a dessinée, codée et améliorée.',
    'Elle m’a appris à devenir utile, claire et mémorable.',
    'Maintenant, je vais te montrer ce qu’elle sait créer.',
  ] : [
    'Hello. I am an idea.',
    'Riham imagined me first.',
    'Then she designed, coded and refined me.',
    'She taught me to be useful, clear and memorable.',
    'Now, I will show you what she can create.',
  ];
  const copy = french ? { eyebrow: 'UNE HISTOIRE AVANT D’ENTRER', title: <>Il était une fois<br /><i>une idée.</i></>, speaker: 'LA NARRATRICE', start: 'Écouter l’histoire', continue: 'Continuer', enter: 'Découvrir le portfolio', skip: 'Passer l’histoire' } : { eyebrow: 'A STORY BEFORE YOU ENTER', title: <>Once there was<br /><i>an idea.</i></>, speaker: 'THE NARRATOR', start: 'Listen to the story', continue: 'Continue', enter: 'Discover the portfolio', skip: 'Skip the story' };
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const line = story[step];
  const complete = typed >= line.length;
  const final = step === story.length - 1 && complete;

  useEffect(() => { setTyped(0); }, [step]);
  useEffect(() => {
    if (!started || complete) return undefined;
    const timer = window.setTimeout(() => setTyped((count) => count + 1), 21);
    return () => window.clearTimeout(timer);
  }, [typed, complete, started]);
  useEffect(() => {
    if (!started || muted || typeof window === 'undefined' || !window.speechSynthesis) return undefined;
    let disposed = false;
    let nextTimer;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(line);
    const preferred = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith(french ? 'fr' : 'en'));
    if (preferred) utterance.voice = preferred;
    utterance.lang = french ? 'fr-FR' : 'en-US';
    utterance.rate = 1.04;
    utterance.pitch = 1.03;
    utterance.onend = () => {
      if (!disposed && step < story.length - 1) nextTimer = window.setTimeout(() => setStep((current) => current + 1), 650);
    };
    window.speechSynthesis.speak(utterance);
    return () => { disposed = true; window.clearTimeout(nextTimer); window.speechSynthesis.cancel(); };
  }, [step, started, muted, french, line, story.length]);
  useEffect(() => () => { if (typeof window !== 'undefined') window.speechSynthesis?.cancel(); }, []);

  const toggleSound = () => { setMuted((current) => { const next = !current; if (next) window.speechSynthesis?.cancel(); return next; }); };

  return <section className={styles.section}>
    <div className={styles.shell}>
      <header className={styles.header}><p>{copy.eyebrow}</p><h1>{copy.title}</h1></header>
      <main className={styles.scene}>
        <div className={styles.sceneOverlay} aria-hidden="true" /><div className={styles.grain} aria-hidden="true" />
        <div className={styles.storyPanel}>
          {!started ? <button type="button" className={styles.start} onClick={() => setStarted(true)}><FiVolume2 /><span>{copy.start}</span><FiArrowRight /></button> : <>
            <div className={styles.panelMeta}><span>{copy.speaker}</span><i>{String(step + 1).padStart(2, '0')} / {String(story.length).padStart(2, '0')}</i></div>
            <p className={styles.dialogue} aria-live="polite">{line.slice(0, typed)}<b className={complete ? styles.cursorStill : ''}>|</b></p>
            <div className={styles.panelFooter}><span><i /> <i /> <i /> <i /> <i /></span><div><button type="button" className={styles.sound} onClick={toggleSound} aria-label={muted ? 'Activer le son' : 'Couper le son'}>{muted ? <FiVolumeX /> : <FiVolume2 />}</button></div></div>
            {final && <button type="button" className={styles.enter} onClick={onOpen}>{copy.enter}<FiArrowRight /></button>}
          </>}
        </div>
        <p className={styles.credit}>RIHAM BOUCHIHA · DESIGN / CODE / AI</p>
      </main>
      <footer className={styles.footer}><button type="button" onClick={onOpen}>{copy.skip}<FiArrowRight /></button><span>01 — 05</span></footer>
    </div>
  </section>;
}
