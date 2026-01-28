'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';

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
    </main>
  );
}