'use client';

import { useState } from 'react';
import { generateTasksAction } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

const placeholderText = `Paste your notes here. For example:
- Sarah to design the new logo by Friday.
- Alex needs to finalize the budget next week.`;

export default function TaskGenerator({ addTask }: { addTask: (task: { title: string; owner?: string; deadline?: string; }) => void; }) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast({
        title: 'Input needed',
        description: 'Please paste some text to generate tasks.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const generatedTasks = await generateTasksAction({ text });
      
      if (!generatedTasks || generatedTasks.length === 0) {
        toast({
          title: 'No tasks found',
          description: 'The AI could not identify any tasks in the text provided.',
        });
      } else {
        generatedTasks.forEach(t => {
          addTask({ title: t.task, owner: t.owner, deadline: t.deadline });
        });
        toast({
          title: 'Tasks Generated!',
          description: `Successfully added ${generatedTasks.length} new tasks to your board.`,
        });
        setText('');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Tasks',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-text" className="text-lg font-semibold">Generate Tasks from Text</Label>
        <Textarea
          id="task-text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholderText}
          rows={12}
          className="bg-card"
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit" disabled={isLoading} size="lg">
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating...' : 'Generate Tasks'}
        </Button>
      </div>
    </form>
  );
}
