export interface Expense {
  id: string
  amount: number
  description: string
  category: string
  date: string
  createdAt: string
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation', 
  'Health',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other'
] as const

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]
