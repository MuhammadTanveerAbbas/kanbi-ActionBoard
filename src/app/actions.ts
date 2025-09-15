'use server';

import { generateTasksFromText, GenerateTasksFromTextInput } from '@/ai/flows/generate-tasks-from-text';
import { provideInsightsAndSuggestions, InsightsAndSuggestionsInput } from '@/ai/flows/provide-insights-and-suggestions';

export async function generateTasksAction(input: GenerateTasksFromTextInput) {
  return await generateTasksFromText(input);
}

export async function provideInsightsAction(input: InsightsAndSuggestionsInput) {
  return await provideInsightsAndSuggestions(input);
}
