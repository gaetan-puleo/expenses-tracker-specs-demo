import { createAction } from '@reduxjs/toolkit'
import { Expense } from '../../shared/entities/expense.entity'

export const updateExpenseStart = createAction('updateExpense/start')

export const updateExpenseSuccess = createAction<Expense>('updateExpense/success')

export const updateExpenseError = createAction<string>('updateExpense/error')