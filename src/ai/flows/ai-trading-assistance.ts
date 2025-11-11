'use server';

/**
 * @fileOverview Provides AI-powered trading assistance to generate basic trading signals and insights.
 *
 * - aiTradingAssistance - A function that generates trading signals and insights.
 * - AiTradingAssistanceInput - The input type for the aiTradingAssistance function.
 * - AiTradingAssistanceOutput - The return type for the aiTradingAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getTokenPrice } from '../tools/getTokenPrice';

const AiTradingAssistanceInputSchema = z.object({
  asset: z.string().describe('The asset to analyze (e.g., BTC, ETH).'),
  timeframe: z.string().describe('The timeframe for analysis (e.g., 1h, 1d).'),
  strategy: z.string().describe('The trading strategy to use (e.g., trend following, mean reversion).'),
  riskTolerance: z.string().describe('The user specified risk tolerance (e.g., high, medium, low).'),
});
export type AiTradingAssistanceInput = z.infer<typeof AiTradingAssistanceInputSchema>;

const AiTradingAssistanceOutputSchema = z.object({
  signal: z.string().describe('A trading signal (e.g., buy, sell, hold).'),
  insight: z.string().describe('An insight into the asset based on the given parameters.'),
});
export type AiTradingAssistanceOutput = z.infer<typeof AiTradingAssistanceOutputSchema>;

export async function aiTradingAssistance(input: AiTradingAssistanceInput): Promise<AiTradingAssistanceOutput> {
  return aiTradingAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTradingAssistancePrompt',
  input: {schema: AiTradingAssistanceInputSchema},
  output: {schema: AiTradingAssistanceOutputSchema},
  tools: [getTokenPrice],
  prompt: `You are an AI-powered trading assistant. Generate a trading signal and insight based on the following information. Use the available tools to get real-time data if needed.

Asset: {{{asset}}}
Timeframe: {{{timeframe}}}
Strategy: {{{strategy}}}
Risk Tolerance: {{{riskTolerance}}}

Signal:`,
});

const aiTradingAssistanceFlow = ai.defineFlow(
  {
    name: 'aiTradingAssistanceFlow',
    inputSchema: AiTradingAssistanceInputSchema,
    outputSchema: AiTradingAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
