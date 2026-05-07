'use client';

import { useState } from 'react';
import { IntroLoader } from '@/components/landing/IntroLoader';
import { LandingNav } from '@/components/landing/LandingNav';
import { Hero } from '@/components/landing/Hero';
import { VisionScene } from '@/components/landing/VisionScene';
import { IntelligenceScene } from '@/components/landing/IntelligenceScene';
import { ReachScene } from '@/components/landing/ReachScene';
import { LaptopReveal } from '@/components/landing/LaptopReveal';
import { TrustScene } from '@/components/landing/TrustScene';
import { FinalCTA } from '@/components/landing/FinalCTA';

export default function LandingPage() {
  const [, setLoaded] = useState(false);
  return (
    <main className="relative bg-canvas">
      <IntroLoader onDone={() => setLoaded(true)} />
      <LandingNav />
      <Hero />
      <VisionScene />
      <IntelligenceScene />
      <ReachScene />
      <LaptopReveal />
      <TrustScene />
      <FinalCTA />
    </main>
  );
}
