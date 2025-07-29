import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const greeksData = [
    { greek: 'Delta', value: 0.58 },
    { greek: 'Gamma', value: 0.02 },
    { greek: 'Theta', value: -12.34 },
    { greek: 'Vega', value: 45.67 },
];

const Analytics = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>For BTC-28JUN24-70000-C</CardDescription>
            </CardHeader>
            <CardContent>
                <h4 className="font-semibold mb-2">Options Greeks</h4>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Metric</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {greeksData.map((item) => (
                                <TableRow key={item.greek}>
                                    <TableCell className="font-medium">{item.greek}</TableCell>
                                    <TableCell className="text-right font-mono">{item.value.toFixed(4)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <h4 className="font-semibold mt-6 mb-2">Trading Volume (24h)</h4>
                <p className="text-2xl font-bold">1.2B USD</p>
                <p className="text-sm text-success">+5.2% from yesterday</p>
            </CardContent>
        </Card>
    )
}

export default Analytics;
