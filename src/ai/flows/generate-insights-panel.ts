'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating insights based on user task data.
 *
 * - generateInsightsPanel - A function that processes task data and provides insights on workflow improvement.
 * - GenerateInsightsPanelInput - The input type for the generateInsightsPanel function.
 * - GenerateInsightsPanelOutput - The return type for the generateInsightsPanel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightsPanelInputSchema = z.object({
  tasks: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        status: z.enum(['To Do', 'In Progress', 'Done']),
        createdAt: z.string().optional(),
        completedAt: z.string().optional(),
      })
    )
    .describe(
      'An array of tasks with their details such as ID, title, status, and creation/completion timestamps.'
    ),
});
export type GenerateInsightsPanelInput = z.infer<typeof GenerateInsightsPanelInputSchema>;

const GenerateInsightsPanelOutputSchema = z.object({
  insights: z
    .array(
      z.string().describe('An insight derived from the task data.')
    )
    .describe('A list of insights based on user task management behavior.'),
});
export type GenerateInsightsPanelOutput = z.infer<typeof GenerateInsightsPanelOutputSchema>;

export async function generateInsightsPanel(
  input: GenerateInsightsPanelInput
): Promise<GenerateInsightsPanelOutput> {
  return generateInsightsPanelFlow(input);
}

const generateInsightsPanelPrompt = ai.definePrompt({
  name: 'generateInsightsPanelPrompt',
  input: {schema: GenerateInsightsPanelInputSchema},
  output: {schema: GenerateInsightsPanelOutputSchema},
  prompt: `You are an AI assistant analyzing task completion history to provide workflow improvement insights.

Analyze the following tasks data:
{{#each tasks}}
  - Task ID: {{id}}, Title: {{title}}, Status: {{status}}{{#if createdAt}}, Created At: {{createdAt}}{{/if}}{{#if completedAt}}, Completed At: {{completedAt}}{{/if}}
{{/each}}

Based on this data, identify patterns or trends in the user's task management behavior and provide insights on how to improve their workflow. For example, if design tasks are frequently completed late, suggest shorter timelines for design tasks.
Give specific and practical advice.
Make your response friendly and helpful.
`,
});

const generateInsightsPanelFlow = ai.defineFlow(
  {
    name: 'generateInsightsPanelFlow',
    inputSchema: GenerateInsightsPanelInputSchema,
    outputSchema: GenerateInsightsPanelOutputSchema,
  },
  async input => {
    const {output} = await generateInsightsPanelPrompt(input);
    return output!;
  }
);
