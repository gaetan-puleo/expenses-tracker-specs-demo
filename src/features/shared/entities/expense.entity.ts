export interface Expense {
  id: string
  amount: number
  description: string
  category: string
  date: string
  createdAt: string
}

export interface CreateExpenseInput {
  amount: number
  description: string
  category: string
  date: string
}

export interface UpdateExpenseInput {
  id: string
  amount: number
  description: string
  category: string
  date: string
}

export interface ExpenseFormData {
  amount: string
  description: string
  category: string
  date: string
}

export interface FormErrors {
  amount?: string
  description?: string
  category?: string
  date?: string
  general?: string
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