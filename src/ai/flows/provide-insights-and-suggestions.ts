'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-driven insights and suggestions
 * based on user task management behavior to improve productivity and task completion rate.
 *
 * - provideInsightsAndSuggestions - A function that processes task data and provides insights and suggestions.
 * - InsightsAndSuggestionsInput - The input type for the provideInsightsAndSuggestions function.
 * - InsightsAndSuggestionsOutput - The return type for the provideInsightsAndSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InsightsAndSuggestionsInputSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      status: z.enum(['To Do', 'In Progress', 'Done']),
      createdAt: z.string().optional(),
      completedAt: z.string().optional(),
    })
  ).describe('An array of tasks with their details such as ID, title, status, and creation/completion timestamps.'),
});
export type InsightsAndSuggestionsInput = z.infer<typeof InsightsAndSuggestionsInputSchema>;

const InsightsAndSuggestionsOutputSchema = z.object({
  insights: z.array(
    z.string().describe('An insight derived from the task data.')
  ).describe('A list of insights based on user task management behavior.'),
  suggestions: z.array(
    z.string().describe('A suggestion to improve productivity or task completion rate.')
  ).describe('A list of suggestions to improve productivity based on task data.'),
});
export type InsightsAndSuggestionsOutput = z.infer<typeof InsightsAndSuggestionsOutputSchema>;

export async function provideInsightsAndSuggestions(
  input: InsightsAndSuggestionsInput
): Promise<InsightsAndSuggestionsOutput> {
  return provideInsightsAndSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideInsightsAndSuggestionsPrompt',
  input: {schema: InsightsAndSuggestionsInputSchema},
  output: {schema: InsightsAndSuggestionsOutputSchema},
  prompt: `You are a world-class productivity coach. Your goal is to analyze a user's task list and provide sharp, actionable insights and suggestions to boost their efficiency.

  Analyze the following tasks data:
  {{#each tasks}}
    - Task: "{{title}}", Status: {{status}}{{#if createdAt}}, Created: {{createdAt}}{{/if}}{{#if completedAt}}, Completed: {{completedAt}}{{/if}}
  {{/each}}

  Based on this data, generate:
  1.  **Insights:** Identify 1-2 key patterns in the user's behavior. Are tasks getting stuck in one column? Are certain types of tasks completed faster? Be specific.
  2.  **Suggestions:** Provide 1-2 concrete, actionable recommendations. If tasks are too large, suggest breaking them down. If many tasks are 'In Progress', suggest focusing on one at a time.

  Keep your advice friendly, encouraging, and highly practical. The user should feel empowered, not criticized.`,
});

const provideInsightsAndSuggestionsFlow = ai.defineFlow(
  {
    name: 'provideInsightsAndSuggestionsFlow',
    inputSchema: InsightsAndSuggestionsInputSchema,
    outputSchema: InsightsAndSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
