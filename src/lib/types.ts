export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  owner?: string;
  deadline?: string;
  createdAt?: string;
  completedAt?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  tags?: string[];
  dependencies?: string[];
  estimatedHours?: number;
  description?: string;
};

export const KANBAN_COLUMNS: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
