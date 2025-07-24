import { CreateExpenseInput, Expense, UpdateExpenseInput } from '../../entities/expense.entity'
import { ExpensesGateway } from '../interfaces/expenses.gateway'

export class FakeExpensesGateway implements ExpensesGateway {
  private mockExpenses: Expense[] = [
    {
      id: 'expense-1',
      amount: 25.50,
      description: 'Coffee and pastry',
      category: 'Food',
      date: '2024-01-15',
      createdAt: '2024-01-15T08:30:00Z'
    },
    {
      id: 'expense-2',
      amount: 150.00,
      description: 'Monthly gym membership',
      category: 'Health',
      date: '2024-01-10',
      createdAt: '2024-01-10T12:00:00Z'
    },
    {
      id: 'expense-3',
      amount: 45.99,
      description: 'Uber ride to airport',
      category: 'Transportation',
      date: '2024-01-08',
      createdAt: '2024-01-08T16:45:00Z'
    },
    {
      id: 'expense-4',
      amount: 12.75,
      description: 'Lunch at work',
      category: 'Food',
      date: '2024-01-05',
      createdAt: '2024-01-05T13:15:00Z'
    }
  ]

  async createExpense(input: CreateExpenseInput): Promise<Expense> {
    if (input.amount <= 0) {
      throw new Error('Amount must be greater than 0')
    }
    
    if (!input.description.trim()) {
      throw new Error('Description is required')
    }
    
    const expense: Expense = {
      id: `expense-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount: input.amount,
      description: input.description,
      category: input.category,
      date: input.date,
      createdAt: new Date().toISOString()
    }
    
    this.mockExpenses.unshift(expense)
    return expense
  }

  async listExpenses(): Promise<Expense[]> {
    
    return [...this.mockExpenses].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async deleteExpense(id: string): Promise<void> {
    
    const expenseIndex = this.mockExpenses.findIndex(expense => expense.id === id)
    
    if (expenseIndex === -1) {
      throw new Error('Expense not found')
    }
    
    this.mockExpenses.splice(expenseIndex, 1)
  }

  async updateExpense(input: UpdateExpenseInput): Promise<Expense> {
    if (input.amount <= 0) {
      throw new Error('Amount must be greater than 0')
    }
    
    if (!input.description.trim()) {
      throw new Error('Description is required')
    }
    
    const expenseIndex = this.mockExpenses.findIndex(expense => expense.id === input.id)
    
    if (expenseIndex === -1) {
      throw new Error('Expense not found')
    }
    
    const updatedExpense: Expense = {
      ...this.mockExpenses[expenseIndex],
      amount: input.amount,
      description: input.description,
      category: input.category,
      date: input.date
    }
    
    this.mockExpenses[expenseIndex] = updatedExpense
    return updatedExpense
  }
}