
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type FinalCtaSectionProps = {
  setIsLoading: (isLoading: boolean) => void;
};

export default function FinalCtaSection({ setIsLoading }: FinalCtaSectionProps) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push('/board');
  };

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
          Ready to Stop Planning and Start Doing?
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Transform your scattered notes into a dynamic action plan in seconds. Your free, private, and intelligent task board is one click away.
        </p>
        <div className="mt-10">
          <Button size="lg" onClick={handleClick}>
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
