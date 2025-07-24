import { deleteExpenseStart, deleteExpenseSuccess, deleteExpenseError } from './deleteExpense.events'
import { AppThunk } from '../../../store/init-store'

export const deleteExpense = (id: string): AppThunk => {
  return async (dispatch, _getState, { gateways }) => {
    dispatch(deleteExpenseStart(id))
    try {
      await gateways.expensesGateway!.deleteExpense(id)
      dispatch(deleteExpenseSuccess(id))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete expense'
      dispatch(deleteExpenseError(errorMessage))
    }
  }
}