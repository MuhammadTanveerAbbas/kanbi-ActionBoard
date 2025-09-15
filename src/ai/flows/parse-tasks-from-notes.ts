'use server';
/**
 * @fileOverview This file defines a Genkit flow for parsing tasks from notes or meeting minutes.
 *
 * - parseTasksFromNotes - A function that takes notes as input and returns a list of tasks with owners and deadlines.
 * - ParseTasksFromNotesInput - The input type for the parseTasksFromNotes function.
 * - ParseTasksFromNotesOutput - The return type for the parseTasksFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseTasksFromNotesInputSchema = z.object({
  notes: z.string().describe('The notes or meeting minutes to parse for tasks.'),
});
export type ParseTasksFromNotesInput = z.infer<typeof ParseTasksFromNotesInputSchema>;

const ParseTasksFromNotesOutputSchema = z.array(
  z.object({
    task: z.string().describe('The task to be performed.'),
    owner: z.string().describe('The owner of the task.'),
    deadline: z.string().describe('The deadline for the task.'),
  })
).describe('A list of tasks extracted from the notes, including the task description, owner, and deadline.');
export type ParseTasksFromNotesOutput = z.infer<typeof ParseTasksFromNotesOutputSchema>;

export async function parseTasksFromNotes(
  input: ParseTasksFromNotesInput
): Promise<ParseTasksFromNotesOutput> {
  return parseTasksFromNotesFlow(input);
}

const parseTasksFromNotesPrompt = ai.definePrompt({
  name: 'parseTasksFromNotesPrompt',
  input: {schema: ParseTasksFromNotesInputSchema},
  output: {schema: ParseTasksFromNotesOutputSchema},
  prompt: `You are an AI assistant tasked with extracting tasks, owners, and deadlines from a block of notes or meeting minutes.

  Analyze the following notes:
  {{notes}}

  Identify potential tasks, who is responsible for them (owner), and when they are due (deadline).
  Return a JSON array of tasks, where each task has a 'task', 'owner', and 'deadline' field.
  If a task does not have an owner or deadline, populate those fields with 'Unassigned'.
  Tasks should be phrased as actionable items.
  Do not include any introductory or concluding remarks.
  Focus on clear action items and ignore conversational text.
  `,
});

const parseTasksFromNotesFlow = ai.defineFlow(
  {
    name: 'parseTasksFromNotesFlow',
    inputSchema: ParseTasksFromNotesInputSchema,
    outputSchema: ParseTasksFromNotesOutputSchema,
  },
  async input => {
    const {output} = await parseTasksFromNotesPrompt(input);
    return output!;
  }
);
