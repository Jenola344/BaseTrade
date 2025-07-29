"use client"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

const chartData = [
  { time: '10:00', price: 68100 }, { time: '10:05', price: 68150 },
  { time: '10:10', price: 68120 }, { time: '10:15', price: 68200 },
  { time: '10:20', price: 68250 }, { time: '10:25', price: 68230 },
  { time: '10:30', price: 68300 }, { time: '10:35', price: 68280 },
  { time: '10:40', price: 68350 }, { time: '10:45', price: 68400 },
  { time: '10:50', price: 68380 }, { time: '10:55', price: 68420 },
  { time: '11:00', price: 68450 }, { time: '11:05', price: 68480 },
  { time: '11:10', price: 68500 }, { time: '11:15', price: 68470 },
];

const chartConfig = {
    price: {
      label: "Price (USD)",
      color: "hsl(var(--primary))",
    },
};

const TradingChart = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>BTC/USD</CardTitle>
                <CardDescription>Bitcoin Price Chart</CardDescription>
            </div>
            <div className="text-right">
                <div className="text-2xl font-bold">$68,470.00</div>
                <div className="text-sm text-success">+2.3%</div>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMin - 100', 'dataMax + 100']} tickFormatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <RechartsTooltip 
                      cursor={{stroke: 'hsl(var(--accent))', strokeWidth: 1, strokeDasharray: '3 3'}}
                      content={<ChartTooltipContent indicator="dot" />} 
                    />
                    <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TradingChart
