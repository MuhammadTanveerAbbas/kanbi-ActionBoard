
'use client';

import { useState } from 'react';
import AudienceSection from '@/components/landing/audience-section';
import FeaturesSection from '@/components/landing/features-section';
import FinalCtaSection from '@/components/landing/final-cta-section';
import HeroSection from '@/components/landing/hero-section';
import HowItWorksSection from '@/components/landing/how-it-works-section';
import ProblemSection from '@/components/landing/problem-section';
import SolutionSection from '@/components/landing/solution-section';
import Loader from '@/components/ui/loader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <HeroSection setIsLoading={setIsLoading} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AudienceSection />
      <FinalCtaSection setIsLoading={setIsLoading} />
    </div>
  );
}
