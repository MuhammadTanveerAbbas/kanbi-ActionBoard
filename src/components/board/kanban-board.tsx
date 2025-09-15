'use client';

import { KANBAN_COLUMNS } from '@/lib/types';
import KanbanColumn from './kanban-column';
import type { useTasksStore } from '@/hooks/use-tasks-store';
import { useState } from 'react';
import TaskCard from './task-card';

type KanbanBoardProps = {
  store: ReturnType<typeof useTasksStore>;
};

export default function KanbanBoard({ store }: KanbanBoardProps) {
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    store.setDraggingTaskId(taskId);
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragEnd = () => {
    store.setDraggingTaskId(null);
    setDraggedOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    setDraggedOverColumn(status);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: any) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      store.moveTask(taskId, status);
    }
    handleDragEnd();
  };
  
  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {KANBAN_COLUMNS.map(status => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={store.tasks.filter(t => t.status === status)}
          isDraggedOver={draggedOverColumn === status}
          onDragOver={(e) => handleDragOver(e, status)}
          onDrop={(e) => handleDrop(e, status)}
          onDragLeave={handleDragLeave}
        >
          {store.tasks
            .filter(t => t.status === status)
            .map(task => (
              <TaskCard
                key={task.id}
                task={task}
                updateTask={store.updateTask}
                deleteTask={store.deleteTask}
                isDragging={store.draggingTaskId === task.id}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
              />
            ))}
        </KanbanColumn>
      ))}
    </div>
  );
}
