
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type HeroSectionProps = {
  setIsLoading: (isLoading: boolean) => void;
};

export default function HeroSection({ setIsLoading }: HeroSectionProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push('/board');
  };

  return (
    <section className="w-full">
      <div className="container mx-auto text-center py-28 sm:py-40 lg:py-48">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground font-headline">
          Turn Chaotic Notes Into <br />
          <span className="text-primary font-glitch">Effortless Action</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
          Stop letting great ideas die in scattered notes. KANBI’s AI instantly converts your raw text into an organized Kanban board. No signup required, 100% free and private.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" onClick={handleClick}>
            Start Organizing Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
