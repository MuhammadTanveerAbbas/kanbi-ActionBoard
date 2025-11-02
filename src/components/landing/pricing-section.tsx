'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for personal use',
    features: [
      'Unlimited tasks',
      'AI task generation',
      'Kanban board',
      'Local storage',
      'Export/Import',
      'Basic insights'
    ],
    cta: 'Get Started Free',
    popular: false,
    icon: <Check className="h-5 w-5" />
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For power users and small teams',
    features: [
      'Everything in Free',
      'Advanced analytics',
      'Team collaboration',
      'Priority support',
      'Custom templates',
      'API access',
      'Advanced AI insights'
    ],
    cta: 'Start Pro Trial',
    popular: true,
    icon: <Star className="h-5 w-5" />
  },
  {
    name: 'Enterprise',
    price: '$29',
    period: 'per month',
    description: 'For large teams and organizations',
    features: [
      'Everything in Pro',
      'SSO integration',
      'Advanced security',
      'Custom integrations',
      'Dedicated support',
      'On-premise deployment',
      'Custom AI training'
    ],
    cta: 'Contact Sales',
    popular: false,
    icon: <Zap className="h-5 w-5" />
  }
];

export default function PricingSection() {
  return (
    <section className="w-full py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-headline">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4 sm:pb-8">
                <div className="flex items-center justify-center mb-4">
                  {plan.icon}
                  <CardTitle className="ml-2 text-xl sm:text-2xl">{plan.name}</CardTitle>
                </div>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center justify-center text-center">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-2">
          <p className="text-sm text-muted-foreground">
            All plans include 30-day money-back guarantee. No questions asked.
          </p>
          <p className="text-xs text-muted-foreground/70 italic">
            * Pricing structure for demonstration. Full implementation with backend, auth, and payments available for client projects.
          </p>
        </div>
      </div>
    </section>
  );
}