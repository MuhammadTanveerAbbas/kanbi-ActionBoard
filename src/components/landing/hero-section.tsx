"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Lock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

type HeroSectionProps = {
  setIsLoading: (isLoading: boolean) => void;
};

export default function HeroSection({ setIsLoading }: HeroSectionProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    requestAnimationFrame(() => {
      router.push("/board");
    });
  };

  return (
    <section className="w-full relative overflow-hidden">
      <div className="container mx-auto text-center pt-20 pb-32 sm:py-16 lg:py-28 px-4 relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5 sm:mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary">
            Transform Chaos Into Clarity
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground font-headline leading-tight">
          Turn Chaotic Notes Into <br />
          <span
            className="hero-text-stroke font-glitch glitch-effect relative inline-block mt-2"
            data-text="Effortless Action"
          >
            Effortless Action
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4">
          Stop letting great ideas die in scattered notes. KANBI instantly
          converts your raw text into an organized Kanban board.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 sm:mt-8">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 border">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium">
              No signup required
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 border">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium">100% free</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 border">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium">
              Private & secure
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6 sm:mt-10 flex justify-center">
          <Button
            size="lg"
            onClick={handleClick}
            className="text-sm px-6 py-5 shadow-lg hover:shadow-xl transition-all"
          >
            Start Organizing Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-5 sm:mt-8 text-xs text-muted-foreground">
          Trusted by founders, teams, and creators worldwide
        </p>
      </div>
    </section>
  );
}
