import { setExpenseFormErrors } from './expenseForm.events'
import { AppThunk } from '../../../store/init-store'
import { ExpenseFormData, FormErrors, EXPENSE_CATEGORIES, ExpenseCategory } from '../../shared/entities/expense.entity'

const validateAmount = (amount: string): string | null => {
  if (!amount.trim()) {
    return 'Amount is required'
  }
  
  const numAmount = parseFloat(amount)
  if (isNaN(numAmount)) {
    return 'Amount must be a valid number'
  }
  
  if (numAmount <= 0) {
    return 'Amount must be greater than 0'
  }
  
  if (numAmount > 10000) {
    return 'Amount cannot exceed $10,000'
  }
  
  const decimalPlaces = (amount.split('.')[1] || '').length
  if (decimalPlaces > 2) {
    return 'Amount can have at most 2 decimal places'
  }
  
  return null
}

const validateDescription = (description: string): string | null => {
  if (!description.trim()) {
    return 'Description is required'
  }
  
  if (description.trim().length < 3) {
    return 'Description must be at least 3 characters'
  }
  
  if (description.length > 100) {
    return 'Description cannot exceed 100 characters'
  }
  
  const validPattern = /^[a-zA-Z0-9\s\-.,!?()]+$/
  if (!validPattern.test(description)) {
    return 'Description contains invalid characters'
  }
  
  return null
}

const validateCategory = (category: string): string | null => {
  if (!category.trim()) {
    return 'Category is required'
  }
  
  if (!EXPENSE_CATEGORIES.includes(category as ExpenseCategory)) {
    return 'Please select a valid category'
  }
  
  return null
}

const validateDate = (date: string): string | null => {
  if (!date.trim()) {
    return 'Date is required'
  }
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) {
    return 'Please enter a valid date'
  }
  
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  
  if (dateObj > today) {
    return 'Date cannot be in the future'
  }
  
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  
  if (dateObj < oneYearAgo) {
    return 'Date cannot be older than 1 year'
  }
  
  return null
}

const validateExpenseFormData = (formData: ExpenseFormData): FormErrors => {
  const errors: FormErrors = {}
  
  const amountError = validateAmount(formData.amount)
  if (amountError) errors.amount = amountError
  
  const descriptionError = validateDescription(formData.description)
  if (descriptionError) errors.description = descriptionError
  
  const categoryError = validateCategory(formData.category)
  if (categoryError) errors.category = categoryError
  
  const dateError = validateDate(formData.date)
  if (dateError) errors.date = dateError
  
  return errors
}

export const validateExpenseForm = (): AppThunk => {
  return (dispatch, getState) => {
    const formData = getState().expenses.expenseForm.data
    const errors = validateExpenseFormData(formData)
    dispatch(setExpenseFormErrors(errors))
  }
}