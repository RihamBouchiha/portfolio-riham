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
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('portfolio-language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolio-language', language);
  }, [language]);

  if (!portfolioOpen) {
    return <IntroGame key={language} language={language} setLanguage={setLanguage} onOpen={() => setPortfolioOpen(true)} />;
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
