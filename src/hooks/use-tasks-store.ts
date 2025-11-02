'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus } from '@/lib/types';



export function useTasksStore() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem('kanbi-tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from localStorage', error);
      }
      setIsInitialized(true);
    };
    
    // Use requestIdleCallback for non-blocking initialization
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadTasks);
    } else {
      setTimeout(loadTasks, 0);
    }
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
