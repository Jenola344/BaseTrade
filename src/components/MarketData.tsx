import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUp, ArrowDown } from "lucide-react"

const marketData = [
  { pair: "BTC/USD", price: 68123.45, change: 2.3, type: "Perpetual" },
  { pair: "ETH/USD", price: 3456.78, change: -1.2, type: "Perpetual" },
  { pair: "SOL/USD", price: 165.21, change: 5.1, type: "Perpetual" },
<<<<<<< HEAD
  { pair: "RNDR/USD", price: 10.55, change: 8.2, type: "Perpetual" },
  { pair: "ONDO/USD", price: 1.23, change: -3.4, type: "Perpetual" },
  { pair: "WIF/USD", price: 3.88, change: 12.7, type: "Perpetual" },
  { pair: "BTC-28JUN24-70000-C", price: 1234.56, change: 10.5, type: "Option" },
  { pair: "ETH-28JUN24-3500-C", price: 234.56, change: -5.2, type: "Option" },
  { pair: "SOL-28JUN24-170-C", price: 15.60, change: 25.0, type: "Option" },
  { pair: "sDEFI", price: 543.21, change: 3.8, type: "Synthetic" },
  { pair: "sL2", price: 1289.45, change: -1.9, type: "Synthetic" },
=======
  { pair: "BTC-28JUN24-70000-C", price: 1234.56, change: 10.5, type: "Option" },
  { pair: "ETH-28JUN24-3500-C", price: 234.56, change: -5.2, type: "Option" },
  { pair: "sDEFI", price: 543.21, change: 3.8, type: "Synthetic" },
>>>>>>> 58bbce7ff9155db472abd467950db2b3fa1b15f5
]

const MarketData = () => {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>Markets</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Pair</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right pr-4">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketData.map((item) => (
                <TableRow key={item.pair}>
                  <TableCell className="pl-4">
                    <div className="font-medium">{item.pair}</div>
                    <div className="text-xs text-muted-foreground">{item.type}</div>
                  </TableCell>
                  <TableCell className="text-right font-mono">${item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                  <TableCell className={`pr-4 text-right font-medium ${item.change > 0 ? 'text-success' : 'text-destructive'}`}>
                    <span className="inline-flex items-center">
                      {item.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {Math.abs(item.change).toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default MarketData
