import { createAction } from '@reduxjs/toolkit'
import { Expense } from '../../shared/entities/expense.entity'

export const listExpensesStart = createAction('listExpenses/start')

export const listExpensesSuccess = createAction<Expense[]>('listExpenses/success')

export const listExpensesError = createAction<string>('listExpenses/error')