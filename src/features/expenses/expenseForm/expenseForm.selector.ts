import { AppState } from '../../../store/init-store'

export const selectExpenseFormData = (state: AppState) => 
  state.expenses.expenseForm.data

export const selectExpenseFormErrors = (state: AppState) => 
  state.expenses.expenseForm.errors

export const selectExpenseFormIsValid = (state: AppState) => 
  state.expenses.expenseForm.isValid

export const selectExpenseFormIsSubmitting = (state: AppState) => 
  state.expenses.expenseForm.isSubmitting

export const selectExpenseFormFieldError = (fieldName: string) => (state: AppState) => 
  state.expenses.expenseForm.errors[fieldName as keyof typeof state.expenses.expenseForm.errors]

export const selectIsEditMode = (state: AppState) => 
  state.expenses.expenseForm.isEditMode

export const selectEditingExpenseId = (state: AppState) => 
  state.expenses.expenseForm.editingExpenseId

export const selectFormMode = (state: AppState) => 
  state.expenses.expenseForm.isEditMode ? 'edit' : 'create'

export const selectExpenseModalOpen = (state: AppState) => 
  state.expenses.expenseForm.isModalOpen