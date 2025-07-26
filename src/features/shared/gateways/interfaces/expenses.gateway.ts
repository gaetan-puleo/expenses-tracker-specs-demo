import { Expense } from '../../entities/expense.entity'
import { CreateExpenseInput } from '../../../expenses/createExpense/createExpense.reducer'
import { UpdateExpenseInput } from '../../../expenses/updateExpense/updateExpense.reducer'

export interface ExpensesGateway {
  createExpense(input: CreateExpenseInput): Promise<Expense>
  listExpenses(): Promise<Expense[]>
  deleteExpense(id: string): Promise<void>
  updateExpense(input: UpdateExpenseInput): Promise<Expense>
}