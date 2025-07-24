import { createReducer } from '@reduxjs/toolkit'
import { updateExpenseStart, updateExpenseSuccess, updateExpenseError } from './updateExpense.events'

export interface UpdateExpenseState {
  status: 'idle' | 'loading' | 'success' | 'failed'
  error: string | null
}

const initialState: UpdateExpenseState = {
  status: 'idle',
  error: null
}

export const updateExpenseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateExpenseStart, (state) => {
      state.status = 'loading'
      state.error = null
    })
    .addCase(updateExpenseSuccess, (state) => {
      state.status = 'success'
      state.error = null
    })
    .addCase(updateExpenseError, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
})