'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Download, Upload, FileJson, FileSpreadsheet, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ExportImportProps = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

export default function ExportImport({ tasks, setTasks }: ExportImportProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const { toast } = useToast();

  const exportToJSON = () => {
    if (tasks.length === 0) {
      toast({
        title: 'No Tasks',
        description: 'Add tasks before exporting.',
        variant: 'destructive',
      });
      return;
    }

    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kanbi-tasks-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Export Successful',
      description: `${tasks.length} tasks exported to JSON.`,
    });
  };

  const exportToCSV = () => {
    if (tasks.length === 0) {
      toast({
        title: 'No Tasks',
        description: 'Add tasks before exporting.',
        variant: 'destructive',
      });
      return;
    }

    const headers = ['Title', 'Status', 'Owner', 'Deadline', 'Priority', 'Tags', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...tasks.map(task => [
        `"${task.title.replace(/"/g, '""')}"`,
        task.status,
        task.owner || '',
        task.deadline || '',
        task.priority || '',
        (task.tags || []).join(';'),
        task.createdAt || ''
      ].join(','))
    ].join('\n');

    const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kanbi-tasks-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export Successful',
      description: `${tasks.length} tasks exported to CSV.`,
    });
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      let importedTasks: Task[] = [];

      if (file.name.endsWith('.json')) {
        importedTasks = JSON.parse(text);
      } else if (file.name.endsWith('.csv')) {
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        importedTasks = lines.slice(1)
          .filter(line => line.trim())
          .map((line, index) => {
            const values = line.split(',').map(v => v.replace(/^"|"$/g, ''));
            return {
              id: `imported-${Date.now()}-${index}`,
              title: values[0] || `Imported Task ${index + 1}`,
              status: (values[1] as Task['status']) || 'To Do',
              owner: values[2] || undefined,
              deadline: values[3] || undefined,
              priority: (values[4] as Task['priority']) || undefined,
              tags: values[5] ? values[5].split(';') : undefined,
              estimatedHours: values[6] ? Number(values[6]) : undefined,
              createdAt: values[7] || new Date().toISOString(),
            };
          });
      }

      // Validate imported tasks
      const validTasks = importedTasks.filter(task => 
        task.title && 
        ['To Do', 'In Progress', 'Done'].includes(task.status)
      );

      if (validTasks.length > 0) {
        const duplicateCount = importedTasks.length - validTasks.length;
        setTasks([...tasks, ...validTasks]);
        toast({
          title: 'Import Successful',
          description: `${validTasks.length} tasks imported successfully.${duplicateCount > 0 ? ` ${duplicateCount} invalid tasks skipped.` : ''}`,
        });
      } else {
        toast({
          title: 'Import Failed',
          description: 'No valid tasks found in the file.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Import Failed',
        description: 'Error reading file. Please check the format.',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  const clearAllTasks = () => {
    setTasks([]);
    setShowClearDialog(false);
    toast({
      title: 'All Tasks Cleared',
      description: 'All tasks have been removed.',
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={exportToJSON}>
              <FileJson className="h-4 w-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportToCSV}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="relative">
          <Input
            type="file"
            accept=".json,.csv"
            onChange={handleFileImport}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isImporting}
          />
          <Button variant="outline" size="sm" disabled={isImporting}>
            <Upload className="h-4 w-4 mr-2" />
            {isImporting ? 'Importing...' : 'Import'}
          </Button>
        </div>

        {tasks.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowClearDialog(true)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Tasks?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all {tasks.length} tasks. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearAllTasks} className="bg-red-500 hover:bg-red-600">
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}