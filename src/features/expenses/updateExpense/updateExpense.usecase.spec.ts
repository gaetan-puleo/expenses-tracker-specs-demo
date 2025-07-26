import { describe, it, expect, beforeEach } from 'vitest'
import { AppStore, initStore } from '../../../store/init-store'
import { FakeExpensesGateway } from '../../shared/gateways/implementations/FakeExpenses.gateway'
import { updateExpense } from './updateExpense.usecase'
import { UpdateExpenseInput } from './updateExpense.reducer'
import { selectUpdateExpenseStatus, selectUpdateExpenseError } from './updateExpense.selector'
import { listExpenses } from '../listExpenses/listExpenses.usecase'

describe('updateExpense use-case', () => {
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

  const validUpdateInput: UpdateExpenseInput = {
    id: 'expense-1',
    amount: 30.50,
    description: 'Updated coffee and pastry',
    category: 'Food',
    date: '2024-01-16'
  }

  it('should update expense successfully with valid input and existing id', async () => {
    await store.dispatch(listExpenses())
    await store.dispatch(updateExpense(validUpdateInput))
    
    const state = store.getState()
    expect(selectUpdateExpenseStatus(state)).toBe('success')
    expect(selectUpdateExpenseError(state)).toBe(null)
  })

  it('should handle non-existent expense id gracefully', async () => {
    const invalidInput: UpdateExpenseInput = {
      id: 'non-existent-id',
      amount: 50,
      description: 'Test expense',
      category: 'Test',
      date: '2024-01-15'
    }

    await store.dispatch(updateExpense(invalidInput))
    
    const state = store.getState()
    expect(selectUpdateExpenseStatus(state)).toBe('failed')
    expect(selectUpdateExpenseError(state)).toBe('Expense not found')
  })

  it('should handle validation errors gracefully', async () => {
    const invalidInput: UpdateExpenseInput = {
      id: 'expense-1',
      amount: -10,
      description: 'Invalid expense',
      category: 'Test',
      date: '2024-01-15'
    }

    await store.dispatch(updateExpense(invalidInput))
    
    const state = store.getState()
    expect(selectUpdateExpenseStatus(state)).toBe('failed')
    expect(selectUpdateExpenseError(state)).toBe('Amount must be greater than 0')
  })

  it('should handle empty description errors', async () => {
    const invalidInput: UpdateExpenseInput = {
      id: 'expense-1',
      amount: 50,
      description: '',
      category: 'Test',
      date: '2024-01-15'
    }

    await store.dispatch(updateExpense(invalidInput))
    
    const state = store.getState()
    expect(selectUpdateExpenseStatus(state)).toBe('failed')
    expect(selectUpdateExpenseError(state)).toBe('Description is required')
  })

  it('should update loading states correctly', async () => {
    await store.dispatch(listExpenses())
    
    const promise = store.dispatch(updateExpense(validUpdateInput))
    
    let state = store.getState()
    expect(selectUpdateExpenseStatus(state)).toBe('loading')
    
    await promise
    
    state = store.getState()
    expect(selectUpdateExpenseStatus(state)).toBe('success')
  })

  it('should preserve expense id and createdAt during update', async () => {
    await store.dispatch(listExpenses())
    await store.dispatch(updateExpense(validUpdateInput))
    
    const state = store.getState()
    const updatedExpense = state.expenses.listExpenses.expenses.find(exp => exp.id === 'expense-1')
    
    expect(updatedExpense).toBeDefined()
    expect(updatedExpense?.id).toBe('expense-1')
    expect(updatedExpense?.amount).toBe(30.50)
    expect(updatedExpense?.description).toBe('Updated coffee and pastry')
    expect(updatedExpense?.category).toBe('Food')
    expect(updatedExpense?.date).toBe('2024-01-16')
    expect(updatedExpense?.createdAt).toBe('2024-01-15T08:30:00Z')
  })

  it('should update expense in the list after successful update', async () => {
    await store.dispatch(listExpenses())
    await store.dispatch(updateExpense(validUpdateInput))
    
    const state = store.getState()
    const updatedExpense = state.expenses.listExpenses.expenses.find(exp => exp.id === 'expense-1')
    
    expect(updatedExpense).toBeDefined()
    expect(updatedExpense?.amount).toBe(30.50)
    expect(updatedExpense?.description).toBe('Updated coffee and pastry')
    expect(updatedExpense?.date).toBe('2024-01-16')
  })
})