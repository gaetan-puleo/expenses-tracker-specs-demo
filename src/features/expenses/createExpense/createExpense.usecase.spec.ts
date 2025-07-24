import { describe, it, expect, beforeEach } from 'vitest'
import { AppStore, initStore } from '../../../store/init-store'
import { FakeExpensesGateway } from '../../shared/gateways/implementations/FakeExpenses.gateway'
import { createExpense } from './createExpense.usecase'
import { CreateExpenseInput } from '../../shared/entities/expense.entity'
import { selectCreateExpenseStatus, selectCreateExpenseError } from './createExpense.selector'

describe('createExpense use-case', () => {
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

  const validExpenseInput: CreateExpenseInput = {
    amount: 50.99,
    description: 'Office lunch',
    category: 'Food',
    date: '2024-01-15'
  }

  it('should create expense successfully with valid input', async () => {
    await store.dispatch(createExpense(validExpenseInput))
    
    const state = store.getState()
    expect(selectCreateExpenseStatus(state)).toBe('success')
    expect(selectCreateExpenseError(state)).toBe(null)
  })

  it('should handle validation errors gracefully', async () => {
    const invalidInput: CreateExpenseInput = {
      amount: -10,
      description: 'Invalid expense',
      category: 'Test',
      date: '2024-01-15'
    }

    await store.dispatch(createExpense(invalidInput))
    
    const state = store.getState()
    expect(selectCreateExpenseStatus(state)).toBe('failed')
    expect(selectCreateExpenseError(state)).toBe('Amount must be greater than 0')
  })

  it('should handle empty description errors', async () => {
    const invalidInput: CreateExpenseInput = {
      amount: 50,
      description: '',
      category: 'Test',
      date: '2024-01-15'
    }

    await store.dispatch(createExpense(invalidInput))
    
    const state = store.getState()
    expect(selectCreateExpenseStatus(state)).toBe('failed')
    expect(selectCreateExpenseError(state)).toBe('Description is required')
  })

  it('should update loading states correctly', async () => {
    const promise = store.dispatch(createExpense(validExpenseInput))
    
    let state = store.getState()
    expect(selectCreateExpenseStatus(state)).toBe('loading')
    
    await promise
    
    state = store.getState()
    expect(selectCreateExpenseStatus(state)).toBe('success')
  })

  it('should create expense with correct data', async () => {
    await store.dispatch(createExpense(validExpenseInput))
    
    const state = store.getState()
    expect(selectCreateExpenseStatus(state)).toBe('success')
    expect(selectCreateExpenseError(state)).toBe(null)
  })
})