
'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

import HeroSection from '@/components/landing/hero-section';
import Loader from '@/components/ui/loader';

const SolutionSection = dynamic(() => import('@/components/landing/solution-section'), { ssr: true });
const ComparisonSection = dynamic(() => import('@/components/landing/comparison-section'), { ssr: true });
const HowItWorksSection = dynamic(() => import('@/components/landing/how-it-works-section'), { ssr: true });
const FeaturesSection = dynamic(() => import('@/components/landing/features-section'), { ssr: true });
const PricingSection = dynamic(() => import('@/components/landing/pricing-section'), { ssr: true });
const FinalCtaSection = dynamic(() => import('@/components/landing/final-cta-section'), { ssr: true });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  // Preload board route
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/board';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

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
      <Suspense fallback={<div className="h-96" />}>
        <SolutionSection />
        <ComparisonSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <FinalCtaSection setIsLoading={setIsLoading} />
      </Suspense>
    </div>
  );
}
