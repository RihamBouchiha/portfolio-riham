'use client';

import { useEffect, useRef, useState } from 'react';
import { FiBriefcase, FiCode, FiMessageCircle, FiSend, FiUser, FiX } from 'react-icons/fi';
import styles from './PortfolioChatbot.module.css';

const copyByLanguage = {
  fr: {
    title: 'Riham AI',
    status: 'Assistant portfolio · En ligne',
    welcome: 'Bonjour, je suis Riham AI.',
    greeting: 'Je peux te guider à travers le parcours, les projets et les compétences de Riham. Que souhaites-tu découvrir ?',
    placeholder: 'Écris ta question…',
    sending: 'Réflexion…',
    unavailable: 'Je suis momentanément indisponible. Tu peux contacter Riham directement par e-mail.',
    helper: 'Choisis un sujet ou pose ta question.',
    topics: [
      { label: 'Projets', detail: 'IA, web & mobile', prompt: 'Quels sont les projets les plus importants de Riham ?' },
      { label: 'Compétences', detail: 'Stack technique & DevOps', prompt: 'Quelles sont les compétences techniques de Riham ?' },
      { label: 'Expérience', detail: 'Stages & réalisations', prompt: 'Peux-tu me parler de l’expérience de Riham ?' },
    ],
    launcher: 'Poser une question',
    ariaOpen: 'Ouvrir le chatbot',
    ariaClose: 'Fermer le chatbot',
  },
  en: {
    title: 'Riham AI',
    status: 'Portfolio assistant · Online',
    welcome: 'Hello, I’m Riham AI.',
    greeting: 'I can guide you through Riham’s background, projects, and skills. What would you like to explore?',
    placeholder: 'Write your question…',
    sending: 'Thinking…',
    unavailable: 'I am temporarily unavailable. You can contact Riham directly by email.',
    helper: 'Choose a topic or ask your question.',
    topics: [
      { label: 'Projects', detail: 'AI, web & mobile', prompt: 'What are Riham’s most important projects?' },
      { label: 'Skills', detail: 'Tech stack & DevOps', prompt: 'What are Riham’s technical skills?' },
      { label: 'Experience', detail: 'Internships & achievements', prompt: 'Can you tell me about Riham’s experience?' },
    ],
    launcher: 'Ask a question',
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
  const topicIcons = [FiCode, FiUser, FiBriefcase];

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
          {messages.length === 1 && <div className={styles.intro}><p>{copy.welcome}</p><span>{copy.greeting}</span><small>{copy.helper}</small><div className={styles.topics}>{copy.topics.map((topic, index) => { const Icon = topicIcons[index]; return <button type="button" key={topic.label} onClick={() => ask(topic.prompt)} disabled={sending}><Icon /><span><b>{topic.label}</b><small>{topic.detail}</small></span></button>; })}</div></div>}
          {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`${styles.message} ${message.role === 'user' ? styles.user : styles.assistant}`}><span>{message.role === 'user' ? 'You' : 'RB'}</span><p>{message.content}</p></div>)}
          {sending && <p className={`${styles.assistant} ${styles.thinking}`}>{copy.sending}<span /><span /><span /></p>}
        </div>
        <form className={styles.form} onSubmit={(event) => { event.preventDefault(); ask(input); }}>
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={copy.placeholder} maxLength={800} aria-label={copy.placeholder} />
          <button type="submit" disabled={!input.trim() || sending} aria-label="Send"><FiSend /></button>
        </form>
      </div>}
      <button type="button" className={styles.launcher} onClick={() => setOpen((current) => !current)} aria-label={open ? copy.ariaClose : copy.ariaOpen}>
        {open ? <FiX /> : <><FiMessageCircle /><span>{copy.launcher}</span><i /></>}
      </button>
    </aside>
  );
}
