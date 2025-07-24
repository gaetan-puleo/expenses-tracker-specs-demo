import { createReducer } from '@reduxjs/toolkit'
import { createExpenseStart, createExpenseSuccess, createExpenseError } from './createExpense.events'

export interface CreateExpenseState {
  status: 'idle' | 'loading' | 'success' | 'failed'
  error: string | null
}

const initialState: CreateExpenseState = {
  status: 'idle',
  error: null
}

export const createExpenseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createExpenseStart, (state) => {
      state.status = 'loading'
      state.error = null
    })
    .addCase(createExpenseSuccess, (state) => {
      state.status = 'success'
      state.error = null
    })
    .addCase(createExpenseError, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
})