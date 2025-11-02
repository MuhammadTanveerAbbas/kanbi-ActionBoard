'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft, Sparkles, Edit, MousePointerClick, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: <Sparkles className="w-8 h-8 text-muted-foreground" />,
    title: "Welcome to KANBI",
    description: "Transform your notes into organized tasks instantly. Let's show you how it works."
  },
  {
    icon: <Edit className="w-8 h-8 text-muted-foreground" />,
    title: "Add Your Tasks",
    description: "Click 'Add Task' to create tasks or paste your notes to extract them automatically. Set priority, owner, and due dates."
  },
  {
    icon: <MousePointerClick className="w-8 h-8 text-muted-foreground" />,
    title: "Organize with Drag & Drop",
    description: "Move tasks between To Do, In Progress, and Done columns. Click any task to edit or delete it."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-muted-foreground" />,
    title: "Track Your Progress",
    description: "View insights and analytics to understand your workflow. Export your data anytime as JSON or CSV."
  }
];

export default function Walkthrough() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenWalkthrough = localStorage.getItem('hasSeenWalkthrough');
    if (!hasSeenWalkthrough) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWalkthrough', 'true');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {steps[currentStep].icon}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {steps[currentStep].description}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handlePrev}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            {currentStep < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 ml-1" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
          <button
            onClick={handleClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip tutorial
          </button>
        </div>
      </div>
    </div>
  );
}
