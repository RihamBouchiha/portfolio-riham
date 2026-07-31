'use client';

import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiMessageCircle, FiSend, FiX } from 'react-icons/fi';
import styles from './PortfolioChatbot.module.css';

const copyByLanguage = {
  fr: {
    title: 'Demande à Riham AI',
    status: 'En ligne · Portfolio assistant',
    greeting: 'Bonjour ! Je peux répondre à tes questions sur le parcours, les projets et les compétences de Riham. ✦',
    placeholder: 'Écris ta question…',
    sending: 'Réflexion…',
    unavailable: 'Je suis momentanément indisponible. Tu peux contacter Riham directement par e-mail.',
    suggestions: ['Ses projets IA', 'Ses compétences DevOps', 'Son expérience'],
    ariaOpen: 'Ouvrir le chatbot',
    ariaClose: 'Fermer le chatbot',
  },
  en: {
    title: 'Ask Riham AI',
    status: 'Online · Portfolio assistant',
    greeting: 'Hello! I can answer questions about Riham’s background, projects, and skills. ✦',
    placeholder: 'Write your question…',
    sending: 'Thinking…',
    unavailable: 'I am temporarily unavailable. You can contact Riham directly by email.',
    suggestions: ['Her AI projects', 'Her DevOps skills', 'Her experience'],
    ariaOpen: 'Open chatbot',
    ariaClose: 'Close chatbot',
  },
};

export default function PortfolioChatbot({ language = 'fr' }) {
  const copy = copyByLanguage[language] || copyByLanguage.fr;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: copy.greeting }]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: copy.greeting }]);
    setInput('');
  }, [language, copy.greeting]);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open, sending]);

  const ask = async (question) => {
    const content = question.trim();
    if (!content || sending) return;

    const nextMessages = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');
    setSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', content: data.answer || data.error || copy.unavailable }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: copy.unavailable }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <aside className={`${styles.widget} ${open ? styles.open : ''}`} aria-live="polite">
      {open && <div className={styles.window}>
        <header className={styles.header}>
          <span className={styles.avatar}>RB</span>
          <div><strong>{copy.title}</strong><small><i />{copy.status}</small></div>
          <button type="button" onClick={() => setOpen(false)} aria-label={copy.ariaClose}><FiX /></button>
        </header>
        <div className={styles.messages} ref={scrollRef}>
          {messages.map((message, index) => <p key={`${message.role}-${index}`} className={message.role === 'user' ? styles.user : styles.assistant}>{message.content}</p>)}
          {sending && <p className={`${styles.assistant} ${styles.thinking}`}>{copy.sending}<span /><span /><span /></p>}
        </div>
        <div className={styles.suggestions}>
          {copy.suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(suggestion)} disabled={sending}>{suggestion}<FiArrowUpRight /></button>)}
        </div>
        <form className={styles.form} onSubmit={(event) => { event.preventDefault(); ask(input); }}>
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={copy.placeholder} maxLength={800} aria-label={copy.placeholder} />
          <button type="submit" disabled={!input.trim() || sending} aria-label="Send"><FiSend /></button>
        </form>
      </div>}
      <button type="button" className={styles.launcher} onClick={() => setOpen((current) => !current)} aria-label={open ? copy.ariaClose : copy.ariaOpen}>
        {open ? <FiX /> : <FiMessageCircle />}<span>AI</span>
      </button>
    </aside>
  );
}
