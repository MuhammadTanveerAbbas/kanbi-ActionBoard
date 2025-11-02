'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

type SearchFilterProps = {
  tasks: Task[];
  onFilteredTasks: (tasks: Task[]) => void;
};

export default function SearchFilter({ tasks, onFilteredTasks }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  const allOwners = Array.from(new Set(tasks.map(t => t.owner).filter(Boolean)));
  const allTags = Array.from(new Set(tasks.flatMap(t => t.tags || [])));
  const allPriorities = Array.from(new Set(tasks.map(t => t.priority).filter(Boolean)));

  const applyFilters = () => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.owner?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    if (ownerFilter !== 'all') {
      filtered = filtered.filter(task => task.owner === ownerFilter);
    }

    if (tagFilter !== 'all') {
      filtered = filtered.filter(task => task.tags?.includes(tagFilter));
    }

    onFilteredTasks(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setOwnerFilter('all');
    setTagFilter('all');
    onFilteredTasks(tasks);
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || ownerFilter !== 'all' || tagFilter !== 'all';

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={applyFilters}>Filter</Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            {allPriorities.map(priority => (
              <SelectItem key={priority} value={priority}>{priority}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={ownerFilter} onValueChange={setOwnerFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Owners</SelectItem>
            {allOwners.map(owner => (
              <SelectItem key={owner} value={owner!}>{owner}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1">
          {searchTerm && (
            <Badge variant="secondary">
              Search: {searchTerm}
            </Badge>
          )}
          {statusFilter !== 'all' && (
            <Badge variant="secondary">
              Status: {statusFilter}
            </Badge>
          )}
          {priorityFilter !== 'all' && (
            <Badge variant="secondary">
              Priority: {priorityFilter}
            </Badge>
          )}
          {ownerFilter !== 'all' && (
            <Badge variant="secondary">
              Owner: {ownerFilter}
            </Badge>
          )}
          {tagFilter !== 'all' && (
            <Badge variant="secondary">
              Tag: {tagFilter}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}