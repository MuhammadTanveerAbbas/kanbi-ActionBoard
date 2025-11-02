'use client';

import { useMemo } from 'react';
import { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, Clock, Target, Users, Zap } from 'lucide-react';

type SmartInsightsProps = {
  tasks: Task[];
};

export default function SmartInsights({ tasks }: SmartInsightsProps) {
  const insights = useMemo(() => {
    const now = new Date();
    const overdueTasks = tasks.filter(task => {
      if (!task.deadline || task.status === 'Done') return false;
      const deadline = new Date(task.deadline);
      return deadline < now;
    });

    const highPriorityTasks = tasks.filter(task => 
      task.priority === 'High' || task.priority === 'Critical'
    );

    const blockedTasks = tasks.filter(task => 
      task.dependencies?.some(depId => 
        tasks.find(t => t.id === depId)?.status !== 'Done'
      )
    );

    const completionRate = tasks.length > 0 
      ? (tasks.filter(t => t.status === 'Done').length / tasks.length) * 100 
      : 0;

    const avgCompletionTime = tasks
      .filter(t => t.completedAt && t.createdAt)
      .reduce((acc, task) => {
        const created = new Date(task.createdAt!);
        const completed = new Date(task.completedAt!);
        return acc + (completed.getTime() - created.getTime());
      }, 0) / tasks.filter(t => t.completedAt && t.createdAt).length;

    const totalEstimatedHours = tasks.reduce((acc, task) => acc + (task.estimatedHours || 0), 0);
    const completedHours = tasks
      .filter(t => t.status === 'Done')
      .reduce((acc, task) => acc + (task.estimatedHours || 0), 0);

    const topOwners = Object.entries(
      tasks.reduce((acc, task) => {
        if (task.owner) {
          acc[task.owner] = (acc[task.owner] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>)
    ).sort(([,a], [,b]) => b - a).slice(0, 3);

    return {
      overdueTasks,
      highPriorityTasks,
      blockedTasks,
      completionRate,
      avgCompletionTime: avgCompletionTime / (1000 * 60 * 60 * 24), // days
      totalEstimatedHours,
      completedHours,
      topOwners,
      recommendations: generateRecommendations(tasks, overdueTasks, blockedTasks, completionRate)
    };
  }, [tasks]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Smart Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 overflow-hidden">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{insights.completionRate.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{insights.avgCompletionTime.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg Days to Complete</div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Hours Progress</span>
                <span>{insights.completedHours}h / {insights.totalEstimatedHours}h</span>
              </div>
              <Progress value={(insights.completedHours / insights.totalEstimatedHours) * 100} />
            </div>
          </div>

          {/* Alerts */}
          {insights.overdueTasks.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm">
                {insights.overdueTasks.length} overdue task{insights.overdueTasks.length > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {insights.blockedTasks.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">
                {insights.blockedTasks.length} blocked task{insights.blockedTasks.length > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Top Contributors */}
          {insights.topOwners.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Top Contributors
              </h4>
              <div className="space-y-1">
                {insights.topOwners.map(([owner, count]) => (
                  <div key={owner} className="flex justify-between items-center">
                    <span className="text-sm">{owner}</span>
                    <Badge variant="secondary">{count} tasks</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Recommendations
            </h4>
            <div className="space-y-2">
              {insights.recommendations.map((rec, index) => (
                <div key={index} className="text-sm p-2 bg-muted rounded break-words">
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function generateRecommendations(tasks: Task[], overdueTasks: Task[], blockedTasks: Task[], completionRate: number): string[] {
  const recommendations: string[] = [];

  if (overdueTasks.length > 0) {
    recommendations.push(`Focus on ${overdueTasks.length} overdue tasks to get back on track.`);
  }

  if (blockedTasks.length > 0) {
    recommendations.push(`Resolve dependencies for ${blockedTasks.length} blocked tasks.`);
  }

  if (completionRate < 30) {
    recommendations.push('Consider breaking down large tasks into smaller, manageable pieces.');
  }

  const highPriorityInProgress = tasks.filter(t => 
    (t.priority === 'High' || t.priority === 'Critical') && t.status === 'In Progress'
  );
  
  if (highPriorityInProgress.length > 3) {
    recommendations.push('Too many high-priority tasks in progress. Focus on completing current ones first.');
  }

  const unassignedTasks = tasks.filter(t => !t.owner && t.status !== 'Done');
  if (unassignedTasks.length > 0) {
    recommendations.push(`Assign owners to ${unassignedTasks.length} unassigned tasks.`);
  }

  if (recommendations.length === 0) {
    recommendations.push('Great job! Your workflow looks well-organized.');
  }

  return recommendations;
}