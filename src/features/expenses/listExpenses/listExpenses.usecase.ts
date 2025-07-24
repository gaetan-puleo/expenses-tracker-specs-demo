import { listExpensesStart, listExpensesSuccess, listExpensesError } from './listExpenses.events'
import { AppThunk } from '../../../store/init-store'

export const listExpenses = (): AppThunk => {
  return async (dispatch, _getState, { gateways }) => {
    dispatch(listExpensesStart())
    try {
      const expenses = await gateways.expensesGateway!.listExpenses()
      dispatch(listExpensesSuccess(expenses))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch expenses'
      dispatch(listExpensesError(errorMessage))
    }
  }
}