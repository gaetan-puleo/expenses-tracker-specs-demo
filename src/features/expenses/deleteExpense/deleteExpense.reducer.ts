import { createReducer } from '@reduxjs/toolkit'
import { deleteExpenseStart, deleteExpenseSuccess, deleteExpenseError } from './deleteExpense.events'

export interface DeleteExpenseState {
  status: 'idle' | 'loading' | 'success' | 'failed'
  error: string | null
  deletingExpenseId: string | null
}

const initialState: DeleteExpenseState = {
  status: 'idle',
  error: null,
  deletingExpenseId: null
}

export const deleteExpenseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteExpenseStart, (state, action) => {
      state.status = 'loading'
      state.error = null
      state.deletingExpenseId = action.payload
    })
    .addCase(deleteExpenseSuccess, (state) => {
      state.status = 'success'
      state.error = null
      state.deletingExpenseId = null
    })
    .addCase(deleteExpenseError, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
      state.deletingExpenseId = null
    })
})