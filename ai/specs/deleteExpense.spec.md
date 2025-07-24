## Overview
Feature that allows users to delete an existing expense from the system. The feature handles the deletion process with proper loading states, error handling, and updates the application state to reflect the removal.

## Sequence
User triggers deletion › deleteExpense use case starts › Loading state activated › Gateway processes deletion › Success/Error state updated › UI reflects changes

## Flow Description
1. User initiates expense deletion with expense ID
2. Delete expense use case dispatches loading action
3. Gateway processes the deletion request
4. On success, dispatches success action and removes expense from state
5. On error, dispatches error action with appropriate error handling
6. UI updates to reflect the current state (loading, success, or error)

## Related Files
- src/features/expenses/deleteExpense/deleteExpense.events.ts
- src/features/expenses/deleteExpense/deleteExpense.reducer.ts
- src/features/expenses/deleteExpense/deleteExpense.selector.ts
- src/features/expenses/deleteExpense/deleteExpense.usecase.ts
- src/features/expenses/deleteExpense/deleteExpense.usecase.spec.ts
- src/features/shared/gateways/interfaces/expenses.gateway.ts (update)
- src/features/shared/gateways/implementations/FakeExpenses.gateway.ts (update)

## Descriptions

### deleteExpense.events.ts
**deleteExpenseStart**
- Description: Action dispatched when expense deletion begins
- Parameters: expense ID (string)
- Return type: Action with expense ID payload

**deleteExpenseSuccess**
- Description: Action dispatched when expense deletion succeeds
- Parameters: expense ID (string)
- Return type: Action with expense ID payload

**deleteExpenseError**
- Description: Action dispatched when expense deletion fails
- Parameters: error message (string)
- Return type: Action with error payload

### deleteExpense.reducer.ts
**deleteExpenseReducer**
- Description: Manages the state of expense deletion process
- Parameters: state (DeleteExpenseState), action (DeleteExpenseAction)
- Return type: Updated state with loading, success, or error status

### deleteExpense.selector.ts
**selectDeleteExpenseState**
- Description: Selects the entire delete expense state
- Parameters: root state (AppState)
- Return type: Delete expense state object

**selectIsDeleting**
- Description: Selects whether expense deletion is in progress
- Parameters: root state (AppState)
- Return type: Boolean indicating loading status

**selectDeleteExpenseError**
- Description: Selects any error from expense deletion
- Parameters: root state (AppState)
- Return type: Error message string or null

### deleteExpense.usecase.ts
**deleteExpense**
- Description: Main use case for deleting an expense
- Parameters: expense ID (string)
- Return type: Async thunk that handles the deletion process

### expenses.gateway.ts (interface update)
**deleteExpense**
- Description: Gateway method to delete an expense
- Parameters: expense ID (string)
- Return type: Promise<void>

### FakeExpenses.gateway.ts (implementation update)
**deleteExpense**
- Description: Mock implementation of expense deletion
- Parameters: expense ID (string)
- Return type: Promise<void> that simulates deletion from mock data

## Tests

### deleteExpense.usecase.spec.ts
**Test Cases:**
- Should successfully delete an expense and update state
- Should handle deletion of non-existent expense with appropriate error
- Should maintain proper loading states throughout the process
- Should remove expense from the expenses list after successful deletion