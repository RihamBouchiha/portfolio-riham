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
  // L'état est ici pour que Navbar et HeroSection puissent le voir
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <main>
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      
      {/* On passe setActiveItem à la Hero pour la flèche */}
      <HeroSection setActiveItem={setActiveItem} />
      
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <PortfolioSection />
        <CertificationsSection />
        <ExperiencesSection />
        <ContactSection />
      
    </main>
  );
}