'use client';
import { useState, useEffect } from 'react';

export default function Navbar({ activeItem, setActiveItem, language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const menuItems = ['Home', 'About', 'Skills', 'Education', 'Portfolio', 'Certifications', 'Experiences', 'Contact'];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const shouldUseDark = savedTheme === 'dark' || document.body.classList.contains('dark-mode');
    setIsDark(shouldUseDark);
    document.body.classList.toggle('dark-mode', shouldUseDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      menuItems.forEach((item) => {
        const section = document.getElementById(item.toLowerCase());
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveItem(item);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeItem, setActiveItem]);

  const playSwitchSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isDark ? 400 : 600, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const toggleTheme = () => {
    playSwitchSound();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    document.body.classList.toggle('dark-mode', newDarkState);
    window.localStorage.setItem('portfolio-theme', newDarkState ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const ThemeToggleBtn = () => (
    <div
      onClick={toggleTheme}
      style={{
        width: '65px', height: '32px',
        backgroundColor: isDark ? '#2c2c2c' : '#a68064',
        borderRadius: '20px', display: 'flex', alignItems: 'center', padding: '0 6px',
        cursor: 'pointer', position: 'relative', justifyContent: isDark ? 'flex-end' : 'flex-start',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isPressed ? 'scale(0.9)' : 'scale(1)',
        boxShadow: isDark ? '0 0 15px rgba(0,0,0,0.5)' : '0 4px 10px rgba(166, 128, 100, 0.3)'
      }}
    >
      <span style={{ position: 'absolute', left: isDark ? '12px' : 'auto', right: isDark ? 'auto' : '12px', fontSize: '14px' }}>
        {isDark ? '🌙' : '☀️'}
      </span>
      <div style={{ width: '22px', height: '22px', backgroundColor: 'white', borderRadius: '50%', zIndex: 2 }}></div>
    </div>
  );

  const LangToggleBtn = () => (
    <button
      onClick={toggleLanguage}
      style={{
        border: '1px solid rgba(166,128,100,0.35)',
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
        color: 'var(--text-main)',
        borderRadius: '999px',
        padding: '0.45rem 0.8rem',
        fontWeight: 700,
        cursor: 'pointer',
        fontSize: '0.8rem',
        letterSpacing: '0.08em',
        backdropFilter: 'blur(10px)'
      }}
    >
      {language === 'fr' ? 'FR / EN' : 'EN / FR'}
    </button>
  );

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div style={{
        padding: '0.75rem 1rem', borderRadius: '999px', backdropFilter: 'blur(16px)',
        background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
        fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)', zIndex: 102, letterSpacing: '0.14em'
      }}>
        RIHAM BOUCHIHA
      </div>

      <div className="nav-links-pc" style={{ alignItems: 'center', gap: '0.8rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem',
          borderRadius: '999px', backdropFilter: 'blur(16px)', background: 'var(--surface)',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow)'
        }}>
          {menuItems.map((item) => {
            const isActive = activeItem === item;
            return (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveItem(item)}
                style={{
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent)' : 'var(--text-main)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? '700' : '500',
                  padding: '0.55rem 0.85rem',
                  backgroundColor: isActive ? 'rgba(166, 128, 100, 0.14)' : 'transparent',
                  borderRadius: '999px',
                  transition: '0.2s'
                }}
              >
                {item}
              </a>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <LangToggleBtn />
          <ThemeToggleBtn />
        </div>
      </div>

      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)} style={{ zIndex: 102, background: 'none', border: 'none', cursor: 'pointer' }}>
        <span style={{ display:'block', width:'24px', height:'2px', backgroundColor:'var(--text-main)', margin:'4px 0', transform: isOpen ? 'rotate(45deg) translate(4px, 5px)' : 'none', transition: '0.3s' }}></span>
        <span style={{ display:'block', width:'24px', height:'2px', backgroundColor:'var(--text-main)', margin:'4px 0', opacity: isOpen ? 0 : 1, transition: '0.3s' }}></span>
        <span style={{ display:'block', width:'24px', height:'2px', backgroundColor:'var(--text-main)', margin:'4px 0', transform: isOpen ? 'rotate(-45deg) translate(4px, -6px)' : 'none', transition: '0.3s' }}></span>
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          background: 'var(--bg-color)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '1.6rem', zIndex: 101
        }}>
          {menuItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => { setActiveItem(item); setIsOpen(false); }} style={{ fontSize: '1.4rem', textDecoration: 'none', color: 'var(--text-main)', fontWeight: '700' }}>
              {item}
            </a>
          ))}
          <div style={{ width: '46px', height: '2px', backgroundColor: 'var(--text-main)', opacity: 0.2 }}></div>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <LangToggleBtn />
            <ThemeToggleBtn />
          </div>
        </div>
      )}
    </nav>
  );
}