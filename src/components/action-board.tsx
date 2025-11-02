"use client";

import { useTasksStore } from "@/hooks/use-tasks-store";
import TaskGenerator from "./ai/task-generator";
import InsightsPanel from "./ai/insights-panel";
import ProgressTracker from "./board/progress-tracker";
import KanbanBoard from "./board/kanban-board";
import BulkOperations from "./board/bulk-operations";
import ExportImport from "./board/export-import";
import SearchFilter from "./board/search-filter";
import KeyboardShortcuts from "./board/keyboard-shortcuts";
import QuickStartTemplates from "./board/quick-start-templates";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Sparkles } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function Kanbi() {
  const store = useTasksStore();
  const [filteredTasks, setFilteredTasks] = useState(store.tasks);
  const hasTasks = useMemo(() => store.tasks.length > 0, [store.tasks]);

  useEffect(() => {
    setFilteredTasks(store.tasks);
  }, [store.tasks]);

  if (!store.isInitialized) {
    return <KanbiSkeleton />;
  }

  return (
    <>
      <KeyboardShortcuts />
      <Card className="w-full fast-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-center font-headline">
            KANBI
          </CardTitle>
          <CardDescription className="text-center max-w-2xl mx-auto text-sm sm:text-base px-4">
            From scattered thoughts to a structured plan. Paste your notes here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">
          <Tabs defaultValue="board" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto">
              <TabsTrigger value="board" className="text-xs sm:text-sm">
                Board
              </TabsTrigger>
              <TabsTrigger value="manage" className="text-xs sm:text-sm">
                Manage
              </TabsTrigger>
            </TabsList>

            <TabsContent value="board" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <TaskGenerator addTask={store.addTask} />
                  {!hasTasks && <QuickStartTemplates addTask={store.addTask} />}
                </div>
                <div className="lg:col-span-1">
                  <InsightsPanel tasks={store.tasks} />
                </div>
              </div>

              {hasTasks && (
                <>
                  <ProgressTracker tasks={store.tasks} />
                  <KanbanBoard store={store} />
                </>
              )}
            </TabsContent>

            <TabsContent value="manage" className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-semibold">Task Management</h3>
                <ExportImport tasks={store.tasks} setTasks={store.setTasks} />
              </div>
              <SearchFilter
                tasks={store.tasks}
                onFilteredTasks={setFilteredTasks}
              />
              <BulkOperations
                tasks={filteredTasks}
                updateTask={store.updateTask}
                deleteTask={store.deleteTask}
              />
            </TabsContent>
          </Tabs>

          {!hasTasks && (
            <div className="text-center py-16 border-2 border-dashed rounded-lg bg-background/50">
              <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                Your board is empty
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add text above to generate your first tasks
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
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
  );
}
