"use client";

import { useState } from "react";
import { provideInsightsAction } from "@/app/actions";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, CheckCircle, ListTodo } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

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
      const insightTasks = tasks.map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
      }));

      const result = await provideInsightsAction({ tasks: insightTasks });
      setInsights(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Getting Insights",
        description: "Could not connect to the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInsightIcon = (index: number) => {
    const icons = ['◆', '●', '■', '▲', '◇', '○', '□', '△'];
    return icons[index % icons.length];
  };

  const getSuggestionIcon = (index: number) => {
    const icons = ['▸', '▹', '▪', '▫', '▴', '▵', '▾', '▿'];
    return icons[index % icons.length];
  };

  return (
    <Card className="bg-secondary/50 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base">
          <Lightbulb className="mr-2 h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
        <CardDescription className="text-xs">Analyze your board.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <Button
          onClick={handleGetInsights}
          disabled={isLoading || tasks.length === 0}
          className="w-full"
          size="sm"
        >
          {isLoading ? "Analyzing..." : "Generate Insights"}
        </Button>
        <div className="flex-1 overflow-y-auto min-h-0">
          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-1/3 mt-3" />
              <Skeleton className="h-3 w-full" />
            </div>
          )}
          {insights && (
            <div className="space-y-4 text-xs">
              {insights.insights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center text-sm">
                    <ListTodo className="mr-2 h-4 w-4" />
                    Insights
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    {insights.insights.map((insight, i) => (
                      <li key={`insight-${i}`} className="flex items-start gap-2">
                        <span className="text-base flex-shrink-0 text-muted-foreground">{getInsightIcon(i)}</span>
                        <span className="break-words">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {insights.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Suggestions
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    {insights.suggestions.map((suggestion, i) => (
                      <li key={`suggestion-${i}`} className="flex items-start gap-2">
                        <span className="text-base flex-shrink-0 text-muted-foreground">{getSuggestionIcon(i)}</span>
                        <span className="break-words">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {!isLoading && !insights && (
            <div className="text-center text-muted-foreground text-xs py-4">
              Click the button to get AI powered feedback.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
