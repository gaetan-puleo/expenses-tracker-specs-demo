import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/front-end/components/ui/card"
import { Button } from "@/front-end/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/front-end/components/ui/table"
import { CreditCard, TrendingDown, PiggyBank, Calendar, Trash2, Edit } from "lucide-react"
import { listExpenses } from "../../features/expenses/listExpenses/listExpenses.usecase"
import { selectExpensesList, selectListExpensesStatus, selectListExpensesError } from "../../features/expenses/listExpenses/listExpenses.selector"
import { deleteExpense } from "../../features/expenses/deleteExpense/deleteExpense.usecase"
import { selectIsDeleting, selectDeletingExpenseId } from "../../features/expenses/deleteExpense/deleteExpense.selector"
import { setEditMode, openExpenseModal } from "../../features/expenses/expenseForm/expenseForm.events"
import { Expense } from "../../features/shared/entities/expense.entity"
import { AppDispatch } from "../../store/init-store"
import { FloatingAddButton } from "../components/FloatingAddButton"

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const expenses = useSelector(selectExpensesList)
  const status = useSelector(selectListExpensesStatus)
  const error = useSelector(selectListExpensesError)
  const isDeleting = useSelector(selectIsDeleting)
  const deletingExpenseId = useSelector(selectDeletingExpenseId)

  useEffect(() => {
    dispatch(listExpenses())
  }, [dispatch])

  const handleDeleteExpense = async (expenseId: string) => {
    await dispatch(deleteExpense(expenseId))
    dispatch(listExpenses())
  }

  const handleEditExpense = (expense: Expense) => {
    dispatch(setEditMode(expense))
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const stats = [
    {
      title: "Total Expenses",
      value: `$${totalAmount.toFixed(2)}`,
      description: `${expenses.length} transactions`,
      icon: CreditCard,
    },
    {
      title: "Monthly Budget",
      value: "$3,500.00",
      description: `$${(3500 - totalAmount).toFixed(2)} remaining`,
      icon: PiggyBank,
    },
    {
      title: "Average Expense",
      value: expenses.length > 0 ? `$${(totalAmount / expenses.length).toFixed(2)}` : "$0.00",
      description: "Per transaction",
      icon: TrendingDown,
    },
    {
      title: "Categories",
      value: new Set(expenses.map(e => e.category)).size.toString(),
      description: "Expense categories",
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* All Expenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
            <CardDescription>
              Complete list of your expense transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'loading' && (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">Loading expenses...</p>
              </div>
            )}
            {status === 'failed' && (
              <div className="text-center py-8">
                <p className="text-sm text-red-600">Error: {error}</p>
              </div>
            )}
            {status === 'success' && (
              <div className="rounded-md border">
                {expenses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      No expenses found
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses.map((expense) => {
                        const isExpenseDeleting = isDeleting && deletingExpenseId === expense.id
                        return (
                          <TableRow key={expense.id}>
                            <TableCell className="font-medium">
                              {expense.description}
                            </TableCell>
                            <TableCell>
                              ${expense.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              {expense.category}
                            </TableCell>
                            <TableCell>
                              {new Date(expense.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditExpense(expense)}
                                  disabled={isExpenseDeleting}
                                  className="hover:bg-blue-50 cursor-pointer"
                                >
                                  <Edit className="h-4 w-4 text-slate-700 group-hover:text-blue-700" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteExpense(expense.id)}
                                  disabled={isExpenseDeleting}
                                  className="hover:bg-red-50 group cursor-pointer"
                                >
                                  {isExpenseDeleting ? (
                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4 text-slate-700 group-hover:text-red-900" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <FloatingAddButton onClick={() => dispatch(openExpenseModal())} />
    </div>
  )
}