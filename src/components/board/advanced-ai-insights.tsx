"use client";

import { useMemo } from "react";
import { Task } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

type AdvancedAIInsightsProps = {
  tasks: Task[];
};

export default function AdvancedAIInsights({ tasks }: AdvancedAIInsightsProps) {
  const insights = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return {
        completionRate: 0,
        velocity: 0,
        estimatedCompletion: 0,
        aiRecommendations: [
          {
            type: "info",
            icon: <Sparkles className="h-4 w-4" />,
            message:
              "Start adding tasks to see AI powered insights and predictions.",
            impact: "Info",
          },
        ],
        bottlenecks: 0,
        overloadedOwners: 0,
      };
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "Done").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status === "In Progress"
    ).length;

    // AI-powered predictions
    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const oldestTask = tasks.reduce((oldest, task) => {
      if (!task.createdAt) return oldest;
      const taskDate = new Date(task.createdAt);
      return !oldest || taskDate < oldest ? taskDate : oldest;
    }, null as Date | null);

    const daysSinceStart = oldestTask
      ? Math.max(
          1,
          Math.ceil((Date.now() - oldestTask.getTime()) / (1000 * 60 * 60 * 24))
        )
      : 1;

    const velocity = completedTasks / daysSinceStart;

    const estimatedCompletion =
      inProgressTasks > 0 && velocity > 0
        ? Math.ceil(inProgressTasks / velocity)
        : 0;

    // Bottleneck detection
    const bottlenecks = tasks.filter(
      (t) =>
        t.status === "In Progress" &&
        t.dependencies &&
        t.dependencies.length > 0
    );

    // Workload distribution
    const ownerWorkload = tasks.reduce((acc, task) => {
      if (task.owner && task.status !== "Done") {
        acc[task.owner] = (acc[task.owner] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const overloadedOwners = Object.entries(ownerWorkload)
      .filter(([, count]) => count > 5)
      .map(([owner]) => owner);

    // Priority analysis
    const highPriorityPending = tasks.filter(
      (t) =>
        (t.priority === "High" || t.priority === "Critical") &&
        t.status === "To Do"
    ).length;

    // Smart recommendations
    const aiRecommendations = [];

    if (completionRate < 30) {
      aiRecommendations.push({
        type: "warning",
        icon: <AlertCircle className="h-4 w-4" />,
        message:
          "Low completion rate detected. Consider breaking tasks into smaller chunks.",
        impact: "High",
      });
    }

    if (totalTasks > 0 && velocity >= 0) {
      aiRecommendations.push({
        type: "info",
        icon: <TrendingUp className="h-4 w-4" />,
        message: `Current velocity: ${velocity.toFixed(1)} tasks/day. ${
          velocity < 1
            ? "Focus on completing in-progress tasks."
            : "Great pace!"
        }`,
        impact: "Medium",
      });
    }

    if (bottlenecks.length > 0) {
      aiRecommendations.push({
        type: "warning",
        icon: <Target className="h-4 w-4" />,
        message: `${bottlenecks.length} tasks blocked by dependencies. Prioritize unblocking them.`,
        impact: "High",
      });
    }

    if (overloadedOwners.length > 0) {
      aiRecommendations.push({
        type: "warning",
        icon: <Zap className="h-4 w-4" />,
        message: `${overloadedOwners.join(
          ", "
        )} may be overloaded. Consider redistributing tasks.`,
        impact: "Medium",
      });
    }

    if (highPriorityPending > 0) {
      aiRecommendations.push({
        type: "critical",
        icon: <AlertCircle className="h-4 w-4" />,
        message: `${highPriorityPending} high-priority tasks pending. Address these first.`,
        impact: "Critical",
      });
    }

    if (aiRecommendations.length === 0) {
      aiRecommendations.push({
        type: "success",
        icon: <Sparkles className="h-4 w-4" />,
        message:
          "Excellent workflow! Your team is operating at peak efficiency.",
        impact: "Positive",
      });
    }

    return {
      completionRate,
      velocity,
      estimatedCompletion,
      aiRecommendations,
      bottlenecks: bottlenecks.length,
      overloadedOwners: overloadedOwners.length,
    };
  }, [tasks]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      case "Positive":
        return "bg-green-500";
      case "Info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 overflow-hidden">
        {/* Velocity Metrics */}
        {tasks.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Team Velocity</span>
              <span className="text-muted-foreground">
                {insights.velocity.toFixed(1)} tasks/day
              </span>
            </div>
            <Progress value={Math.min(insights.velocity * 20, 100)} />

            {insights.estimatedCompletion > 0 && (
              <p className="text-xs text-muted-foreground">
                Estimated completion: {insights.estimatedCompletion} days
              </p>
            )}
          </div>
        )}

        {/* AI Recommendations */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Smart Recommendations
          </h4>
          {insights.aiRecommendations.map((rec, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex-shrink-0 mt-0.5">{rec.icon}</div>
              <div className="flex-1 space-y-1 min-w-0">
                <p className="text-sm break-words">{rec.message}</p>
                <Badge
                  className={`${getImpactColor(rec.impact)} text-white text-xs`}
                  variant="secondary"
                >
                  {rec.impact} Impact
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {insights.bottlenecks}
            </div>
            <div className="text-xs text-muted-foreground">Bottlenecks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {insights.overloadedOwners}
            </div>
            <div className="text-xs text-muted-foreground">Overloaded</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
