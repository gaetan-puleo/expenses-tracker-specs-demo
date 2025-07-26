import { UpdateExpenseInput } from './updateExpense.reducer'
import { updateExpenseStart, updateExpenseSuccess, updateExpenseError } from './updateExpense.events'
import { listExpensesSuccess } from '../listExpenses/listExpenses.events'
import { AppThunk } from '../../../store/init-store'

export const updateExpense = (input: UpdateExpenseInput): AppThunk => {
  return async (dispatch, getState, { gateways }) => {
    dispatch(updateExpenseStart())
    try {
      const updatedExpense = await gateways.expensesGateway!.updateExpense(input)
      
      const currentExpenses = getState().expenses.listExpenses.expenses
      const updatedExpenses = currentExpenses.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
      dispatch(listExpensesSuccess(updatedExpenses))
      
      dispatch(updateExpenseSuccess(updatedExpense))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update expense'
      dispatch(updateExpenseError(errorMessage))
    }
  }
}