import { AppState } from '../../../store/init-store'

export const selectUpdateExpenseStatus = (state: AppState) => 
  state.expenses.updateExpense.status

export const selectUpdateExpenseError = (state: AppState) => 
  state.expenses.updateExpense.error