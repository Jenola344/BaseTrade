"use client"
import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const OrderForm = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <Tabs defaultValue="perpetual">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perpetual">Perpetuals</TabsTrigger>
            <TabsTrigger value="option">Options</TabsTrigger>
            <TabsTrigger value="synthetic">Synthetics</TabsTrigger>
          </TabsList>
          <TabsContent value="perpetual">
            <TradeForm type="Perpetual" />
          </TabsContent>
          <TabsContent value="option">
            <TradeForm type="Option" />
          </TabsContent>
          <TabsContent value="synthetic">
            <TradeForm type="Synthetic" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const TradeForm = ({ type }: { type: string }) => {
    return (
        <Tabs defaultValue="buy" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy / Long</TabsTrigger>
                <TabsTrigger value="sell">Sell / Short</TabsTrigger>
            </TabsList>
            <TabsContent value="buy" className="pt-4">
                <div className="space-y-4">
                    <OrderFields />
                    <Button className="w-full bg-success text-success-foreground hover:bg-success/90">Buy {type}</Button>
                </div>
            </TabsContent>
            <TabsContent value="sell" className="pt-4">
                <div className="space-y-4">
                    <OrderFields />
                    <Button className="w-full" variant="destructive">Sell {type}</Button>
                </div>
            </TabsContent>
        </Tabs>
    );
};


const OrderFields = () => {
    const [leverage, setLeverage] = React.useState([10]);
    return (
        <>
            <div className="space-y-2">
                <Label>Order Type</Label>
                <Select defaultValue="limit">
                    <SelectTrigger>
                        <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="limit">Limit</SelectItem>
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="stop">Stop Loss</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" placeholder="Market" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="0.00" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Leverage</Label>
                    <span className="text-sm font-medium">{leverage[0]}x</span>
                </div>
                <Slider defaultValue={leverage} onValueChange={setLeverage} max={100} step={1} />
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between"><span>Collateral</span><span>1,234.56 USD</span></div>
                <div className="flex justify-between"><span>Fee</span><span>~2.50 USD</span></div>
            </div>
        </>
    )
}


export default OrderForm
