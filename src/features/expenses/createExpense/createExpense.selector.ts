import { AppState } from '../../../store/init-store'

export const selectCreateExpenseStatus = (state: AppState) => 
  state.expenses.createExpense.status

export const selectCreateExpenseError = (state: AppState) => 
  state.expenses.createExpense.error