import { createAction } from '@reduxjs/toolkit'
import { FormErrors, Expense } from '../../shared/entities/expense.entity'

export const updateExpenseFormField = createAction<{ field: string; value: string }>('expenseForm/updateField')

export const setExpenseFormErrors = createAction<FormErrors>('expenseForm/setErrors')

export const setExpenseFormSubmitting = createAction<boolean>('expenseForm/setSubmitting')

export const resetExpenseForm = createAction('expenseForm/reset')

export const setEditMode = createAction<Expense>('expenseForm/setEditMode')

export const clearEditMode = createAction('expenseForm/clearEditMode')

export const openExpenseModal = createAction('expenseForm/openModal')

export const closeExpenseModal = createAction('expenseForm/closeModal')

