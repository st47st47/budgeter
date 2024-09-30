import { PlusCircleIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher()

  const formRef = useRef()
  const focusRef = useRef()

  const isSubmitting = fetcher.state === 'submitting'

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()

    }
  })

  return (
    <div className='form-wrapper'>
      <h2 className='h3'>Add new{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map(
            (budg) => budg.name
          )}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method='post' className='grid-sm' ref={formRef}>
        <div className="expense-inputs">

          <div className="grid-xs">
            <label htmlFor="newExpense">Expense name</label>
            <input type="text" name="newExpense" id="newExpense" placeholder='e.g., Coffee' ref={focusRef} required />
          </div>

          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input type="number" step='0.01' name="newExpenseAmount" id="newExpenseAmount" inputMode='decimal' placeholder='e.g., $3.50' required />
          </div>

          <div className="grid-xs" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Budget category</label>
            <select name="newExpenseBudget" id="newExpenseBudget" required>
              {
                budgets
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((budget) => {
                    return (
                      <option key={budget.id} value={budget.id}>{budget.name}</option>
                    )
                  })
              }
            </select>
          </div>
        </div>

        <input type="hidden" name="_action" value='createExpense' />
        <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting....</span> : (
              <>
                <span>Add expense</span>
                <PlusCircleIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm


