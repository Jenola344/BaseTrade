import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const portfolioData = [
  { asset: "BTC", amount: 0.5, value: 34061.73, pnl: 1234.56, allocation: 40 },
  { asset: "ETH", amount: 10, value: 34567.80, pnl: -543.21, allocation: 40 },
  { asset: "SOL", amount: 100, value: 16521.00, pnl: 2345.67, allocation: 20 },
]

const Portfolio = () => {
    const totalValue = portfolioData.reduce((acc, item) => acc + item.value, 0);
    const totalPnl = portfolioData.reduce((acc, item) => acc + item.pnl, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Overview</CardTitle>
        <CardDescription>Your current asset holdings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        <p className={`text-sm font-medium ${totalPnl >= 0 ? 'text-success' : 'text-destructive'}`}>
          {totalPnl >= 0 ? '+' : '-'}${Math.abs(totalPnl).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (24h)
        </p>
        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Allocation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioData.map((item) => (
                <TableRow key={item.asset}>
                  <TableCell>
                    <div className="font-medium">{item.asset}</div>
                    <div className="text-xs text-muted-foreground">{item.amount} / ${item.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  </TableCell>
                  <TableCell>
                      <div className="flex items-center gap-2">
                          <Progress value={item.allocation} className="h-2 w-full" />
                          <span className="text-muted-foreground text-xs w-8">{item.allocation}%</span>
                      </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Deposit / Withdraw</Button>
      </CardFooter>
    </Card>
  )
}

export default Portfolio
