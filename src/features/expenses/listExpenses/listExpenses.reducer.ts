import { createReducer } from '@reduxjs/toolkit'
import { Expense } from '../../shared/entities/expense.entity'
import { listExpensesStart, listExpensesSuccess, listExpensesError } from './listExpenses.events'

export interface ListExpensesState {
  status: 'idle' | 'loading' | 'success' | 'failed'
  error: string | null
  expenses: Expense[]
  count: number
}

const initialState: ListExpensesState = {
  status: 'idle',
  error: null,
  expenses: [],
  count: 0
}

export const listExpensesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(listExpensesStart, (state) => {
      state.status = 'loading'
      state.error = null
    })
    .addCase(listExpensesSuccess, (state, action) => {
      state.status = 'success'
      state.error = null
      state.expenses = action.payload
      state.count = action.payload.length
    })
    .addCase(listExpensesError, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
})