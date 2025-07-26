**Overview**
A feature that allows users to create new expense entries by providing expense details such as amount, description, category, and date. The expense data is handled through a fake gateway interface for testing and development purposes.

**Sequence**
User Input › Validation › Dispatch Create Action › Fake Gateway Call › Success/Error Handling › State Update › UI Update

**Flow Description**
1. User fills out expense form with required details (amount, description, category, date)
2. Form validation ensures all required fields are provided and amount is valid
3. createExpense use case is dispatched with expense input data
4. Use case calls the fake expenses gateway to simulate expense creation
5. Fake gateway returns success response with created expense data or validation error
6. On success, expense is added to state and user sees confirmation
7. On error, error state is updated and user sees error message
8. Loading states are managed throughout the process

**Related Files**
- src/features/expenses/createExpense/createExpense.selector.ts
- src/features/expenses/createExpense/createExpense.reducer.ts
- src/features/expenses/createExpense/createExpense.events.ts
- src/features/expenses/createExpense/createExpense.usecase.ts
- src/features/expenses/createExpense/createExpense.usecase.spec.ts
- src/features/shared/entities/expense.entity.ts
- src/features/shared/gateways/interfaces/expenses.gateway.ts
- src/features/shared/gateways/implementations/FakeExpenses.gateway.ts

**Descriptions**

**createExpense.selector.ts**
- selectCreateExpenseStatus: Returns the current status of expense creation (idle, loading, success, failed)
- selectCreateExpenseError: Returns any error message from failed expense creation

**createExpense.reducer.ts**
- CreateExpenseInput: Input interface for creating expenses
  - Properties: amount (number), description (string), category (string), date (string)
- CreateExpenseState: State interface for expense creation
  - Properties: status ('idle' | 'loading' | 'success' | 'failed'), error (string | null)
- createExpenseReducer: Redux reducer handling createExpense state changes
  - Initial state: { status: 'idle', error: null }
  - Handles loading, success, and error states

**createExpense.events.ts**
- createExpenseStart: Action dispatched when expense creation begins
- createExpenseSuccess: Action dispatched when expense is created successfully
  - Parameters: expense (Expense) - the created expense data
- createExpenseError: Action dispatched when expense creation fails
  - Parameters: error (string) - error message

**createExpense.usecase.ts**
- createExpense: Async thunk for creating a new expense
  - Parameters: expenseInput (CreateExpenseInput) - expense data to create
  - Return type: Promise resolving to created Expense entity

**createExpense.usecase.spec.ts**
- Test suite for createExpense use case with fake gateway

**expense.entity.ts**
- Expense: Entity representing an expense record
  - Properties: id (string), amount (number), description (string), category (string), date (string), createdAt (string)
- EXPENSE_CATEGORIES: Constant array of available expense categories
- ExpenseCategory: Type representing valid expense category values

**expenses.gateway.ts**
- ExpensesGateway: Interface for expense-related operations
  - createExpense: Creates a new expense
    - Parameters: input (CreateExpenseInput)
    - Return type: Promise<Expense>

**FakeExpenses.gateway.ts**
- FakeExpensesGateway: Mock implementation for development and testing
  - createExpense: Simulates expense creation with fake data
    - Parameters: input (CreateExpenseInput)
    - Return type: Promise<Expense>

**Tests**
- createExpense.usecase.spec.ts
  - should create expense successfully with valid input
  - should handle validation errors gracefully
  - should validate required fields
  - should update loading states correctly
  - should dispatch correct actions in sequence