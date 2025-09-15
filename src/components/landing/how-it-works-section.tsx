import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, FileText, Trello, Edit, TrendingUp, Lightbulb } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: '1. Paste Your Text',
    description: 'Drop in any unstructured text, such as meeting minutes, brainstorms, or a simple to-do list.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: '2. Let AI Do the Work',
    description: 'Our AI instantly parses your text, identifying tasks, owners, and deadlines in seconds.',
  },
  {
    icon: <Trello className="h-8 w-8 text-primary" />,
    title: '3. Get Your Action Board',
    description: 'Your tasks appear on a clean, interactive Kanban board, ready for you to manage.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: '4. Drag, Drop, and Done',
    description: 'Move tasks through your workflow and track progress with a satisfyingly simple interface.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: '5. Gain Smart Insights',
    description: 'Get AI-driven feedback to spot bottlenecks and optimize your team\'s workflow over time.',
  },
  {
    icon: <Edit className="h-8 w-8 text-primary" />,
    title: '6. Edit on the Fly',
    description: 'Quickly approve the AI\'s suggestions or make manual edits anytime directly on the board.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-secondary/20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
          From Chaos to Clarity in 60 Seconds
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          A workflow so simple, it feels like magic. Go from messy notes to a structured plan without the manual effort.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="text-center bg-background/50">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/50">
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{step.title}</CardTitle>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
