/**
 * @fileOverview A service for interacting with the Alchemy API.
 * 
 * - getTokenPrice - Fetches the price of a token from Alchemy.
 */

import fetch from 'node-fetch';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_URL = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// A simple map from token symbols to their contract addresses on Base Mainnet.
// Wrapped BTC (WBTC) and other assets might have different addresses on different chains.
const tokenAddressMap: Record<string, string> = {
    'BTC': '0x1ceA84203673764245E4e8342245374c65360345', // Wrapped BTC on Base
    'ETH': '0x4200000000000000000000000000000000000006', // Wrapped Ether on Base
    'SOL': '0x415d15A9fC1F64E0364C4895697334468648AC83', // Wrapped SOL on Base
    'RNDR': '0x9d4b97454539137517551048386a347b742ad4d0', // Render Token on Base
    'ONDO': '0xfAb00C9a12b3471415AA2538F97825506085188f', // Ondo on Base
    'WIF': '0xEa920B2433053738012CD704324f9ac1d3826fA1', // dogwifhat on Base
};


export async function getTokenPrice(tokenSymbol: string): Promise<number> {
    if (!ALCHEMY_API_KEY || ALCHEMY_API_KEY === 'your_alchemy_api_key_here') {
        console.warn('Alchemy API key is not configured. Returning a mock price.');
        // Return a random-ish mock price if API key is not set
        return Math.random() * 50000 + 10000;
    }

    const contractAddress = tokenAddressMap[tokenSymbol.toUpperCase()];

    if (!contractAddress) {
        throw new Error(`Token symbol '${tokenSymbol}' is not supported.`);
    }

    try {
        const response = await fetch(ALCHEMY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'alchemy_getTokenPrice',
                params: [contractAddress],
                id: 1,
            }),
        });

        const data: any = await response.json();

        if (data.error) {
            throw new Error(`Alchemy API Error: ${data.error.message}`);
        }

        return data.result.usdPrice;
    } catch (error) {
        console.error('Failed to fetch token price from Alchemy:', error);
        throw new Error('Could not fetch token price.');
    }
}
