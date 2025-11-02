'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Code, Briefcase } from 'lucide-react';
import { Task } from '@/lib/types';

type QuickStartTemplatesProps = {
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
};

const templates = [
  {
    name: 'Product Launch',
    icon: <Rocket className="h-5 w-5" />,
    tasks: [
      { title: 'Define product requirements', status: 'To Do' as const, priority: 'High' as const },
      { title: 'Design mockups', status: 'To Do' as const, priority: 'High' as const },
      { title: 'Build MVP', status: 'To Do' as const, priority: 'Critical' as const },
    ]
  },
  {
    name: 'Software Development',
    icon: <Code className="h-5 w-5" />,
    tasks: [
      { title: 'Setup development environment', status: 'To Do' as const, priority: 'High' as const },
      { title: 'Implement core features', status: 'To Do' as const, priority: 'Critical' as const },
      { title: 'Write tests', status: 'To Do' as const, priority: 'Medium' as const },
    ]
  },
  {
    name: 'Business Planning',
    icon: <Briefcase className="h-5 w-5" />,
    tasks: [
      { title: 'Market research', status: 'To Do' as const, priority: 'High' as const },
      { title: 'Create business plan', status: 'To Do' as const, priority: 'Critical' as const },
      { title: 'Pitch to investors', status: 'To Do' as const, priority: 'High' as const },
    ]
  }
];

export default function QuickStartTemplates({ addTask }: QuickStartTemplatesProps) {
  const loadTemplate = (templateTasks: typeof templates[0]['tasks']) => {
    templateTasks.forEach(task => addTask(task));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quick Start Templates</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {templates.map((template) => (
          <Button
            key={template.name}
            variant="outline"
            className="h-auto flex-col gap-2 p-4"
            onClick={() => loadTemplate(template.tasks)}
          >
            {template.icon}
            <span className="text-xs font-medium">{template.name}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
