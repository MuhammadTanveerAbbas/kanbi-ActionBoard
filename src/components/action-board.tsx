'use client';

import { useTasksStore } from '@/hooks/use-tasks-store';
import TaskGenerator from './ai/task-generator';
import InsightsPanel from './ai/insights-panel';
import ProgressTracker from './board/progress-tracker';
import KanbanBoard from './board/kanban-board';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Sparkles } from 'lucide-react';

export default function Kanbi() {
  const store = useTasksStore();
  const hasTasks = store.tasks.length > 0;

  if (!store.isInitialized) {
    return <KanbiSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight text-center font-headline">KANBI</CardTitle>
        <CardDescription className="text-center max-w-2xl mx-auto">
          From scattered thoughts to a structured plan. Paste your notes, and let our AI build your board.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TaskGenerator addTask={store.addTask} />
          </div>
          <div className="lg:col-span-1">
            <InsightsPanel tasks={store.tasks} />
          </div>
        </div>

        {hasTasks && (
          <>
            <div>
              <ProgressTracker tasks={store.tasks} />
            </div>
            
            <div className="mt-4">
              <KanbanBoard store={store} />
            </div>
          </>
        )}

        {!hasTasks && (
          <div className="text-center py-16 border-2 border-dashed rounded-lg bg-background/50">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-foreground">Your board is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Generate tasks from your notes above to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function KanbiSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6 items-center">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-8 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-2">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-36 w-full" />
            <div className="flex justify-center pt-2">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-2">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-36 w-full" />
          </div>
        </div>
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Skeleton className="mx-auto h-12 w-12 rounded-full" />
          <Skeleton className="mt-4 h-6 w-48 mx-auto" />
          <Skeleton className="mt-2 h-4 w-64 mx-auto" />
        </div>
      </CardContent>
    </Card>
  )
}
