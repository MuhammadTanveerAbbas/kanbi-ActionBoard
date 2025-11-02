'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, User, Calendar, Trash2, Edit, Clock, Flag, Link } from 'lucide-react';
import EditTaskDialog from './edit-task-dialog';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type TaskCardProps = {
  task: Task;
  updateTask: (taskId: string, updatedProperties: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
};

export default function TaskCard({ task, updateTask, deleteTask, isDragging, onDragStart, onDragEnd }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={cn(
          "cursor-grab active:cursor-grabbing transition-shadow",
          isDragging ? 'opacity-50 ring-2 ring-primary' : 'hover:shadow-lg'
        )}
      >
        <CardHeader className="p-4 flex-row items-start justify-between">
          <CardTitle className="text-base font-medium leading-tight break-words pr-2">{task.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-500 focus:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        {(task.owner || task.deadline || task.priority || task.tags || task.dependencies) && (
          <CardFooter className="p-4 pt-0 space-y-2">
            {/* Priority and Tags */}
            <div className="flex flex-wrap gap-1">
              {task.priority && (
                <Badge className={`text-xs ${
                  task.priority === 'Critical' ? 'bg-red-500' :
                  task.priority === 'High' ? 'bg-orange-500' :
                  task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                } text-white`}>
                  <Flag className="h-2 w-2 mr-1" />
                  {task.priority}
                </Badge>
              )}
              {task.tags?.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {task.tags && task.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{task.tags.length - 2}
                </Badge>
              )}
            </div>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-2">
              {task.owner && (
                <Badge variant="secondary" className="font-normal">
                  <User className="mr-1 h-3 w-3" />
                  {task.owner}
                </Badge>
              )}
              {task.deadline && (
                <Badge variant="outline" className="font-normal">
                  <Calendar className="mr-1 h-3 w-3" />
                  {task.deadline}
                </Badge>
              )}

              {task.dependencies && task.dependencies.length > 0 && (
                <Badge variant="outline" className="font-normal">
                  <Link className="mr-1 h-3 w-3" />
                  {task.dependencies.length}
                </Badge>
              )}
            </div>
          </CardFooter>
        )}
      </Card>

      <EditTaskDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        task={task}
        updateTask={updateTask}
      />
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task: <br/>
              <strong>{task.title}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTask(task.id)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
