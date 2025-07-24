import { AppState } from '../../../store/init-store'

export const selectListExpensesStatus = (state: AppState) => 
  state.expenses.listExpenses.status

export const selectListExpensesError = (state: AppState) => 
  state.expenses.listExpenses.error

export const selectExpensesList = (state: AppState) => 
  state.expenses.listExpenses.expenses

export const selectExpensesCount = (state: AppState) => 
  state.expenses.listExpenses.count