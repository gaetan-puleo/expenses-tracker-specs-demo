**Overview**
A form state management system for creating and editing expenses with comprehensive validation, error handling, modal state management, and user experience optimization. The form handles user input, validates data locally before submission, manages submission states, and supports both create and edit modes.

**Sequence**
Modal Open › Form Mount/Pre-populate › User Input › Real-time Validation › Form Submission › API Validation › Success/Error Handling › Form Reset/Modal Close

**Flow Description**
1. Form component mounts with initial empty state and validation rules
2. For create mode: User opens modal via sidebar or floating button
3. For edit mode: User clicks edit button, form opens with pre-populated data
4. User enters/modifies data in form fields (amount, description, category, date)
5. Real-time validation occurs on field blur and form submission attempt
6. Form collects all field data and validates against business rules
7. If validation passes, form submits data to createExpense or updateExpense usecase
8. API-level validation occurs in the gateway (amount > 0, description required)
9. On success, form resets, closes modal, and expenses list refreshes
10. On error, form displays appropriate error messages and stays open
11. Loading states and modal visibility are managed throughout the process

**Related Files**
- src/features/expenses/expenseForm/expenseForm.reducer.ts
- src/features/expenses/expenseForm/expenseForm.selector.ts
- src/features/expenses/expenseForm/expenseForm.events.ts
- src/features/expenses/expenseForm/validateExpenseForm.usecase.ts
- src/features/expenses/expenseForm/validateExpenseForm.usecase.spec.ts
- src/features/shared/entities/expense.entity.ts

**Descriptions**

**expenseForm.reducer.ts**
- ExpenseFormData: Form data interface
  - Properties: amount (string), description (string), category (string), date (string)
- FormErrors: Form validation errors interface
  - Properties: amount? (string), description? (string), category? (string), date? (string), general? (string)
- ExpenseFormState: Complete form state interface
  - Properties: data (ExpenseFormData), errors (FormErrors), isSubmitting (boolean), isValid (boolean), isEditMode (boolean), editingExpenseId (string | null), isModalOpen (boolean)
- expenseFormReducer: Redux reducer handling form state changes
  - Initial state: { data: { amount: '', description: '', category: '', date: '' }, errors: {}, isSubmitting: false, isValid: false, isEditMode: false, editingExpenseId: null, isModalOpen: false }
  - Handles field updates, validation results, submission states, edit mode, and modal visibility

**expenseForm.selector.ts**
- selectExpenseFormData: Returns current form field values
- selectExpenseFormErrors: Returns validation errors for each field
- selectExpenseFormIsValid: Returns overall form validity status
- selectExpenseFormIsSubmitting: Returns form submission status
- selectExpenseFormFieldError: Returns error for specific field
  - Parameters: fieldName (string) - name of the field
- selectIsEditMode: Returns whether form is in edit mode
- selectEditingExpenseId: Returns ID of expense being edited (null if creating)
- selectFormMode: Returns 'edit' or 'create' based on current mode
- selectExpenseModalOpen: Returns whether expense modal is open

**expenseForm.events.ts**
- updateExpenseFormField: Action to update individual form field
  - Parameters: field (string), value (string) - field name and new value
- setExpenseFormErrors: Action to set validation errors
  - Parameters: errors (FormErrors) - object with field-specific errors
- setExpenseFormSubmitting: Action to set submission status
  - Parameters: isSubmitting (boolean) - submission state
- resetExpenseForm: Action to reset form to initial state
- setEditMode: Action to put form in edit mode with expense data
  - Parameters: expense (Expense) - expense to edit
- clearEditMode: Action to exit edit mode and reset form
- openExpenseModal: Action to open the expense form modal
- closeExpenseModal: Action to close the expense form modal

**validateExpenseForm.usecase.ts**
- validateExpenseForm: Use case for form validation logic
  - Parameters: none (reads form data from state)
  - Return type: void (dispatches validation results)
  - Contains all validation logic for amount, description, category, and date fields
  - Validates current form data and updates error state through Redux actions

**validateExpenseForm.usecase.spec.ts**
- Test suite for validateExpenseForm use case following project rules
- Tests validation with invalid data and error setting
- Tests validation with valid data and error clearing
- Tests all individual field validation scenarios
- Tests edge cases for each field type

**expense.entity.ts**
- Expense: Entity representing an expense record
  - Properties: id (string), amount (number), description (string), category (string), date (string), createdAt (string)
- EXPENSE_CATEGORIES: Constant array of available expense categories
- ExpenseCategory: Type representing valid expense category values

**Validation Rules**

**Amount Field**
- Required: Must not be empty
- Numeric: Must be a valid number
- Positive: Must be greater than 0
- Format: Up to 2 decimal places
- Maximum: Cannot exceed $10,000 per transaction

**Description Field**
- Required: Must not be empty
- Length: Minimum 3 characters, maximum 100 characters
- Content: No special characters except basic punctuation

**Category Field**
- Required: Must select a category
- Predefined: Must be one of: Food, Transportation, Health, Entertainment, Shopping, Bills, Other

**Date Field**
- Required: Must not be empty
- Format: Must be valid date (YYYY-MM-DD)
- Range: Cannot be future date, cannot be older than 1 year

**Form Behavior**

**Real-time Validation**
- Validates on field blur (when user leaves field)
- Shows error immediately below each field
- Updates form validity status
- Prevents submission if any errors exist

**Submission Process**
- Disables submit button during submission
- Shows loading indicator
- Handles API validation errors
- Displays success message on completion
- Resets form after successful submission

**Error Handling**
- Field-level errors displayed inline
- API errors displayed at form level
- Network errors handled gracefully
- Form remains open on error for correction

**Tests**
- validateExpenseForm.usecase.spec.ts
  - should validate form with invalid data and set errors correctly
  - should validate form with valid data and clear errors
  - should validate required fields correctly
  - should validate amount edge cases
  - should validate description constraints
  - should validate date constraints
  - should validate category selection