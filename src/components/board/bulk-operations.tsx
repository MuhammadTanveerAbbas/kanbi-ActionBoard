'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Archive, Users, Calendar } from 'lucide-react';

type BulkOperationsProps = {
  tasks: Task[];
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
};

export default function BulkOperations({ tasks, updateTask, deleteTask }: BulkOperationsProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const selectAllTasks = () => {
    setSelectedTasks(selectedTasks.length === tasks.length ? [] : tasks.map(t => t.id));
  };

  const executeBulkAction = () => {
    if (!bulkAction || selectedTasks.length === 0) return;

    selectedTasks.forEach(taskId => {
      switch (bulkAction) {
        case 'delete':
          deleteTask(taskId);
          break;
        case 'todo':
          updateTask(taskId, { status: 'To Do' });
          break;
        case 'progress':
          updateTask(taskId, { status: 'In Progress' });
          break;
        case 'done':
          updateTask(taskId, { status: 'Done' });
          break;
        case 'high-priority':
          updateTask(taskId, { priority: 'High' });
          break;
        case 'low-priority':
          updateTask(taskId, { priority: 'Low' });
          break;
      }
    });

    setSelectedTasks([]);
    setBulkAction('');
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={selectedTasks.length === tasks.length && tasks.length > 0}
            onCheckedChange={selectAllTasks}
          />
          <span className="text-sm font-medium">
            {selectedTasks.length} of {tasks.length} selected
          </span>
        </div>
        
        {selectedTasks.length > 0 && (
          <div className="flex items-center gap-2">
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Bulk action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Move to To Do</SelectItem>
                <SelectItem value="progress">Move to In Progress</SelectItem>
                <SelectItem value="done">Move to Done</SelectItem>
                <SelectItem value="high-priority">Set High Priority</SelectItem>
                <SelectItem value="low-priority">Set Low Priority</SelectItem>
                <SelectItem value="delete">Delete Tasks</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={executeBulkAction} 
              disabled={!bulkAction}
              variant={bulkAction === 'delete' ? 'destructive' : 'default'}
            >
              Apply
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-2 max-h-60 overflow-y-auto">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-muted rounded">
            <Checkbox 
              checked={selectedTasks.includes(task.id)}
              onCheckedChange={() => toggleTaskSelection(task.id)}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{task.title}</div>
              <div className="text-xs text-muted-foreground">
                {task.owner && <span>👤 {task.owner}</span>}
                {task.deadline && <span className="ml-2">📅 {task.deadline}</span>}
                {task.priority && <span className="ml-2">🏷️ {task.priority}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}