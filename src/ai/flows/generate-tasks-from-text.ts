'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating tasks from a block of text.
 *
 * - generateTasksFromText - A function that takes a text input and returns a list of tasks.
 * - GenerateTasksFromTextInput - The input type for the generateTasksFromText function.
 * - GenerateTasksFromTextOutput - The return type for the generateTasksFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTasksFromTextInputSchema = z.object({
  text: z.string().describe('The text to parse for tasks.'),
});
export type GenerateTasksFromTextInput = z.infer<typeof GenerateTasksFromTextInputSchema>;

const GenerateTasksFromTextOutputSchema = z.array(
  z.object({
    task: z.string().describe('The task to be performed.'),
    owner: z.string().describe('The owner of the task.'),
    deadline: z.string().describe('The deadline for the task.'),
  })
);
export type GenerateTasksFromTextOutput = z.infer<typeof GenerateTasksFromTextOutputSchema>;

export async function generateTasksFromText(
  input: GenerateTasksFromTextInput
): Promise<GenerateTasksFromTextOutput> {
  return generateTasksFromTextFlow(input);
}

const generateTasksFromTextPrompt = ai.definePrompt({
  name: 'generateTasksFromTextPrompt',
  input: {schema: GenerateTasksFromTextInputSchema},
  output: {schema: GenerateTasksFromTextOutputSchema},
  prompt: `You are a task parsing AI. Your goal is to accurately extract tasks, owners, and deadlines from unstructured text.

You will receive a block of text, and you will parse it to identify actionable items.

- For each distinct task, create a JSON object.
- The 'task' field should be a concise, clear action item.
- The 'owner' field should identify who is responsible. If no one is mentioned, use 'Unassigned'.
- The 'deadline' field should capture any due date or timeline. If not specified, use 'Not specified'.

Return a JSON array of these task objects. Do not include any conversational text or explanations in your output.

Text: {{{text}}}`,
});

const generateTasksFromTextFlow = ai.defineFlow(
  {
    name: 'generateTasksFromTextFlow',
    inputSchema: GenerateTasksFromTextInputSchema,
    outputSchema: GenerateTasksFromTextOutputSchema,
  },
  async input => {
    const {output} = await generateTasksFromTextPrompt(input);
    return output!;
  }
);
