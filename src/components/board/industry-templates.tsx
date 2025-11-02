'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Code, Palette, TrendingUp, Heart, GraduationCap, ShoppingCart, Building, Video, Utensils } from 'lucide-react';

type IndustryTemplate = {
  id: string;
  name: string;
  industry: string;
  icon: React.ReactNode;
  tasks: Omit<Task, 'id' | 'createdAt'>[];
};

const industryTemplates: IndustryTemplate[] = [
  {
    id: 'saas-launch',
    name: 'SaaS Product Launch',
    industry: 'Technology',
    icon: <Code className="h-5 w-5" />,
    tasks: [
      { title: 'Define MVP features and scope', status: 'To Do', priority: 'Critical', estimatedHours: 8, tags: ['planning', 'mvp'] },
      { title: 'Set up CI/CD pipeline', status: 'To Do', priority: 'High', estimatedHours: 6, tags: ['devops', 'automation'] },
      { title: 'Implement authentication system', status: 'To Do', priority: 'High', estimatedHours: 12, tags: ['security', 'backend'] },
      { title: 'Design landing page', status: 'To Do', priority: 'Medium', estimatedHours: 8, tags: ['design', 'marketing'] },
      { title: 'Beta testing with 50 users', status: 'To Do', priority: 'Medium', estimatedHours: 20, tags: ['testing', 'feedback'] }
    ]
  },
  {
    id: 'design-agency',
    name: 'Client Design Project',
    industry: 'Design',
    icon: <Palette className="h-5 w-5" />,
    tasks: [
      { title: 'Client discovery call', status: 'To Do', priority: 'High', estimatedHours: 2, tags: ['client', 'discovery'] },
      { title: 'Create mood boards', status: 'To Do', priority: 'High', estimatedHours: 4, tags: ['design', 'concept'] },
      { title: 'Design 3 initial concepts', status: 'To Do', priority: 'High', estimatedHours: 16, tags: ['design', 'concepts'] },
      { title: 'Client feedback round', status: 'To Do', priority: 'Medium', estimatedHours: 2, tags: ['feedback', 'revision'] },
      { title: 'Final deliverables package', status: 'To Do', priority: 'Medium', estimatedHours: 6, tags: ['delivery', 'assets'] }
    ]
  },
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign',
    industry: 'Marketing',
    icon: <TrendingUp className="h-5 w-5" />,
    tasks: [
      { title: 'Define target audience and personas', status: 'To Do', priority: 'Critical', estimatedHours: 4, tags: ['strategy', 'audience'] },
      { title: 'Create content calendar', status: 'To Do', priority: 'High', estimatedHours: 3, tags: ['planning', 'content'] },
      { title: 'Design social media assets', status: 'To Do', priority: 'High', estimatedHours: 8, tags: ['design', 'social'] },
      { title: 'Set up email automation', status: 'To Do', priority: 'Medium', estimatedHours: 6, tags: ['email', 'automation'] },
      { title: 'Launch and monitor metrics', status: 'To Do', priority: 'Medium', estimatedHours: 10, tags: ['launch', 'analytics'] }
    ]
  },
  {
    id: 'healthcare-compliance',
    name: 'Healthcare Compliance',
    industry: 'Healthcare',
    icon: <Heart className="h-5 w-5" />,
    tasks: [
      { title: 'HIPAA compliance audit', status: 'To Do', priority: 'Critical', estimatedHours: 12, tags: ['compliance', 'audit'] },
      { title: 'Update privacy policies', status: 'To Do', priority: 'High', estimatedHours: 4, tags: ['legal', 'privacy'] },
      { title: 'Staff training on protocols', status: 'To Do', priority: 'High', estimatedHours: 8, tags: ['training', 'staff'] },
      { title: 'Implement data encryption', status: 'To Do', priority: 'Critical', estimatedHours: 16, tags: ['security', 'data'] },
      { title: 'Quarterly compliance review', status: 'To Do', priority: 'Medium', estimatedHours: 6, tags: ['review', 'compliance'] }
    ]
  },
  {
    id: 'education-course',
    name: 'Online Course Creation',
    industry: 'Education',
    icon: <GraduationCap className="h-5 w-5" />,
    tasks: [
      { title: 'Define learning objectives', status: 'To Do', priority: 'High', estimatedHours: 4, tags: ['planning', 'curriculum'] },
      { title: 'Create course outline', status: 'To Do', priority: 'High', estimatedHours: 6, tags: ['structure', 'content'] },
      { title: 'Record video lessons', status: 'To Do', priority: 'High', estimatedHours: 24, tags: ['video', 'content'] },
      { title: 'Design worksheets and resources', status: 'To Do', priority: 'Medium', estimatedHours: 8, tags: ['resources', 'materials'] },
      { title: 'Set up course platform', status: 'To Do', priority: 'Medium', estimatedHours: 6, tags: ['platform', 'setup'] }
    ]
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store Setup',
    industry: 'E-commerce',
    icon: <ShoppingCart className="h-5 w-5" />,
    tasks: [
      { title: 'Choose platform and hosting', status: 'To Do', priority: 'Critical', estimatedHours: 4, tags: ['platform', 'setup'] },
      { title: 'Product photography and descriptions', status: 'To Do', priority: 'High', estimatedHours: 16, tags: ['products', 'content'] },
      { title: 'Set up payment gateway', status: 'To Do', priority: 'Critical', estimatedHours: 6, tags: ['payments', 'integration'] },
      { title: 'Configure shipping options', status: 'To Do', priority: 'High', estimatedHours: 4, tags: ['shipping', 'logistics'] },
      { title: 'Launch marketing campaign', status: 'To Do', priority: 'Medium', estimatedHours: 12, tags: ['marketing', 'launch'] }
    ]
  },
  {
    id: 'real-estate',
    name: 'Property Development',
    industry: 'Real Estate',
    icon: <Building className="h-5 w-5" />,
    tasks: [
      { title: 'Site inspection and feasibility', status: 'To Do', priority: 'Critical', estimatedHours: 8, tags: ['inspection', 'analysis'] },
      { title: 'Secure financing and permits', status: 'To Do', priority: 'Critical', estimatedHours: 20, tags: ['finance', 'legal'] },
      { title: 'Hire contractors and architects', status: 'To Do', priority: 'High', estimatedHours: 12, tags: ['hiring', 'team'] },
      { title: 'Construction phase management', status: 'To Do', priority: 'High', estimatedHours: 160, tags: ['construction', 'management'] },
      { title: 'Marketing and sales strategy', status: 'To Do', priority: 'Medium', estimatedHours: 16, tags: ['marketing', 'sales'] }
    ]
  },
  {
    id: 'content-creator',
    name: 'Content Creation',
    industry: 'Media',
    icon: <Video className="h-5 w-5" />,
    tasks: [
      { title: 'Research trending topics', status: 'To Do', priority: 'High', estimatedHours: 3, tags: ['research', 'trends'] },
      { title: 'Script writing and storyboard', status: 'To Do', priority: 'High', estimatedHours: 6, tags: ['script', 'planning'] },
      { title: 'Film and record content', status: 'To Do', priority: 'Critical', estimatedHours: 8, tags: ['production', 'filming'] },
      { title: 'Edit and add effects', status: 'To Do', priority: 'High', estimatedHours: 10, tags: ['editing', 'post-production'] },
      { title: 'Publish and promote', status: 'To Do', priority: 'Medium', estimatedHours: 4, tags: ['publishing', 'marketing'] }
    ]
  },
  {
    id: 'restaurant-launch',
    name: 'Restaurant Opening',
    industry: 'Food & Beverage',
    icon: <Utensils className="h-5 w-5" />,
    tasks: [
      { title: 'Secure location and permits', status: 'To Do', priority: 'Critical', estimatedHours: 40, tags: ['legal', 'location'] },
      { title: 'Design menu and pricing', status: 'To Do', priority: 'High', estimatedHours: 12, tags: ['menu', 'pricing'] },
      { title: 'Hire and train staff', status: 'To Do', priority: 'High', estimatedHours: 24, tags: ['hiring', 'training'] },
      { title: 'Kitchen equipment setup', status: 'To Do', priority: 'Critical', estimatedHours: 16, tags: ['equipment', 'setup'] },
      { title: 'Soft opening and feedback', status: 'To Do', priority: 'Medium', estimatedHours: 20, tags: ['testing', 'feedback'] }
    ]
  }
];

type IndustryTemplatesProps = {
  addTask: (task: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
};

export default function IndustryTemplates({ addTask }: IndustryTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const applyTemplate = (template: IndustryTemplate) => {
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
      <h3 className="text-lg font-semibold">Industry-Specific Templates</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {industryTemplates.map(template => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                {template.icon}
                <div>
                  <div>{template.name}</div>
                  <div className="text-xs text-muted-foreground font-normal">{template.industry}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">{template.tasks.length} tasks</Badge>
                <Badge variant="outline" className="text-xs">
                  {template.tasks.reduce((acc, task) => acc + (task.estimatedHours || 0), 0)}h
                </Badge>
              </div>
              <Button 
                onClick={() => applyTemplate(template)}
                className="w-full"
                size="sm"
                variant={selectedTemplate === template.id ? "secondary" : "outline"}
                disabled={selectedTemplate === template.id}
              >
                {selectedTemplate === template.id ? 'Applied!' : <><Plus className="h-3 w-3 mr-1" />Use Template</>}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}