import { AppState } from '../../../store/init-store'

export const selectDeleteExpenseState = (state: AppState) => 
  state.expenses.deleteExpense

export const selectDeleteExpenseStatus = (state: AppState) => 
  state.expenses.deleteExpense.status

export const selectDeleteExpenseError = (state: AppState) => 
  state.expenses.deleteExpense.error

export const selectIsDeleting = (state: AppState) => 
  state.expenses.deleteExpense.status === 'loading'

export const selectDeletingExpenseId = (state: AppState) => 
  state.expenses.deleteExpense.deletingExpenseId