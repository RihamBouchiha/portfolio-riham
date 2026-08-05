'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import PortfolioSection from '@/components/PortfolioSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import ContactSection from '@/components/ContactSection';
import IntroGame from '@/components/IntroGame';
import PortfolioChatbot from '@/components/PortfolioChatbot';
import PortfolioPlayground from '@/components/PortfolioPlayground';

export default function Home() {
  const [activeItem, setActiveItem] = useState('Home');
  const [language, setLanguage] = useState('fr');
  const [portfolioOpen, setPortfolioOpen] = useState(null);

  const markIntroSeen = () => {
    try { window.localStorage.setItem('portfolio-intro-seen', 'true'); } catch {}
    document.cookie = 'portfolio-intro-seen=true; max-age=31536000; path=/; SameSite=Lax';
  };

  useEffect(() => {
    let savedLanguage = null;
    let seenInStorage = false;
    try {
      savedLanguage = window.localStorage.getItem('portfolio-language');
      seenInStorage = window.localStorage.getItem('portfolio-intro-seen') === 'true';
    } catch {}
    if (savedLanguage === 'fr' || savedLanguage === 'en') setLanguage(savedLanguage);
    const seenInCookie = document.cookie.split('; ').includes('portfolio-intro-seen=true');
    const hasSeenIntro = seenInStorage || seenInCookie;
    if (!hasSeenIntro) markIntroSeen();
    setPortfolioOpen(hasSeenIntro);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolio-language', language);
  }, [language]);

  const openPortfolio = () => {
    markIntroSeen();
    setPortfolioOpen(true);
  };

  if (portfolioOpen === null) return <main aria-busy="true" />;

  if (!portfolioOpen) {
    return <IntroGame language={language} setLanguage={setLanguage} onStart={markIntroSeen} onOpen={openPortfolio} />;
  }

  return (
    <main>
      <Navbar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        language={language}
        setLanguage={setLanguage}
      />

      <HeroSection setActiveItem={setActiveItem} language={language} />
      <AboutSection language={language} />
      <PortfolioPlayground language={language} />
      <SkillsSection language={language} />
      <EducationSection language={language} />
      <PortfolioSection language={language} />
      <ExperiencesSection language={language} />
      <ContactSection language={language} />
      <PortfolioChatbot language={language} />
    </main>
  );
}
