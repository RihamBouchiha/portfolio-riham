'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { FiArrowUpRight, FiSend } from 'react-icons/fi';
import styles from './ContactSection.module.css';

export default function ContactSection({ language = 'fr' }) {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const french = language === 'fr';
  const copy = french ? {
    stamp: 'CARTE POSTALE · 2026', eyebrow: 'ÉCRIVONS LA SUITE', title: <>Une idée en tête ?<br /><i>Envoyons-la loin.</i></>, note: 'Depuis Tanger, disponible pour imaginer des produits utiles, élégants et ambitieux.', to: 'À', address: 'Riham Bouchiha', place: 'Tanger, Maroc', formTitle: 'Compose ton message', name: 'Ton nom', email: 'Ton e-mail', message: 'Raconte-moi ton idée…', send: 'Envoyer la carte', sending: 'Envoi en cours…', success: 'Message envoyé — merci !', error: 'Une erreur est survenue. Réessaie.', social: 'RESTONS CONNECTÉS', footer: '© 2026 Riham Bouchiha · Fait avec soin.',
  } : {
    stamp: 'POSTCARD · 2026', eyebrow: 'LET’S WRITE THE NEXT CHAPTER', title: <>Have an idea?<br /><i>Let’s send it far.</i></>, note: 'Based in Tangier and ready to imagine useful, elegant and ambitious digital products.', to: 'To', address: 'Riham Bouchiha', place: 'Tangier, Morocco', formTitle: 'Compose your message', name: 'Your name', email: 'Your email', message: 'Tell me about your idea…', send: 'Send this card', sending: 'Sending…', success: 'Message sent — thank you!', error: 'Something went wrong. Please try again.', social: 'STAY CONNECTED', footer: '© 2026 Riham Bouchiha · Made with care.',
  };

  const sendEmail = (event) => {
    event.preventDefault();
    setLoading(true);
    emailjs.sendForm('service_s9ifgkf', 'template_cter9zv', form.current, 'R_GxkHkcRIYCfvqdf').then(() => {
      setLoading(false); setStatus('success'); form.current?.reset(); window.setTimeout(() => setStatus(null), 5000);
    }, () => { setLoading(false); setStatus('error'); });
  };

  return <section id="contact" className={styles.section}><div className={styles.paperTexture} aria-hidden="true" /><div className={styles.shell}>
    <header className={styles.header}><p>{copy.eyebrow}</p><h2>{copy.title}</h2></header>
    <div className={styles.postcard}>
      <aside className={styles.addressSide}><div className={styles.stamp}><span>RB</span><small>{copy.stamp}</small></div><p className={styles.to}>{copy.to}</p><strong>{copy.address}</strong><span>{copy.place}</span><p className={styles.note}>{copy.note}</p><div className={styles.route}><i /><i /><i /></div><div className={styles.socials}><p>{copy.social}</p><div><a href="https://www.linkedin.com/in/riham-bouchiha-138419274/" target="_blank" rel="noreferrer"><SiLinkedin /> LinkedIn <FiArrowUpRight /></a><a href="https://github.com/RihamBouchiha" target="_blank" rel="noreferrer"><SiGithub /> GitHub <FiArrowUpRight /></a></div></div></aside>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.formSide}><div className={styles.formHeading}><span>✦</span><h3>{copy.formTitle}</h3></div><form ref={form} onSubmit={sendEmail}><label><span>{copy.name}</span><input name="user_name" required /></label><label><span>{copy.email}</span><input type="email" name="user_email" required /></label><label><span>Message</span><textarea name="message" rows="5" required placeholder={copy.message} /></label><button type="submit" disabled={loading}>{loading ? copy.sending : copy.send}<FiSend /></button>{status && <p className={`${styles.status} ${status === 'success' ? styles.success : styles.error}`}>{status === 'success' ? copy.success : copy.error}</p>}</form></div>
    </div>
    <footer>{copy.footer}</footer>
  </div></section>;
}
