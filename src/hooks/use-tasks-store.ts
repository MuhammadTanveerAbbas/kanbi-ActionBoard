'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus } from '@/lib/types';

// Sample data for initial state
const sampleTasks: Task[] = [
  { id: 'task-1', title: 'Deploy backend hotfix', status: 'Done', owner: 'Alice', deadline: '2024-05-20', createdAt: '2024-05-19T10:00:00Z', completedAt: '2024-05-19T14:30:00Z' },
  { id: 'task-2', title: 'Review new landing page design', status: 'In Progress', owner: 'Bob', deadline: 'Tomorrow', createdAt: '2024-05-20T11:00:00Z' },
  { id: 'task-3', title: 'Draft Q3 marketing report', status: 'To Do', owner: 'Alice', deadline: 'Next week', createdAt: '2024-05-21T09:00:00Z' },
  { id: 'task-4', title: 'Finalize user survey questions', status: 'To Do', owner: 'Charlie', deadline: '2024-05-24', createdAt: '2024-05-21T12:00:00Z' },
  { id: 'task-5', title: 'Onboard new marketing intern', status: 'To Do', owner: 'David', deadline: 'End of May', createdAt: '2024-05-22T16:00:00Z' },
];

export function useTasksStore() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('kanbi-tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage', error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('kanbi-tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to localStorage', error);
      }
    }
  }, [tasks, isInitialized]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}-${Math.random()}`,
      status: 'To Do',
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((taskId: string, updatedProperties: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, ...updatedProperties };
          
          const wasDone = task.status === 'Done';
          const isNowDone = updatedTask.status === 'Done';

          if ('status' in updatedProperties) { // Only update timestamps if status is changing
            if (isNowDone && !wasDone) {
              updatedTask.completedAt = new Date().toISOString();
            } else if (!isNowDone && wasDone) {
              delete updatedTask.completedAt;
            }
          }
          
          return updatedTask;
        }
        return task;
      })
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const moveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus });
  }, [updateTask]);
  
  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    isInitialized,
    draggingTaskId,
    setDraggingTaskId,
  };
}
