'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type EditTaskDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  task: Task;
  updateTask: (taskId: string, updatedProperties: Partial<Task>) => void;
};

export default function EditTaskDialog({ isOpen, setIsOpen, task, updateTask }: EditTaskDialogProps) {
  const [title, setTitle] = useState(task.title);
  const [owner, setOwner] = useState(task.owner || '');
  const [deadline, setDeadline] = useState(task.deadline || '');

  useEffect(() => {
    if (isOpen) {
      setTitle(task.title);
      setOwner(task.owner || '');
      setDeadline(task.deadline || '');
    }
  }, [isOpen, task]);

  const handleSave = () => {
    updateTask(task.id, { title, owner, deadline });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">
              Title
            </Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="owner">
              Owner
            </Label>
            <Input id="owner" value={owner} onChange={e => setOwner(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deadline">
              Deadline
            </Label>
            <Input id="deadline" value={deadline} onChange={e => setDeadline(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
