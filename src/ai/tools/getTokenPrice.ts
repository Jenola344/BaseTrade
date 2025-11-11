'use server';
/**
 * @fileOverview A tool to fetch the current price of a given token.
 * 
 * - getTokenPrice - The tool definition.
 */
import { ai } from '@/ai/genkit';
import { getTokenPrice as getAlchemyTokenPrice } from '@/services/alchemy';
import { z } from 'genkit';

export const getTokenPrice = ai.defineTool(
    {
        name: 'getTokenPrice',
        description: 'Returns the current market price of a given crypto token.',
        inputSchema: z.object({
            tokenSymbol: z.string().describe('The ticker symbol of the token (e.g., BTC, ETH, SOL).'),
        }),
        outputSchema: z.object({
            price: z.number().describe('The current price of the token in USD.'),
        }),
    },
    async (input) => {
        const price = await getAlchemyTokenPrice(input.tokenSymbol);
        return { price };
    }
);
