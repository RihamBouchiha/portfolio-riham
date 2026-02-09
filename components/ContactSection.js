'use client';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
  SiLinkedin, 
  SiGithub 
} from 'react-icons/si';

export default function ContactSection() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // La couleur d'accentuation (Marron)
  const BROWN_COLOR = '#a68064';

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    // REMPLACER PAR VOS CLES EMAILJS
    emailjs.sendForm('service_id', 'template_id', form.current, 'public_key')
      .then(() => {
          setLoading(false); 
          setStatus('success'); 
          form.current.reset();
          setTimeout(() => setStatus(null), 5000);
      }, (error) => {
          setLoading(false); 
          setStatus('error'); 
          console.error(error.text);
      });
  };

  return (
    <section id="contact" style={{
        // UTILISATION DES VARIABLES GLOBALES (comme dans Hero/Skills)
        backgroundColor: 'var(--bg-color)', 
        color: 'var(--text-main)',
        
        position: 'relative',
        minHeight: '100vh',
        padding: '6rem 5%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        fontFamily: "'Courier New', monospace",
        transition: 'background-color 0.3s ease, color 0.3s ease' // Transition fluide lors du toggle
    }}>
      
      <div className="cc-container">
        
        {/* --- INFO PANEL --- */}
        <div className="cc-panel info-panel">
          <div>
            {/* Le titre utilise la couleur du texte global */}
            <h2 className="cc-title" style={{ color: 'var(--text-main)' }}>
              CONTACT<span className="blink" style={{ color: BROWN_COLOR }}>_</span>
            </h2>
            <p className="cc-subtitle" style={{ color: BROWN_COLOR }}>Let's build something unique.</p>
          </div>

          <div className="cc-details">
             <div className="cc-block">
                <span className="cc-label" style={{ color: 'var(--text-sub)' }}>LOCATION</span>
                <p className="cc-value">Tangier, Morocco</p>
             </div>
             <div className="cc-block">
                <span className="cc-label" style={{ color: 'var(--text-sub)' }}>EMAIL</span>
                <a href="mailto:rihambouchiha@ump.ac.ma" className="cc-value link-effect" style={{ '--hover-color': BROWN_COLOR }}>
                    rihambouchiha@ump.ac.ma
                </a>
             </div>
          </div>

          <div className="cc-socials">
            <a href="https://www.linkedin.com/in/riham-bouchiha" target="_blank" className="social-icon">
              <SiLinkedin /><span>LinkedIn</span>
            </a>
            <a href="https://github.com/" target="_blank" className="social-icon">
              <SiGithub /><span>GitHub</span>
            </a>
          </div>
        </div>

        {/* --- FORM PANEL --- */}
        <div className="cc-panel form-panel">
          <h3 className="form-header" style={{ borderBottomColor: BROWN_COLOR, color: 'var(--text-main)' }}>
            SEND MESSAGE
          </h3>
          
          <form ref={form} onSubmit={sendEmail}>
            
            <div className="cyber-input-group">
              <input type="text" name="user_name" required placeholder="NAME" 
                style={{ color: 'var(--text-main)', borderColor: 'var(--text-sub)' }} 
              />
              <div className="cyber-line" style={{ background: BROWN_COLOR }}></div>
            </div>

            <div className="cyber-input-group">
              <input type="email" name="user_email" required placeholder="EMAIL" 
                style={{ color: 'var(--text-main)', borderColor: 'var(--text-sub)' }} 
              />
              <div className="cyber-line" style={{ background: BROWN_COLOR }}></div>
            </div>

            <div className="cyber-input-group">
              <textarea name="message" rows="4" required placeholder="YOUR MESSAGE..." 
                style={{ color: 'var(--text-main)', borderColor: 'var(--text-sub)' }} 
              ></textarea>
              <div className="cyber-line" style={{ background: BROWN_COLOR }}></div>
            </div>
            
            <button 
              type="submit" 
              className="cyber-btn" 
              disabled={loading}
              style={{ backgroundColor: BROWN_COLOR, color: 'white' }} 
            >
              {loading ? 'SENDING...' : 'ENVOYER'}
            </button>

            {status === 'success' && <div className="form-status success">✓ MESSAGE SENT</div>}
            {status === 'error' && <div className="form-status error">× ERROR</div>}
          </form>
        </div>
      </div>
      
      <div className="cc-footer" style={{ color: 'var(--text-sub)' }}>© 2026 Riham Bouchiha</div>

      <style jsx>{`
        /* LAYOUT & RESPONSIVE */
        .cc-container { 
          position: relative; z-index: 10; width: 100%; max-width: 1100px; margin: 0 auto; 
          display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; 
        }

        .cc-panel {
          padding: 2.5rem;
          display: flex; flex-direction: column; justify-content: space-between;
          border-radius: 12px;
          /* On utilise une bordure subtile basée sur la couleur du texte secondaire */
          border: 1px solid var(--text-sub); 
          /* Fond très légèrement visible pour l'effet carte */
          background: rgba(125, 125, 125, 0.05);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
        }

        /* TYPOGRAPHIE */
        .cc-title { font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 800; letter-spacing: -1px; }
        .blink { animation: blink 1s infinite; } 
        .cc-subtitle { text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; margin-bottom: 2rem; }
        
        .cc-details { margin-bottom: 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .cc-block { display: flex; flex-direction: column; }
        .cc-label { font-size: 0.7rem; opacity: 0.8; margin-bottom: 5px; font-weight: bold; }
        .cc-value { font-size: 1.1rem; font-weight: 600; text-decoration: none; color: inherit; }
        
        .link-effect:hover { color: var(--hover-color) !important; text-decoration: underline; }
        
        /* SOCIALS */
        .cc-socials { display: flex; gap: 1rem; }
        .social-icon { 
          display: flex; align-items: center; gap: 8px; padding: 10px 20px; 
          border: 1px solid var(--text-sub); 
          color: inherit; text-decoration: none; font-size: 0.9rem; font-weight: bold; 
          transition: 0.2s; border-radius: 6px; 
        }
        .social-icon:hover { border-color: #a68064 !important; color: #a68064; background: rgba(166, 128, 100, 0.1); }
        
        /* FORM STYLES */
        .form-header { font-size: 1.2rem; margin-bottom: 2rem; border-bottom: 2px solid; padding-bottom: 10px; display: inline-block; }
        
        .cyber-input-group { position: relative; margin-bottom: 2rem; }
        .cyber-input-group input, .cyber-input-group textarea {
          width: 100%; padding: 15px 0; 
          background: transparent;
          border: none;
          border-bottom: 1px solid;
          font-family: inherit; font-size: 1rem; outline: none; transition: 0.3s;
          border-radius: 0;
        }
        .cyber-input-group textarea { resize: vertical; min-height: 80px; }
        
        /* Ligne animée sous l'input */
        .cyber-line { position: absolute; bottom: 0; left: 0; width: 0; height: 2px; transition: width 0.3s; }
        .cyber-input-group input:focus ~ .cyber-line, .cyber-input-group textarea:focus ~ .cyber-line { width: 100%; }
        
        ::placeholder { opacity: 0.4; color: var(--text-main); font-size: 0.85rem; letter-spacing: 1px; }

        .cyber-btn {
          width: 100%; padding: 18px; border: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; cursor: pointer;
          transition: transform 0.2s, opacity 0.2s; border-radius: 4px; margin-top: 1rem;
        }
        .cyber-btn:hover { transform: translateY(-2px); opacity: 0.9; }
        .cyber-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .form-status { margin-top: 1rem; text-align: center; font-weight: bold; font-size: 0.9rem; }
        .success { color: #10b981; } 
        .error { color: #ef4444; }
        
        .cc-footer { margin-top: 3rem; text-align: center; opacity: 0.6; font-size: 0.8rem; }

        @keyframes blink { 50% { opacity: 0; } }

        /* MOBILE */
        @media (max-width: 900px) { 
          .cc-container { grid-template-columns: 1fr; gap: 3rem; } 
          .cc-panel { padding: 1.5rem; } 
        }
      `}</style>
    </section>
  );
}