import { describe, it, expect, beforeEach } from 'vitest'
import { AppStore, initStore } from '../../../store/init-store'
import { FakeExpensesGateway } from '../../shared/gateways/implementations/FakeExpenses.gateway'
import { validateExpenseForm } from './validateExpenseForm.usecase'
import { updateExpenseFormField } from './expenseForm.events'
import { selectExpenseFormErrors, selectExpenseFormIsValid } from './expenseForm.selector'

describe('validateExpenseForm use-case', () => {
  let store: AppStore
  let fakeGateway: FakeExpensesGateway

  beforeEach(() => {
    fakeGateway = new FakeExpensesGateway()
    store = initStore({
      gateways: {
        expensesGateway: fakeGateway,
      },
    })
  })

  it('should validate form with invalid data and set errors correctly', () => {
    store.dispatch(updateExpenseFormField({ field: 'amount', value: '-10' }))
    store.dispatch(updateExpenseFormField({ field: 'description', value: 'ab' }))
    store.dispatch(updateExpenseFormField({ field: 'category', value: 'InvalidCategory' }))
    store.dispatch(updateExpenseFormField({ field: 'date', value: 'invalid-date' }))

    store.dispatch(validateExpenseForm())

    const state = store.getState()
    const errors = selectExpenseFormErrors(state)
    const isValid = selectExpenseFormIsValid(state)

    expect(errors.amount).toBe('Amount must be greater than 0')
    expect(errors.description).toBe('Description must be at least 3 characters')
    expect(errors.category).toBe('Please select a valid category')
    expect(errors.date).toBe('Please enter a valid date')
    expect(isValid).toBe(false)
  })

  it('should validate form with valid data and clear errors', () => {
    const today = new Date().toISOString().split('T')[0]
    
    store.dispatch(updateExpenseFormField({ field: 'amount', value: '25.50' }))
    store.dispatch(updateExpenseFormField({ field: 'description', value: 'Coffee and pastry' }))
    store.dispatch(updateExpenseFormField({ field: 'category', value: 'Food' }))
    store.dispatch(updateExpenseFormField({ field: 'date', value: today }))

    store.dispatch(validateExpenseForm())

    const state = store.getState()
    const errors = selectExpenseFormErrors(state)
    const isValid = selectExpenseFormIsValid(state)

    expect(errors).toEqual({})
    expect(isValid).toBe(true)
  })

  it('should validate required fields correctly', () => {
    store.dispatch(updateExpenseFormField({ field: 'amount', value: '' }))
    store.dispatch(updateExpenseFormField({ field: 'description', value: '' }))
    store.dispatch(updateExpenseFormField({ field: 'category', value: '' }))
    store.dispatch(updateExpenseFormField({ field: 'date', value: '' }))

    store.dispatch(validateExpenseForm())

    const state = store.getState()
    const errors = selectExpenseFormErrors(state)

    expect(errors.amount).toBe('Amount is required')
    expect(errors.description).toBe('Description is required')
    expect(errors.category).toBe('Category is required')
    expect(errors.date).toBe('Date is required')
  })

  it('should validate amount edge cases', () => {
    store.dispatch(updateExpenseFormField({ field: 'amount', value: '10.123' }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).amount).toBe('Amount can have at most 2 decimal places')

    store.dispatch(updateExpenseFormField({ field: 'amount', value: '10001' }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).amount).toBe('Amount cannot exceed $10,000')

    store.dispatch(updateExpenseFormField({ field: 'amount', value: 'abc' }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).amount).toBe('Amount must be a valid number')
  })

  it('should validate description constraints', () => {
    store.dispatch(updateExpenseFormField({ field: 'description', value: 'a'.repeat(101) }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).description).toBe('Description cannot exceed 100 characters')

    store.dispatch(updateExpenseFormField({ field: 'description', value: 'test@#$%' }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).description).toBe('Description contains invalid characters')
  })

  it('should validate date constraints', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    store.dispatch(updateExpenseFormField({ field: 'date', value: tomorrow.toISOString().split('T')[0] }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).date).toBe('Date cannot be in the future')

    const twoYearsAgo = new Date()
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)
    store.dispatch(updateExpenseFormField({ field: 'date', value: twoYearsAgo.toISOString().split('T')[0] }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).date).toBe('Date cannot be older than 1 year')
  })

  it('should validate category selection', () => {
    store.dispatch(updateExpenseFormField({ field: 'category', value: 'Food' }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).category).toBeUndefined()

    store.dispatch(updateExpenseFormField({ field: 'category', value: 'Transportation' }))
    store.dispatch(validateExpenseForm())
    expect(selectExpenseFormErrors(store.getState()).category).toBeUndefined()
  })
})