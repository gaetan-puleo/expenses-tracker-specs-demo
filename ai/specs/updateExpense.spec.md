**Overview**
A feature that allows users to update existing expense entries by modifying expense details such as amount, description, category, and date. The expense data is handled through a fake gateway interface for testing and development purposes.

**Sequence**
User Input › Load Existing Expense › Validation › Dispatch Update Action › Fake Gateway Call › Success/Error Handling › State Update › UI Update

**Flow Description**
1. User selects an existing expense to edit from the expense list
2. Expense form is pre-populated with current expense data
3. User modifies expense details (amount, description, category, date)
4. Form validation ensures all required fields are provided and amount is valid
5. updateExpense use case is dispatched with expense id and updated input data
6. Use case calls the fake expenses gateway to simulate expense update
7. Fake gateway returns success response with updated expense data or validation error
8. On success, expense is updated in state and user sees confirmation
9. On error, error state is updated and user sees error message
10. Loading states are managed throughout the process

**Related Files**
- src/features/expenses/updateExpense/updateExpense.selector.ts
- src/features/expenses/updateExpense/updateExpense.reducer.ts
- src/features/expenses/updateExpense/updateExpense.events.ts
- src/features/expenses/updateExpense/updateExpense.usecase.ts
- src/features/expenses/updateExpense/updateExpense.usecase.spec.ts
- src/features/shared/entities/expense.entity.ts
- src/features/shared/gateways/interfaces/expenses.gateway.ts
- src/features/shared/gateways/implementations/FakeExpenses.gateway.ts

**Descriptions**

**updateExpense.selector.ts**
- selectUpdateExpenseStatus: Returns the current status of expense update (idle, loading, success, failed)
- selectUpdateExpenseError: Returns any error message from failed expense update

**updateExpense.reducer.ts**
- UpdateExpenseInput: Input interface for updating expenses
  - Properties: id (string), amount (number), description (string), category (string), date (string)
- UpdateExpenseState: State interface for expense update
  - Properties: status ('idle' | 'loading' | 'success' | 'failed'), error (string | null)
- updateExpenseReducer: Redux reducer handling updateExpense state changes
  - Initial state: { status: 'idle', error: null }
  - Handles loading, success, and error states

**updateExpense.events.ts**
- updateExpenseStart: Action dispatched when expense update begins
- updateExpenseSuccess: Action dispatched when expense is updated successfully
  - Parameters: expense (Expense) - the updated expense data
- updateExpenseError: Action dispatched when expense update fails
  - Parameters: error (string) - error message

**updateExpense.usecase.ts**
- updateExpense: Async thunk for updating an existing expense
  - Parameters: input (UpdateExpenseInput) - expense data including id to update
  - Return type: Promise resolving to updated Expense entity

**updateExpense.usecase.spec.ts**
- Test suite for updateExpense use case with fake gateway

**expense.entity.ts**
- Expense: Entity representing an expense record
  - Properties: id (string), amount (number), description (string), category (string), date (string), createdAt (string)
- EXPENSE_CATEGORIES: Constant array of available expense categories
- ExpenseCategory: Type representing valid expense category values

**expenses.gateway.ts**
- ExpensesGateway: Interface for expense-related operations
  - updateExpense: Updates an existing expense
    - Parameters: input (UpdateExpenseInput)
    - Return type: Promise<Expense>

**FakeExpenses.gateway.ts**
- FakeExpensesGateway: Mock implementation for development and testing
  - updateExpense: Simulates expense update with fake data
    - Parameters: input (UpdateExpenseInput)
    - Return type: Promise<Expense>

**Tests**
- updateExpense.usecase.spec.ts
  - should update expense successfully with valid input and existing id
  - should handle non-existent expense id gracefully
  - should handle validation errors gracefully
  - should handle empty description errors
  - should update loading states correctly
  - should preserve expense id and createdAt during update
  - should update expense in the list after successful update