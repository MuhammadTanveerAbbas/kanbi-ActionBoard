'use client';

import { Task } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { useMemo } from 'react';

type ProgressTrackerProps = {
  tasks: Task[];
};

export default function ProgressTracker({ tasks }: ProgressTrackerProps) {
  const { todoCount, inProgressCount, doneCount, completionPercentage } = useMemo(() => {
    const todoCount = tasks.filter(t => t.status === 'To Do').length;
    const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
    const doneCount = tasks.filter(t => t.status === 'Done').length;
    const totalTasks = tasks.length;
    const completionPercentage = totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0;
    
    return { todoCount, inProgressCount, doneCount, completionPercentage };
  }, [tasks]);

  return (
    <div className="space-y-3">
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 text-muted-foreground">
                <span><span className="font-bold text-foreground">{todoCount}</span> To Do</span>
                <span><span className="font-bold text-foreground">{inProgressCount}</span> In Progress</span>
                <span><span className="font-bold text-foreground">{doneCount}</span> Done</span>
            </div>
            <div className="font-medium">{Math.round(completionPercentage)}% Complete</div>
        </div>
      <Progress value={completionPercentage} aria-label={`${Math.round(completionPercentage)}% of tasks complete`} />
    </div>
  );
}
