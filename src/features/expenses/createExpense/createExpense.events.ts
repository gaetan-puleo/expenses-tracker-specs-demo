import { createAction } from '@reduxjs/toolkit'
import { Expense } from '../../shared/entities/expense.entity'

export const createExpenseStart = createAction('createExpense/start')

export const createExpenseSuccess = createAction<Expense>('createExpense/success')

export const createExpenseError = createAction<string>('createExpense/error')