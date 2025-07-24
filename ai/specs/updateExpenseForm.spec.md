**Overview**
A feature that extends the existing expense form functionality to support editing existing expenses. The form modal supports both create and edit modes through Redux state management, with the ability to pre-populate form fields with existing expense data and handle the update workflow. Modal visibility and form state are managed entirely through Redux actions.

**Sequence**
User Clicks Edit › Dispatch setEditMode › Modal Opens with Pre-populated Form › User Edits › Validation › Submit Update › Gateway Call › Success/Error Handling › Modal Close via Redux › List Refresh

**Flow Description**
1. User clicks edit button (pencil icon) on an expense item in the dashboard table
2. Dashboard dispatches setEditMode action with the expense data
3. Redux state updates: isEditMode=true, isModalOpen=true, form fields populated with expense data
4. ExpenseFormModal automatically opens and displays pre-populated form in edit mode
5. User modifies expense details (amount, description, category, date) as needed
6. Real-time validation runs on field changes, showing errors if any
7. User submits the form by clicking "Update Expense" button
8. Form validation ensures all fields are valid before submission
9. updateExpense usecase is dispatched with UpdateExpenseInput containing id and form data
10. Backend gateway processes the update request
11. On success, closeExpenseModal and clearEditMode actions are dispatched, expense list refreshes
12. On error, error message is displayed in the modal without closing it
13. Loading states are managed throughout the process via Redux

**Related Files**
- src/front-end/components/ExpenseFormModal.tsx
- src/front-end/pages/Dashboard.tsx
- src/features/expenses/expenseForm/expenseForm.events.ts
- src/features/expenses/expenseForm/expenseForm.reducer.ts
- src/features/expenses/expenseForm/expenseForm.selector.ts
- src/features/expenses/updateExpense/updateExpense.usecase.ts
- src/features/expenses/updateExpense/updateExpense.selector.ts
- src/features/expenses/listExpenses/listExpenses.usecase.ts

**Descriptions**

**ExpenseFormModal.tsx**
- Enhanced modal component using Redux state for both create and edit modes
- No props required - reads all state from Redux store
- Uses selectExpenseModalOpen to control modal visibility
- Uses selectIsEditMode to determine form mode and display
- handleSubmit: Submission handler that calls either createExpense or updateExpense based on isEditMode
- Modal title and button text: Dynamic based on Redux state ("Add New Expense" vs "Edit Expense")
- handleClose: Dispatches clearEditMode and closeExpenseModal actions

**Dashboard.tsx**
- Updated expense table with edit functionality in Actions column
- handleEditExpense: Function that dispatches setEditMode action
  - Parameters: expense (Expense) - the expense to edit
  - Behavior: Automatically opens modal in edit mode with pre-populated data
- Edit button: Pencil icon button with hover effects (blue background)
- Enhanced table layout with Actions column containing both edit and delete buttons

**expenseForm.events.ts**
- setEditMode: Action to set form in edit mode and populate form fields
  - Parameters: expense (Expense) - the expense being edited
  - Behavior: Sets isEditMode=true, isModalOpen=true, populates form data
- clearEditMode: Action to clear edit mode and reset form
- openExpenseModal: Action to open the expense modal
- closeExpenseModal: Action to close the expense modal

**expenseForm.reducer.ts**
- Enhanced reducer with edit mode and modal state support
- State properties include:
  - isEditMode: boolean - indicates if form is in edit mode
  - editingExpenseId: string | null - ID of expense being edited
  - isModalOpen: boolean - controls modal visibility
- setEditMode: Sets edit mode state, opens modal, and populates form fields with expense data
- clearEditMode: Resets edit mode and clears form data
- openExpenseModal: Sets isModalOpen to true
- closeExpenseModal: Sets isModalOpen to false

**expenseForm.selector.ts**
- selectIsEditMode: Returns whether form is in edit mode
- selectEditingExpenseId: Returns ID of expense being edited
- selectFormMode: Returns current form mode ('create' | 'edit')
- selectExpenseModalOpen: Returns whether expense modal is open

**updateExpense.usecase.ts**
- Existing updateExpense usecase (already implemented)
- Used by the form modal when in edit mode

**updateExpense.selector.ts**
- Existing selectors for update status and errors (already implemented)
- Used by the form modal to show update-specific loading states and errors

**listExpenses.usecase.ts**
- Existing usecase for refreshing expense list (already implemented)
- Called after successful expense update to refresh the display

**Tests**
- Enhanced ExpenseFormModal component tests
  - should render in create mode by default
  - should switch to edit mode when editing expense is provided
  - should pre-populate form fields with expense data in edit mode
  - should display correct title and button text for each mode
  - should call updateExpense usecase when submitting in edit mode
  - should call createExpense usecase when submitting in create mode
  - should clear edit mode when modal closes
  - should handle validation errors in both modes
- Dashboard component tests
  - should render edit buttons for each expense item
  - should trigger edit mode when edit button is clicked
  - should open modal in edit mode with correct expense data