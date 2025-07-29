"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { aiTradingAssistance, AiTradingAssistanceOutput } from '@/ai/flows/ai-trading-assistance'

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Zap } from "lucide-react"

const formSchema = z.object({
  asset: z.string().min(1, 'Asset is required'),
  timeframe: z.string().min(1, 'Timeframe is required'),
  strategy: z.string().min(1, 'Strategy is required'),
  riskTolerance: z.string().min(1, 'Risk tolerance is required'),
})

const AiAssistant = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<AiTradingAssistanceOutput | null>(null)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            asset: 'BTC',
            timeframe: '1d',
            strategy: 'trend-following',
            riskTolerance: 'medium'
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setResult(null)
        try {
            const output = await aiTradingAssistance(values)
            setResult(output)
        } catch (error) {
            console.error(error)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to get AI assistance. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> AI Trading Assistance</CardTitle>
                <CardDescription>Get AI-powered trading signals and insights.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="asset"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Asset</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select asset" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                                            <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                                            <SelectItem value="SOL">Solana (SOL)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="timeframe"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Timeframe</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select timeframe" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1h">1 Hour</SelectItem>
                                            <SelectItem value="4h">4 Hours</SelectItem>
                                            <SelectItem value="1d">1 Day</SelectItem>
                                            <SelectItem value="1w">1 Week</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="strategy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Strategy</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select strategy" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="trend-following">Trend Following</SelectItem>
                                            <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
                                            <SelectItem value="breakout">Breakout</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="riskTolerance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Risk Tolerance</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select risk tolerance" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                            Get Insight
                        </Button>
                    </form>
                </Form>
                {result && (
                    <div className="mt-6 rounded-lg border bg-card/50 p-4">
                        <h4 className="font-semibold text-card-foreground">AI Result:</h4>
                        <p className="mt-2 text-sm text-card-foreground"><span className="font-semibold">Signal:</span> {result.signal}</p>
                        <p className="mt-1 text-sm text-muted-foreground"><span className="font-semibold text-card-foreground">Insight:</span> {result.insight}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AiAssistant
