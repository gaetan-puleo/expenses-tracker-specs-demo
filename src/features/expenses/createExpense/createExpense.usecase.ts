import { CreateExpenseInput } from './createExpense.reducer'
import { createExpenseStart, createExpenseSuccess, createExpenseError } from './createExpense.events'
import { AppThunk } from '../../../store/init-store'

export const createExpense = (input: CreateExpenseInput): AppThunk => {
  return async (dispatch, _getState, { gateways }) => {
    dispatch(createExpenseStart())
    try {
      const expense = await gateways.expensesGateway!.createExpense(input)
      dispatch(createExpenseSuccess(expense))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create expense'
      dispatch(createExpenseError(errorMessage))
    }
  }
}