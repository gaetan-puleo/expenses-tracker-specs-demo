import { createAction } from '@reduxjs/toolkit'

export const deleteExpenseStart = createAction<string>('deleteExpense/start')

export const deleteExpenseSuccess = createAction<string>('deleteExpense/success')

export const deleteExpenseError = createAction<string>('deleteExpense/error')