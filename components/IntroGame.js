'use client';

import { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiVolume2, FiVolumeX } from 'react-icons/fi';
import styles from './IntroGame.module.css';
import languageStyles from './IntroGameLanguage.module.css';

const FRENCH_LINE_DURATIONS = [2100, 2500, 3200, 3400];
const ENGLISH_LINE_DURATIONS = [1900, 2300, 2900, 3300];

export default function IntroGame({ onOpen, language = 'fr', setLanguage }) {
  const french = language === 'fr';
  const story = french
    ? [
        'Bonjour. Je suis une idée.',
        'Riham m’a d’abord imaginée.',
        'Puis elle m’a dessinée, codée et améliorée.',
        'Elle m’a appris à devenir utile, claire et mémorable.',
        'Maintenant, je vais te montrer ce qu’elle sait créer.',
      ]
    : [
        'Hello. I am an idea.',
        'Riham imagined me first.',
        'Then she designed, coded and refined me.',
        'She taught me to be useful, clear and memorable.',
        'Now, I will show you what she can create.',
      ];
  const copy = french
    ? {
        eyebrow: 'UNE HISTOIRE AVANT D’ENTRER',
        title: <>Il était une fois<br /><i>une idée.</i></>,
        speaker: 'LA NARRATRICE',
        enter: 'Découvrir le portfolio',
        skip: 'Passer l’histoire',
        enableSound: 'Activer le son',
        muteSound: 'Couper le son',
      }
    : {
        eyebrow: 'A STORY BEFORE YOU ENTER',
        title: <>Once there was<br /><i>an idea.</i></>,
        speaker: 'THE NARRATOR',
        enter: 'Discover the portfolio',
        skip: 'Skip the story',
        enableSound: 'Turn sound on',
        muteSound: 'Mute sound',
      };
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [muted, setMuted] = useState(false);
  const [narrationDone, setNarrationDone] = useState(false);
  const audioRef = useRef(null);
  const line = story[step];
  const complete = typed >= line.length;
  const final = step === story.length - 1 && complete;
  const lineDurations = french ? FRENCH_LINE_DURATIONS : ENGLISH_LINE_DURATIONS;

  useEffect(() => setTyped(0), [step]);

  useEffect(() => {
    if (complete) return undefined;
    const timer = window.setTimeout(() => setTyped((count) => count + 1), 17);
    return () => window.clearTimeout(timer);
  }, [typed, complete]);

  useEffect(() => {
    let transitionTimer;
    if (step >= story.length - 1) return undefined;
    transitionTimer = window.setTimeout(() => setStep((current) => current + 1), lineDurations[step]);
    return () => window.clearTimeout(transitionTimer);
  }, [step, story.length, lineDurations]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    audio.playbackRate = 1;
    audio.preservesPitch = true;
    audio.currentTime = 0;
    if (!muted) audio.play().catch(() => {});

    return () => {
      audio.pause();
    };
  }, [french]);

  const toggleSound = () => setMuted((current) => !current);

  return (
    <section className={styles.section}>
      <audio
        ref={audioRef}
        autoPlay
        preload="auto"
        muted={muted}
        onEnded={() => setNarrationDone(true)}
        src={`/audio/story-${french ? 'fr' : 'en'}-full.wav?v=20260804`}
      />
      <div className={styles.ambient} aria-hidden="true"><i /><i /><i /></div>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={languageStyles.topline}>
            <p className={languageStyles.eyebrow}>{copy.eyebrow}</p>
            <div className={languageStyles.languages} aria-label="Language">
              <button type="button" onClick={() => setLanguage?.('fr')} aria-pressed={french} aria-label="Français">
                <img src="/flags/fr.svg" alt="" />
              </button>
              <button type="button" onClick={() => setLanguage?.('en')} aria-pressed={!french} aria-label="English">
                <img src="/flags/us.svg" alt="" />
              </button>
            </div>
          </div>
          <h1>{copy.title}</h1>
        </header>
        <main className={styles.scene}>
          <div className={styles.linework} aria-hidden="true"><i /><i /><i /><i /></div>
          <div className={styles.orb} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.storyPanel}>
            <div className={styles.panelMeta}><span>{copy.speaker}</span><i>{String(step + 1).padStart(2, '0')} / {String(story.length).padStart(2, '0')}</i></div>
            <p className={styles.dialogue} aria-live="polite">{line.slice(0, typed)}<b className={complete ? styles.cursorStill : ''}>|</b></p>
            <div className={styles.panelFooter}>
              <span>{story.map((_, index) => <i key={index} className={index <= step ? styles.active : ''} />)}</span>
              <button type="button" className={styles.sound} onClick={toggleSound} aria-label={muted ? copy.enableSound : copy.muteSound}>
                {muted ? <FiVolumeX /> : <FiVolume2 />}
              </button>
            </div>
            {final && narrationDone && <button type="button" className={styles.enter} onClick={onOpen}>{copy.enter}<FiArrowRight /></button>}
          </div>
          <p className={styles.credit}>RIHAM BOUCHIHA · DESIGN / CODE / AI</p>
        </main>
        <footer className={styles.footer}><button type="button" onClick={onOpen}>{copy.skip}<FiArrowRight /></button><span>01 — 05</span></footer>
      </div>
    </section>
  );
}
