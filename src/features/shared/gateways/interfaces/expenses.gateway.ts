import { CreateExpenseInput, Expense, UpdateExpenseInput } from '../../entities/expense.entity'

export interface ExpensesGateway {
  createExpense(input: CreateExpenseInput): Promise<Expense>
  listExpenses(): Promise<Expense[]>
  deleteExpense(id: string): Promise<void>
  updateExpense(input: UpdateExpenseInput): Promise<Expense>
}