'use client';

import HeroSection from '@/sections/HeroSection';
import WorksSection from '@/sections/WorksSection';
import AboutSection from '@/sections/AboutSection';
import ContactSection from '@/sections/ContactSection';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <WorksSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
} 