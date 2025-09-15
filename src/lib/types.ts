export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  owner?: string;
  deadline?: string;
  createdAt?: string;
  completedAt?: string;
};

export const KANBAN_COLUMNS: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
