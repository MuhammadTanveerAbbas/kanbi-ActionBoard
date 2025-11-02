'use client';

import { useEffect } from 'react';
import { useTasksStore } from '@/hooks/use-tasks-store';
import { useToast } from '@/hooks/use-toast';

export default function KeyboardShortcuts() {
  const store = useTasksStore();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Ctrl/Cmd + N: Add new task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const newTask = {
          title: 'New Task',
          owner: undefined,
          deadline: undefined,
        };
        store.addTask(newTask);
        toast({
          title: 'Task Added',
          description: 'New task created. Click to edit.',
        });
      }

      // Ctrl/Cmd + A: Select all tasks (for bulk operations)
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        // This would need to be implemented with a selection state
        toast({
          title: 'Shortcut',
          description: 'Use the Manage tab for bulk operations.',
        });
      }

      // Ctrl/Cmd + E: Export tasks
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        const dataStr = JSON.stringify(store.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `kanbi-tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: 'Export Complete',
          description: 'Tasks exported to JSON file.',
        });
      }

      // ? : Show shortcuts help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toast({
          title: 'Keyboard Shortcuts',
          description: 'Ctrl+N: New task, Ctrl+E: Export, ?: Help',
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [store, toast]);

  return null; // This component only handles keyboard events
}