import { describe, it, expect, beforeEach } from 'vitest'
import { AppStore, initStore } from '../../../store/init-store'
import { FakeExpensesGateway } from '../../shared/gateways/implementations/FakeExpenses.gateway'
import { listExpenses } from './listExpenses.usecase'
import { selectListExpensesStatus, selectListExpensesError, selectExpensesList, selectExpensesCount } from './listExpenses.selector'

describe('listExpenses use-case', () => {
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

  it('should fetch expenses successfully', async () => {
    await store.dispatch(listExpenses())
    
    const state = store.getState()
    expect(selectListExpensesStatus(state)).toBe('success')
    expect(selectListExpensesError(state)).toBe(null)
    expect(selectExpensesList(state)).toHaveLength(4)
    expect(selectExpensesCount(state)).toBe(4)
  })


  it('should update loading states correctly', async () => {
    const promise = store.dispatch(listExpenses())
    
    let state = store.getState()
    expect(selectListExpensesStatus(state)).toBe('loading')
    
    await promise
    
    state = store.getState()
    expect(selectListExpensesStatus(state)).toBe('success')
  })

  it('should fetch and store expenses with correct data structure', async () => {
    await store.dispatch(listExpenses())
    
    const state = store.getState()
    const expenses = selectExpensesList(state)
    
    expect(selectListExpensesStatus(state)).toBe('success')
    expect(expenses).toHaveLength(4)
    expect(expenses[0]).toHaveProperty('id')
    expect(expenses[0]).toHaveProperty('amount')
    expect(expenses[0]).toHaveProperty('description')
  })

  it('should handle empty expenses list', async () => {
    fakeGateway.listExpenses = async () => []

    await store.dispatch(listExpenses())
    
    const state = store.getState()
    expect(selectListExpensesStatus(state)).toBe('success')
    expect(selectExpensesList(state)).toHaveLength(0)
    expect(selectExpensesCount(state)).toBe(0)
  })
})