**Overview**
A feature that allows users to retrieve and display a list of all existing expenses from the API. The expense data is fetched through a fake gateway interface for testing and development purposes, supporting filtering, sorting, and pagination capabilities.

**Sequence**
Component Mount › Dispatch List Action › Fake Gateway Call › Success/Error Handling › State Update › UI Update

**Flow Description**
1. Component mounts or user triggers refresh action
2. listExpenses use case is dispatched to fetch all expenses
3. Use case calls the fake expenses gateway to simulate API call
4. Fake gateway returns list of expense data successfully
5. On success, expenses list is stored in state and UI displays the data
6. On error, error state is updated and user sees error message
7. Loading states are managed throughout the process
8. User can interact with the list (filter, sort, paginate if needed)

**Related Files**
- src/features/expenses/listExpenses/listExpenses.selector.ts
- src/features/expenses/listExpenses/listExpenses.reducer.ts
- src/features/expenses/listExpenses/listExpenses.events.ts
- src/features/expenses/listExpenses/listExpenses.usecase.ts
- src/features/expenses/listExpenses/listExpenses.usecase.spec.ts
- src/features/shared/entities/expense.entity.ts
- src/features/shared/gateways/interfaces/expenses.gateway.ts
- src/features/shared/gateways/implementations/FakeExpenses.gateway.ts

**Descriptions**

**listExpenses.selector.ts**
- selectListExpensesStatus: Returns the current status of expenses fetching (idle, loading, success, failed)
- selectListExpensesError: Returns any error message from failed expenses fetching
- selectExpensesList: Returns the array of fetched expenses
- selectExpensesCount: Returns the total number of expenses

**listExpenses.reducer.ts**
- listExpensesReducer: Redux reducer handling listExpenses state changes
  - Initial state: { status: 'idle', error: null, expenses: [], count: 0 }
  - Handles loading, success, and error states

**listExpenses.events.ts**
- listExpensesStart: Action dispatched when expenses fetching begins
- listExpensesSuccess: Action dispatched when expenses are fetched successfully
  - Parameters: expenses (Expense[]) - the array of expense data
- listExpensesError: Action dispatched when expenses fetching fails
  - Parameters: error (string) - error message

**listExpenses.usecase.ts**
- listExpenses: Async thunk for fetching all expenses
  - Parameters: none (or optional filters/pagination parameters)
  - Return type: Promise resolving to array of Expense entities

**listExpenses.usecase.spec.ts**
- Test suite for listExpenses use case with fake gateway

**expense.entity.ts**
- Expense: Entity representing an expense record
  - Properties: id (string), amount (number), description (string), category (string), date (string), createdAt (string)

**expenses.gateway.ts**
- ExpensesGateway: Interface for expense-related operations
  - listExpenses: Fetches all expenses
    - Parameters: none (or optional filters)
    - Return type: Promise<Expense[]>

**FakeExpenses.gateway.ts**
- FakeExpensesGateway: Mock implementation for development and testing
  - listExpenses: Simulates expenses fetching with fake data
    - Parameters: none (or optional filters)
    - Return type: Promise<Expense[]>

**Tests**
- listExpenses.usecase.spec.ts
  - should fetch expenses successfully
  - should return empty array when no expenses exist
  - should update loading states correctly
  - should dispatch correct actions in sequence
  - should handle large datasets appropriately