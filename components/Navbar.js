'use client';
import { useState } from 'react';

export default function Navbar({ activeItem, setActiveItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const menuItems = ['Home', 'About', 'Skills', 'Education', 'Portfolio', 'Contact'];

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
    document.body.classList.toggle('dark-mode');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      padding: '1.5rem 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      backgroundColor: isOpen ? 'var(--bg-color)' : 'transparent',
      transition: 'background-color 0.3s'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-main)', zIndex: 102 }}>
        RIHAM BOUCHIHA
      </div>
      
      {/* Conteneur Menu PC + Theme Switch */}
      {/* La classe .nav-links-pc est gérée dans globals.css maintenant */}
      <div className="nav-links-pc" style={{ alignItems: 'center', gap: '2.5rem' }}>
        <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          {menuItems.map((item) => {
            const isActive = activeItem === item;
            return (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setActiveItem(item)}
                  style={{ 
                    textDecoration: 'none', 
                    color: isActive ? '#a68064' : 'var(--text-main)',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? '700' : '400',
                    padding: isActive ? '0.6rem 1.4rem' : '0',
                    backgroundColor: isActive ? 'rgba(232, 232, 232, 0.73)' : 'transparent',
                    borderRadius: '25px',
                    transition: '0.2s'
                  }}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        <div onClick={toggleTheme} style={{ 
            width: '65px', height: '32px', 
            backgroundColor: isDark ? '#2c2c2c' : '#a68064', 
            borderRadius: '20px', display: 'flex', alignItems: 'center', padding: '0 6px', 
            cursor: 'pointer', position: 'relative', justifyContent: isDark ? 'flex-end' : 'flex-start',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isPressed ? 'scale(0.9)' : 'scale(1)',
            boxShadow: isDark ? '0 0 15px rgba(0,0,0,0.5)' : '0 4px 10px rgba(166, 128, 100, 0.3)'
          }}>
          <span style={{ position: 'absolute', left: isDark ? '12px' : 'auto', right: isDark ? 'auto' : '12px', fontSize: '14px' }}>
            {isDark ? '🌙' : '☀️'}
          </span>
          <div style={{ width: '22px', height: '22px', backgroundColor: 'white', borderRadius: '50%', zIndex: 2 }}></div>
        </div>
      </div>

      {/* Bouton Hamburger : La visibilité est gérée par globals.css */}
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)} style={{ zIndex: 102, background: 'none', border: 'none' }}>
        <span style={{ display:'block', width:'25px', height:'2px', backgroundColor:'var(--text-main)', margin:'5px 0', transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none', transition: '0.3s' }}></span>
        <span style={{ display:'block', width:'25px', height:'2px', backgroundColor:'var(--text-main)', margin:'5px 0', opacity: isOpen ? 0 : 1, transition: '0.3s' }}></span>
        <span style={{ display:'block', width:'25px', height:'2px', backgroundColor:'var(--text-main)', margin:'5px 0', transform: isOpen ? 'rotate(-45deg) translate(5px, -7px)' : 'none', transition: '0.3s' }}></span>
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '2rem', zIndex: 101
        }}>
          {menuItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} 
              onClick={() => { setActiveItem(item); setIsOpen(false); }}
              style={{ fontSize: '1.8rem', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold' }}>
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}