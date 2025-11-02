'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';

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
  const [priority, setPriority] = useState(task.priority || '');
  const [estimatedHours, setEstimatedHours] = useState(task.estimatedHours?.toString() || '');
  const [description, setDescription] = useState(task.description || '');
  const [tags, setTags] = useState(task.tags || []);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle(task.title);
      setOwner(task.owner || '');
      setDeadline(task.deadline || '');
      setPriority(task.priority || '');
      setEstimatedHours(task.estimatedHours?.toString() || '');
      setDescription(task.description || '');
      setTags(task.tags || []);
      setNewTag('');
    }
  }, [isOpen, task]);

  const handleSave = () => {
    updateTask(task.id, {
      title,
      owner: owner || undefined,
      deadline: deadline || undefined,
      priority: priority as Task['priority'] || undefined,
      estimatedHours: estimatedHours ? Number(estimatedHours) : undefined,
      description: description || undefined,
      tags: tags.length > 0 ? tags : undefined,
    });
    setIsOpen(false);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="owner">Owner</Label>
              <Input id="owner" value={owner} onChange={e => setOwner(e.target.value)} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" value={deadline} onChange={e => setDeadline(e.target.value)} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                value={estimatedHours}
                onChange={e => setEstimatedHours(e.target.value)}
                placeholder="Hours"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                placeholder="Add tag"
                onKeyPress={e => e.key === 'Enter' && addTag()}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
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
