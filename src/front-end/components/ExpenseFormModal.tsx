import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/init-store'
import { createExpense } from '../../features/expenses/createExpense/createExpense.usecase'
import { updateExpense } from '../../features/expenses/updateExpense/updateExpense.usecase'
import { listExpenses } from '../../features/expenses/listExpenses/listExpenses.usecase'
import {
  selectExpenseFormData,
  selectExpenseFormErrors,
  selectExpenseFormIsValid,
  selectExpenseFormIsSubmitting,
  selectIsEditMode,
  selectEditingExpenseId,
  selectExpenseModalOpen
} from '../../features/expenses/expenseForm/expenseForm.selector'
import {
  updateExpenseFormField,
  setExpenseFormSubmitting,
  clearEditMode,
  closeExpenseModal
} from '../../features/expenses/expenseForm/expenseForm.events'
import { validateExpenseForm } from '../../features/expenses/expenseForm/validateExpenseForm.usecase'
import { EXPENSE_CATEGORIES } from '../../features/shared/entities/expense.entity'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectValue } from './ui/select'

export function ExpenseFormModal() {
  const dispatch = useDispatch<AppDispatch>()
  
  const formData = useSelector(selectExpenseFormData)
  const errors = useSelector(selectExpenseFormErrors)
  const isValid = useSelector(selectExpenseFormIsValid)
  const isSubmitting = useSelector(selectExpenseFormIsSubmitting)
  const isEditMode = useSelector(selectIsEditMode)
  const editingExpenseId = useSelector(selectEditingExpenseId)
  const isModalOpen = useSelector(selectExpenseModalOpen)

  const handleFieldChange = (field: string, value: string) => {
    dispatch(updateExpenseFormField({ field, value }))
  }

  const handleFieldBlur = () => {
    dispatch(validateExpenseForm())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    dispatch(validateExpenseForm())
    
    if (!isValid) return

    dispatch(setExpenseFormSubmitting(true))
    
    try {
      if (isEditMode && editingExpenseId) {
        await dispatch(updateExpense({
          id: editingExpenseId,
          amount: parseFloat(formData.amount),
          description: formData.description,
          category: formData.category,
          date: formData.date
        }))
      } else {
        await dispatch(createExpense({
          amount: parseFloat(formData.amount),
          description: formData.description,
          category: formData.category,
          date: formData.date
        }))
      }
      
      dispatch(clearEditMode())
      dispatch(listExpenses()) // Refresh the expenses list
      dispatch(closeExpenseModal())
    } catch {
      // Error handling is done in the usecase
    } finally {
      dispatch(setExpenseFormSubmitting(false))
    }
  }

  const handleClose = () => {
    dispatch(clearEditMode())
    dispatch(closeExpenseModal())
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Update the details of your expense below.' : 'Enter the details of your expense below.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleFieldChange('amount', e.target.value)}
              onBlur={handleFieldBlur}
            />
            {errors.amount && (
              <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Input
              id="description"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              onBlur={handleFieldBlur}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleFieldChange('category', value)}
            >
              <SelectContent>
                <SelectValue placeholder="Select a category" />
                {EXPENSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleFieldChange('date', e.target.value)}
              onBlur={handleFieldBlur}
            />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date}</p>
            )}
          </div>

          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Expense' : 'Add Expense')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}