'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Briefcase, Code, Users, Lightbulb } from 'lucide-react';

type TaskTemplate = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tasks: Omit<Task, 'id' | 'createdAt'>[];
};

const templates: TaskTemplate[] = [
  {
    id: 'project-kickoff',
    name: 'Project Kickoff',
    description: 'Essential tasks for starting a new project',
    icon: <Briefcase className="h-5 w-5" />,
    tasks: [
      {
        title: 'Define project scope and objectives',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 4,
        tags: ['planning', 'scope']
      },
      {
        title: 'Identify key stakeholders',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 2,
        tags: ['stakeholders', 'communication']
      },
      {
        title: 'Create project timeline',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 3,
        tags: ['planning', 'timeline']
      },
      {
        title: 'Set up project communication channels',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 1,
        tags: ['communication', 'setup']
      }
    ]
  },
  {
    id: 'software-development',
    name: 'Software Development Sprint',
    description: 'Common tasks for a development sprint',
    icon: <Code className="h-5 w-5" />,
    tasks: [
      {
        title: 'Review and refine user stories',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 2,
        tags: ['requirements', 'stories']
      },
      {
        title: 'Set up development environment',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 3,
        tags: ['setup', 'environment']
      },
      {
        title: 'Implement core features',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 16,
        tags: ['development', 'features']
      },
      {
        title: 'Write unit tests',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 8,
        tags: ['testing', 'quality']
      },
      {
        title: 'Code review and refactoring',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 4,
        tags: ['review', 'quality']
      }
    ]
  },
  {
    id: 'team-onboarding',
    name: 'Team Member Onboarding',
    description: 'Tasks for onboarding new team members',
    icon: <Users className="h-5 w-5" />,
    tasks: [
      {
        title: 'Prepare onboarding materials',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 2,
        tags: ['preparation', 'documentation']
      },
      {
        title: 'Set up workspace and accounts',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 1,
        tags: ['setup', 'accounts']
      },
      {
        title: 'Schedule introduction meetings',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 1,
        tags: ['meetings', 'introductions']
      },
      {
        title: 'Assign buddy/mentor',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 0.5,
        tags: ['mentoring', 'support']
      },
      {
        title: 'First week check-in',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 1,
        tags: ['feedback', 'check-in']
      }
    ]
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Key tasks for launching a new product',
    icon: <Lightbulb className="h-5 w-5" />,
    tasks: [
      {
        title: 'Finalize product features',
        status: 'To Do',
        priority: 'Critical',
        estimatedHours: 8,
        tags: ['product', 'features']
      },
      {
        title: 'Create marketing materials',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 6,
        tags: ['marketing', 'content']
      },
      {
        title: 'Set up analytics and tracking',
        status: 'To Do',
        priority: 'High',
        estimatedHours: 3,
        tags: ['analytics', 'tracking']
      },
      {
        title: 'Prepare launch announcement',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 2,
        tags: ['announcement', 'communication']
      },
      {
        title: 'Monitor launch metrics',
        status: 'To Do',
        priority: 'Medium',
        estimatedHours: 4,
        tags: ['monitoring', 'metrics']
      }
    ]
  }
];

type TaskTemplatesProps = {
  addTask: (task: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
};

export default function TaskTemplates({ addTask }: TaskTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const applyTemplate = (template: TaskTemplate) => {
    template.tasks.forEach(task => {
      addTask({
        title: task.title,
        owner: task.owner,
        deadline: task.deadline,
        priority: task.priority,
        tags: task.tags,
        estimatedHours: task.estimatedHours,
        description: task.description,
      });
    });
    
    setSelectedTemplate(template.id);
    setTimeout(() => setSelectedTemplate(null), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quick Start Templates</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {templates.map(template => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                {template.icon}
                {template.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">{template.tasks.length} tasks</Badge>
                <Badge variant="outline">
                  {template.tasks.reduce((acc, task) => acc + (task.estimatedHours || 0), 0)}h total
                </Badge>
              </div>
              <Button 
                onClick={() => applyTemplate(template)}
                className="w-full"
                variant={selectedTemplate === template.id ? "secondary" : "outline"}
                disabled={selectedTemplate === template.id}
              >
                {selectedTemplate === template.id ? (
                  'Applied!'
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Use Template
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}