'use client';

import { useState } from 'react';
import { provideInsightsAction } from '@/app/actions';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, CheckCircle, ListTodo } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

type InsightsPanelProps = {
  tasks: Task[];
};

type Insights = {
  insights: string[];
  suggestions: string[];
};

export default function InsightsPanel({ tasks }: InsightsPanelProps) {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetInsights = async () => {
    setIsLoading(true);
    setInsights(null);
    try {
      const insightTasks = tasks.map(t => ({
        id: t.id,
        title: t.title,
        status: t.status,
      }));

      const result = await provideInsightsAction({ tasks: insightTasks });
      setInsights(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Getting Insights',
        description: 'Could not connect to the AI service. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-primary" />
          AI Productivity Insights
        </CardTitle>
        <CardDescription>Analyze your board to get suggestions.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <Button onClick={handleGetInsights} disabled={isLoading || tasks.length === 0} className="w-full">
          {isLoading ? 'Analyzing...' : 'Generate Insights'}
        </Button>
        <div className="flex-grow mt-4">
          {isLoading && (
            <div className="space-y-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-1/3 mt-4" />
                <Skeleton className="h-4 w-full" />
            </div>
          )}
          {insights && (
            <div className="space-y-6 text-sm">
              {insights.insights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center"><ListTodo className="mr-2 h-4 w-4"/>Insights</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {insights.insights.map((insight, i) => <li key={`insight-${i}`}>{insight}</li>)}
                  </ul>
                </div>
              )}
              {insights.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center"><CheckCircle className="mr-2 h-4 w-4"/>Suggestions</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {insights.suggestions.map((suggestion, i) => <li key={`suggestion-${i}`}>{suggestion}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
          {!isLoading && !insights && (
              <div className="text-center text-muted-foreground text-sm pt-8">
                  Click the button to get AI-powered feedback on your tasks.
              </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
