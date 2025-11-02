'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

type AutomationRule = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
};

type TaskAutomationProps = {
  tasks: Task[];
  updateTask: (taskId: string, updates: Partial<Task>) => void;
};

export default function TaskAutomation({ tasks, updateTask }: TaskAutomationProps) {
  const [automations, setAutomations] = useState<AutomationRule[]>([
    {
      id: 'auto-priority',
      name: 'Auto-prioritize by deadline',
      description: 'Automatically set priority based on deadline proximity',
      enabled: true,
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      id: 'auto-complete-deps',
      name: 'Auto-complete dependencies',
      description: 'Mark tasks as ready when dependencies are done',
      enabled: true,
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: 'auto-remind',
      name: 'Smart reminders',
      description: 'Send reminders for overdue or upcoming tasks',
      enabled: false,
      icon: <Clock className="h-4 w-4" />
    },
    {
      id: 'auto-assign',
      name: 'Load balancing',
      description: 'Suggest task assignments based on workload',
      enabled: false,
      icon: <Zap className="h-4 w-4" />
    }
  ]);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(auto => 
        auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
      )
    );

    // Apply automation logic
    if (id === 'auto-priority') {
      applyAutoPriority();
    } else if (id === 'auto-complete-deps') {
      applyAutoCompleteDeps();
    }
  };

  const applyAutoPriority = () => {
    const now = new Date();
    tasks.forEach(task => {
      if (task.deadline && task.status !== 'Done') {
        const deadline = new Date(task.deadline);
        const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        let newPriority: Task['priority'];
        if (daysUntil < 0) newPriority = 'Critical';
        else if (daysUntil <= 2) newPriority = 'High';
        else if (daysUntil <= 7) newPriority = 'Medium';
        else newPriority = 'Low';
        
        if (task.priority !== newPriority) {
          updateTask(task.id, { priority: newPriority });
        }
      }
    });
  };

  const applyAutoCompleteDeps = () => {
    tasks.forEach(task => {
      if (task.dependencies && task.dependencies.length > 0) {
        const allDepsComplete = task.dependencies.every(depId => {
          const depTask = tasks.find(t => t.id === depId);
          return depTask?.status === 'Done';
        });
        
        if (allDepsComplete && !task.tags?.includes('ready')) {
          const newTags = [...(task.tags || []), 'ready'];
          updateTask(task.id, { tags: newTags });
        }
      }
    });
  };

  const activeCount = automations.filter(a => a.enabled).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Task Automation
          </span>
          <Badge variant="secondary">{activeCount} active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-hidden">
        {automations.map(automation => (
          <div key={automation.id} className="flex items-start justify-between gap-3 p-3 rounded-lg border">
            <div className="flex gap-3 flex-1">
              <div className="flex-shrink-0 mt-1">
                {automation.icon}
              </div>
              <div className="space-y-1 min-w-0">
                <Label htmlFor={automation.id} className="text-sm font-medium cursor-pointer break-words">
                  {automation.name}
                </Label>
                <p className="text-xs text-muted-foreground break-words">
                  {automation.description}
                </p>
              </div>
            </div>
            <Switch
              id={automation.id}
              checked={automation.enabled}
              onCheckedChange={() => toggleAutomation(automation.id)}
            />
          </div>
        ))}
        
        {activeCount > 0 && (
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Automations run in the background to optimize your workflow
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}