import { describe, it, expect, beforeEach } from 'vitest'
import { AppStore, initStore } from '../../../store/init-store'
import { FakeExpensesGateway } from '../../shared/gateways/implementations/FakeExpenses.gateway'
import { deleteExpense } from './deleteExpense.usecase'
import { selectDeleteExpenseStatus, selectDeleteExpenseError, selectIsDeleting, selectDeletingExpenseId } from './deleteExpense.selector'

describe('deleteExpense use-case', () => {
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

  it('should delete expense successfully with valid id', async () => {
    const expenseId = 'expense-1'
    
    await store.dispatch(deleteExpense(expenseId))
    
    const state = store.getState()
    expect(selectDeleteExpenseStatus(state)).toBe('success')
    expect(selectDeleteExpenseError(state)).toBe(null)
    expect(selectDeletingExpenseId(state)).toBe(null)
  })

  it('should handle non-existent expense errors gracefully', async () => {
    const nonExistentId = 'non-existent-expense'

    await store.dispatch(deleteExpense(nonExistentId))
    
    const state = store.getState()
    expect(selectDeleteExpenseStatus(state)).toBe('failed')
    expect(selectDeleteExpenseError(state)).toBe('Expense not found')
  })

  it('should update loading states correctly', async () => {
    const expenseId = 'expense-1'
    const promise = store.dispatch(deleteExpense(expenseId))
    
    let state = store.getState()
    expect(selectDeleteExpenseStatus(state)).toBe('loading')
    expect(selectIsDeleting(state)).toBe(true)
    expect(selectDeletingExpenseId(state)).toBe(expenseId)
    
    await promise
    
    state = store.getState()
    expect(selectDeleteExpenseStatus(state)).toBe('success')
    expect(selectIsDeleting(state)).toBe(false)
    expect(selectDeletingExpenseId(state)).toBe(null)
  })

  it('should delete expense and update state correctly', async () => {
    const expenseId = 'expense-1'
    await store.dispatch(deleteExpense(expenseId))
    
    const state = store.getState()
    expect(selectDeleteExpenseStatus(state)).toBe('success')
    expect(selectDeleteExpenseError(state)).toBe(null)
  })

})