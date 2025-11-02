'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Clock, Flag } from 'lucide-react';

type AdvancedTaskFeaturesProps = {
  task: Task;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  allTasks: Task[];
};

export default function AdvancedTaskFeatures({ task, updateTask, allTasks }: AdvancedTaskFeaturesProps) {
  const [newTag, setNewTag] = useState('');
  const [newDependency, setNewDependency] = useState('');

  const addTag = () => {
    if (newTag.trim()) {
      const tags = [...(task.tags || []), newTag.trim()];
      updateTask(task.id, { tags });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const tags = (task.tags || []).filter(tag => tag !== tagToRemove);
    updateTask(task.id, { tags });
  };

  const addDependency = () => {
    if (newDependency && !task.dependencies?.includes(newDependency)) {
      const dependencies = [...(task.dependencies || []), newDependency];
      updateTask(task.id, { dependencies });
      setNewDependency('');
    }
  };

  const removeDependency = (depToRemove: string) => {
    const dependencies = (task.dependencies || []).filter(dep => dep !== depToRemove);
    updateTask(task.id, { dependencies });
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      {/* Priority */}
      <div className="flex items-center gap-2">
        <Flag className="h-4 w-4" />
        <Select value={task.priority || ''} onValueChange={(value) => updateTask(task.id, { priority: value as Task['priority'] })}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        {task.priority && (
          <Badge className={`${getPriorityColor(task.priority)} text-white`}>
            {task.priority}
          </Badge>
        )}
      </div>

      {/* Estimated Hours */}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <Input
          type="number"
          placeholder="Est. hours"
          value={task.estimatedHours || ''}
          onChange={(e) => updateTask(task.id, { estimatedHours: Number(e.target.value) || undefined })}
          className="w-24"
        />
        {task.estimatedHours && <span className="text-sm text-muted-foreground">{task.estimatedHours}h</span>}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            className="flex-1"
          />
          <Button size="sm" onClick={addTag}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          {task.tags?.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
        </div>
      </div>

      {/* Dependencies */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Select value={newDependency} onValueChange={setNewDependency}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Add dependency" />
            </SelectTrigger>
            <SelectContent>
              {allTasks.filter(t => t.id !== task.id).map(t => (
                <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={addDependency} disabled={!newDependency}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1">
          {task.dependencies?.map(depId => {
            const depTask = allTasks.find(t => t.id === depId);
            return depTask ? (
              <div key={depId} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{depTask.title}</span>
                <X className="h-4 w-4 cursor-pointer" onClick={() => removeDependency(depId)} />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}