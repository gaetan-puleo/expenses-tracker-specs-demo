import { combineReducers } from "@reduxjs/toolkit";
import { createExpenseReducer } from "../features/expenses/createExpense/createExpense.reducer";
import { listExpensesReducer } from "../features/expenses/listExpenses/listExpenses.reducer";
import { expenseFormReducer } from "../features/expenses/expenseForm/expenseForm.reducer";
import { deleteExpenseReducer } from "../features/expenses/deleteExpense/deleteExpense.reducer";
import { updateExpenseReducer } from "../features/expenses/updateExpense/updateExpense.reducer";

export const rootReducer = combineReducers({
  expenses: combineReducers({
    createExpense: createExpenseReducer,
    listExpenses: listExpensesReducer,
    expenseForm: expenseFormReducer,
    deleteExpense: deleteExpenseReducer,
    updateExpense: updateExpenseReducer,
  }),
});