import { createReducer } from '@reduxjs/toolkit'
import { ExpenseFormData, FormErrors } from '../../shared/entities/expense.entity'
import { 
  updateExpenseFormField, 
  setExpenseFormErrors, 
  setExpenseFormSubmitting, 
  resetExpenseForm,
  setEditMode,
  clearEditMode,
  openExpenseModal,
  closeExpenseModal
} from './expenseForm.events'

export interface ExpenseFormState {
  data: ExpenseFormData
  errors: FormErrors
  isSubmitting: boolean
  isValid: boolean
  isEditMode: boolean
  editingExpenseId: string | null
  isModalOpen: boolean
}

const initialState: ExpenseFormState = {
  data: {
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0] // Default to today
  },
  errors: {},
  isSubmitting: false,
  isValid: false,
  isEditMode: false,
  editingExpenseId: null,
  isModalOpen: false
}

export const expenseFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateExpenseFormField, (state, action) => {
      state.data[action.payload.field as keyof ExpenseFormData] = action.payload.value
      
      // Clear field-specific error when user starts typing
      if (state.errors[action.payload.field as keyof FormErrors]) {
        delete state.errors[action.payload.field as keyof FormErrors]
      }
    })
    .addCase(setExpenseFormErrors, (state, action) => {
      state.errors = action.payload
      state.isValid = Object.keys(action.payload).length === 0
    })
    .addCase(setExpenseFormSubmitting, (state, action) => {
      state.isSubmitting = action.payload
    })
    .addCase(resetExpenseForm, (state) => {
      state.data = {
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      }
      state.errors = {}
      state.isSubmitting = false
      state.isValid = false
      state.isEditMode = false
      state.editingExpenseId = null
    })
    .addCase(setEditMode, (state, action) => {
      state.isEditMode = true
      state.editingExpenseId = action.payload.id
      state.isModalOpen = true
      state.data = {
        amount: action.payload.amount.toString(),
        description: action.payload.description,
        category: action.payload.category,
        date: action.payload.date
      }
      state.errors = {}
      state.isSubmitting = false
      state.isValid = true
    })
    .addCase(clearEditMode, (state) => {
      state.isEditMode = false
      state.editingExpenseId = null
      state.data = {
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      }
      state.errors = {}
      state.isSubmitting = false
      state.isValid = false
    })
    .addCase(openExpenseModal, (state) => {
      state.isModalOpen = true
    })
    .addCase(closeExpenseModal, (state) => {
      state.isModalOpen = false
    })
})