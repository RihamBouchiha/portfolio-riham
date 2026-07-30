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

    // 👇 CONFIGURATION EMAILJS
    emailjs.sendForm(
        'service_s9ifgkf',      // ✅ Ton Service ID
        'template_cter9zv',     // ⚠️ REMPLACE PAR TON TEMPLATE ID (ex: template_abc123)
        form.current, 
        'R_GxkHkcRIYCfvqdf'     // ✅ Ta Public Key
    )
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
        background: 'transparent', 
        color: 'var(--text-main)',
        position: 'relative',
        minHeight: '100vh',
        padding: '6rem 5%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      
      <div className="cc-container">
        <div className="cc-panel info-panel" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <div>
            <span className="pill" style={{ marginBottom: '0.8rem' }}>Contact</span>
            <h2 className="cc-title" style={{ color: 'var(--text-main)' }}>
              LET'S BUILD<span className="blink" style={{ color: BROWN_COLOR }}>_</span>
            </h2>
            <p className="cc-subtitle" style={{ color: BROWN_COLOR }}>Something memorable.</p>
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
            <a href="https://www.linkedin.com/in/riham-bouchiha-138419274/" target="_blank" className="social-icon">
              <SiLinkedin /><span>LinkedIn</span>
            </a>
            <a href="https://github.com/RihamBouchiha" target="_blank" className="social-icon">
              <SiGithub /><span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="cc-panel form-panel" style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
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

    </section>
  );
}