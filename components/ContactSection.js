'use client';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

/* --- ICONS (Couleur automatique) --- */
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 1.19 6.44 1.54a3.37 3.37 0 0 0-.94 2.61V19"></path></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function ContactSection() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    // REMPLACE TES CLES ICI
    emailjs.sendForm('service_id', 'template_id', form.current, 'public_key')
      .then(() => {
          setLoading(false); setStatus('success'); form.current.reset();
          setTimeout(() => setStatus(null), 5000);
      }, (error) => {
          setLoading(false); setStatus('error'); console.error(error.text);
      });
  };

  return (
    <section id="contact" className="cyber-contact">
      
      {/* Background Grille */}
      <div className="grid-horizon"><div className="grid-plane"></div></div>
      <div className="bg-fade-overlay"></div>

      <div className="cc-container">
        {/* INFO GAUCHE */}
        <div className="cc-info-panel">
          <div>
            <h2 className="cc-title">CONTACT<span className="blink">_</span></h2>
            <p className="cc-subtitle">Let's build something unique.</p>
          </div>

          <div className="cc-details">
             <div className="cc-block">
                <span className="cc-label">LOCATION</span>
                <p className="cc-value">Tangier, Morocco</p>
             </div>
             <div className="cc-block">
                <span className="cc-label">EMAIL</span>
                <a href="mailto:rihambouchiha@ump.ac.ma" className="cc-value link-effect">rihambouchiha@ump.ac.ma</a>
             </div>
          </div>

          <div className="cc-socials">
            <a href="https://www.linkedin.com/in/riham-bouchiha" target="_blank" className="social-icon">
              <LinkedinIcon /><span>LinkedIn</span>
            </a>
            <a href="https://github.com/" target="_blank" className="social-icon">
              <GithubIcon /><span>GitHub</span>
            </a>
          </div>
        </div>

        {/* FORM DROITE */}
        <div className="cc-form-panel">
          <h3 className="form-header">SEND MESSAGE</h3>
          <form ref={form} onSubmit={sendEmail}>
            <div className="cyber-input-group">
              <input type="text" name="user_name" required placeholder="NAME" />
              <div className="cyber-line"></div>
            </div>
            <div className="cyber-input-group">
              <input type="email" name="user_email" required placeholder="EMAIL" />
              <div className="cyber-line"></div>
            </div>
            <div className="cyber-input-group">
              <textarea name="message" rows="4" required placeholder="YOUR MESSAGE..."></textarea>
              <div className="cyber-line"></div>
            </div>
            <button type="submit" className="cyber-btn" disabled={loading}>
              {loading ? 'SENDING...' : 'CONFIRM & SEND'}
            </button>
            {status === 'success' && <div className="form-status success">✓ MESSAGE SENT</div>}
            {status === 'error' && <div className="form-status error">× ERROR</div>}
          </form>
        </div>
      </div>
      <div className="cc-footer">© 2025 Riham Bouchiha</div>

      <style dangerouslySetInnerHTML={{__html: `
        /* =============================================
           1. FORCE LIGHT MODE (PAR DÉFAUT)
           Ceci s'applique TOUT LE TEMPS sauf si .dark est présent
           =============================================
        */
        .cyber-contact {
          --cc-bg: #ffffff;             /* FOND BLANC PUR */
          --cc-text: #000000;           /* TEXTE NOIR PUR */
          --cc-accent: #a68064;         /* DORE */
          --cc-panel-bg: #f3f4f6;       /* GRIS CLAIR pour les boites */
          --cc-border: #e5e7eb;         /* BORDURES GRISES */
          --cc-grid: rgba(0,0,0,0.08);  /* GRILLE GRISE */
          --cc-glow: none;              /* PAS DE NEON */
          
          /* Force properties */
          background-color: var(--cc-bg) !important;
          color: var(--cc-text) !important;
          
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          padding: 4rem 5%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-family: 'Courier New', monospace;
          transition: background-color 0.4s ease, color 0.4s ease;
        }

        /* =============================================
           2. FORCE DARK MODE (UNIQUEMENT AVEC LA CLASSE)
           Ceci écrase tout le reste quand ton bouton active "dark"
           =============================================
        */
        :global(.dark) .cyber-contact {
            --cc-bg: #000000;           /* FOND NOIR PUR */
            --cc-text: #ffffff;         /* TEXTE BLANC PUR */
            --cc-panel-bg: #0a0a0a;     /* BOITE NOIRE */
            --cc-border: #333333;       /* BORDURE SOMBRE */
            --cc-grid: rgba(166, 128, 100, 0.3); /* GRILLE DOREE */
            --cc-glow: 0 0 15px rgba(166, 128, 100, 0.15);
            
            background-color: var(--cc-bg) !important;
            color: var(--cc-text) !important;
        }

        /* --- ANIMATION GRILLE --- */
        .grid-horizon {
          position: absolute; inset: 0; perspective: 500px; z-index: 0; pointer-events: none;
        }
        .grid-plane {
          position: absolute; top: 50%; left: -50%; width: 200%; height: 200%;
          background-image: 
            linear-gradient(0deg, transparent 24%, var(--cc-grid) 25%, var(--cc-grid) 26%, transparent 27%, transparent 74%, var(--cc-grid) 75%, var(--cc-grid) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, var(--cc-grid) 25%, var(--cc-grid) 26%, transparent 27%, transparent 74%, var(--cc-grid) 75%, var(--cc-grid) 76%, transparent 77%, transparent);
          background-size: 40px 40px;
          transform: rotateX(60deg);
          animation: moveGrid 3s linear infinite;
        }
        .bg-fade-overlay {
            position: absolute; inset: 0; z-index: 1;
            background: linear-gradient(to bottom, var(--cc-bg) 0%, transparent 100%);
            transition: background 0.4s ease;
        }
        @keyframes moveGrid { 0% { background-position: 0 0; } 100% { background-position: 0 40px; } }

        /* --- LAYOUT --- */
        .cc-container {
          position: relative; z-index: 5; width: 100%; max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem;
        }

        /* PANELS */
        .cc-info-panel, .cc-form-panel {
          background: var(--cc-panel-bg);
          border: 1px solid var(--cc-border);
          padding: 2.5rem;
          display: flex; flex-direction: column; justify-content: space-between;
          box-shadow: var(--cc-glow);
          transition: all 0.4s ease;
        }

        /* TEXTS */
        .cc-title { font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 800; letter-spacing: -1px; }
        .blink { animation: blink 1s infinite; color: var(--cc-accent); }
        @keyframes blink { 50% { opacity: 0; } }
        .cc-subtitle { color: var(--cc-accent); text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; margin-bottom: 2rem; }
        
        .cc-details { margin-bottom: 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .cc-block { display: flex; flex-direction: column; }
        .cc-label { font-size: 0.7rem; opacity: 0.6; margin-bottom: 5px; }
        .cc-value { font-size: 1.1rem; font-weight: 600; text-decoration: none; color: inherit; }
        .link-effect:hover { color: var(--cc-accent); text-decoration: underline; }

        /* SOCIALS */
        .cc-socials { display: flex; gap: 1rem; }
        .social-icon {
          display: flex; align-items: center; gap: 8px; padding: 10px 20px;
          border: 1px solid var(--cc-border); color: inherit; text-decoration: none;
          font-size: 0.9rem; font-weight: bold; transition: 0.2s;
        }
        .social-icon:hover { border-color: var(--cc-accent); color: var(--cc-accent); }

        /* FORM */
        .form-header { font-size: 1.2rem; margin-bottom: 2rem; border-bottom: 2px solid var(--cc-accent); padding-bottom: 10px; display: inline-block; }
        .cyber-input-group { position: relative; margin-bottom: 1.5rem; }
        .cyber-input-group input, .cyber-input-group textarea {
          width: 100%; padding: 15px; background: transparent;
          border: 1px solid var(--cc-border); color: inherit;
          font-family: inherit; font-size: 0.95rem; outline: none; transition: 0.3s;
        }
        .cyber-input-group textarea { resize: vertical; min-height: 100px; }
        .cyber-line { position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: var(--cc-accent); transition: width 0.3s; }
        .cyber-input-group input:focus ~ .cyber-line, .cyber-input-group textarea:focus ~ .cyber-line { width: 100%; }
        ::placeholder { opacity: 0.4; color: inherit; }

        .cyber-btn {
          width: 100%; padding: 18px; border: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; cursor: pointer;
          background: var(--cc-text); /* Inverse Colors */
          color: var(--cc-bg);
          transition: transform 0.2s;
        }
        .cyber-btn:hover { transform: translateY(-2px); opacity: 0.9; }

        .form-status { margin-top: 1rem; text-align: center; font-weight: bold; }
        .success { color: #10b981; } .error { color: #ef4444; }
        .cc-footer { margin-top: 3rem; text-align: center; opacity: 0.5; font-size: 0.8rem; }

        @media (max-width: 900px) {
          .cc-container { grid-template-columns: 1fr; gap: 2rem; }
          .cc-info-panel, .cc-form-panel { padding: 1.5rem; }
        }
      `}} />
    </section>
  );
}