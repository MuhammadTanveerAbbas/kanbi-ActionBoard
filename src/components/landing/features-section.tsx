import { Card, CardContent } from '@/components/ui/card';
import { Bot, Edit, Lightbulb, MousePointerSquareDashed, UserX, WifiOff } from 'lucide-react';

const features = [
  {
    icon: <Bot className="h-6 w-6 text-primary" />,
    name: 'AI Task Parsing',
    description: 'Our AI finds action items, owners, and due dates in your text.',
  },
  {
    icon: <WifiOff className="h-6 w-6 text-primary" />,
    name: 'Works Offline',
    description: 'Your data stays in your browser. Work from anywhere, anytime.',
  },
  {
    icon: <MousePointerSquareDashed className="h-6 w-6 text-primary" />,
    name: 'Kanban Board',
    description: 'A clean, drag-and-drop interface to visualize your workflow.',
  },
  {
    icon: <UserX className="h-6 w-6 text-primary" />,
    name: 'No Login Required',
    description: 'Get straight to planning. No accounts, no setup, no friction.',
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    name: 'AI Insights',
    description: 'Go beyond tracking with AI-driven suggestions to optimize your workflow.',
  },
  {
    icon: <Edit className="h-6 w-6 text-primary" />,
    name: 'Edit Tasks Inline',
    description: 'Quickly approve the AI\'s suggestions or make manual edits anytime.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
          Designed for Action, Built for Speed
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          KANBI is packed with features that get out of your way and let you focus on what matters.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.name} className="text-left bg-secondary/30 hover:bg-secondary/60 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold">{feature.name}</h3>
                </div>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
