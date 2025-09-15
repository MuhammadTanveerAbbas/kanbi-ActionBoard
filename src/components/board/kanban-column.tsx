'use client';

import React from 'react';
import { Task, TaskStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { FolderOpen } from 'lucide-react';

type KanbanColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  isDraggedOver: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

export default function KanbanColumn({ status, tasks, isDraggedOver, children, ...props }: KanbanColumnProps) {
  
  return (
    <div
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
      onDragLeave={props.onDragLeave}
      className={cn(
        "bg-secondary/30 rounded-lg p-4 transition-colors duration-300 h-full min-h-[200px]",
        isDraggedOver && 'bg-primary/20 ring-2 ring-primary'
      )}
    >
      <h3 className="font-semibold mb-4 flex items-center justify-between">
        <span>{status}</span>
        <span className="text-sm font-light bg-background/50 text-foreground rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </h3>
      <div className="space-y-4">
        {children}
        {tasks.length === 0 && !isDraggedOver && (
          <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center p-4">
            <FolderOpen className="h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">Drop tasks here</p>
          </div>
        )}
         {isDraggedOver && (
          <div className="flex flex-col items-center justify-center h-40 rounded-lg text-center p-4 bg-primary/30">
             <p className="text-sm font-semibold text-primary-foreground">Release to drop</p>
          </div>
        )}
      </div>
    </div>
  );
}
