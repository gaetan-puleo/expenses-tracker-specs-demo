import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/front-end/components/ui/card"

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expense Analytics</h1>
        <p className="text-muted-foreground">View your spending patterns and insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
            <CardDescription>Total expenses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847.52</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Utilization</CardTitle>
            <CardDescription>Percentage of monthly budget used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81.4%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Category</CardTitle>
            <CardDescription>Highest spending category this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Food & Dining</div>
            <p className="text-xs text-muted-foreground">$854.32 (30% of total)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Transaction</CardTitle>
            <CardDescription>Average expense amount per transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42.18</div>
            <p className="text-xs text-muted-foreground">-$3.25 from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}