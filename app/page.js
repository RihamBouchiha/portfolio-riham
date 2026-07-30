'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import PortfolioSection from '@/components/PortfolioSection';
import CertificationsSection from '@/components/CertificationsSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const [activeItem, setActiveItem] = useState('Home');
  const [language, setLanguage] = useState('fr');

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
      <SkillsSection language={language} />
      <EducationSection language={language} />
      <PortfolioSection language={language} />
      <CertificationsSection language={language} />
      <ExperiencesSection language={language} />
      <ContactSection language={language} />
    </main>
  );
}