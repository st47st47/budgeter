import { useLoaderData } from "react-router-dom"
import { createExpense, deleteItem, editItem, getAllMatchingItems } from "../helpers"
import BudgetItem from "../components/BudgetItem"
import AddExpenseForm from "../components/AddExpenseForm"
import Table from "../components/Table"
import { toast } from "react-toastify"

export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0]

    const expenses = await getAllMatchingItems({
        category: "Expenses",
        key: "budgetId",
        value: params.id
    })

    if (!budget) {
        throw new Error('The budget youre trying to find doesnt exist.')
    }

    return { budget, expenses }
}

export async function budgetAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action == 'createExpense') {
        try {
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget })
            return toast.success(`Expense ${values.newExpense} created!`)
        }
        catch {
            throw new Error("There was a problem creating your expense")
        }
    }

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "Expenses",
                id: values.expenseId,
            });
            console.log('expensepage ran')
            return toast.success("Expense deleted!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
    }

    if (_action === 'editExpense') {
        try {
            console.log('starting now')
            editItem({ key: "Expenses", id: values.expenseId, newnaam: values.newname, newcost: values.newamount })
            console.log('edit sucksex wohoo')
            return toast.success('Expense edited')
        }
        catch (e) {
            throw new Error('sorry there was a problem editing your expense')
        }
    }

}

const BudgetPage = () => {

    const { budget, expenses } = useLoaderData()

    return (
        <div className="grid-lg" style={{ "--accent": budget.color }}>
            <h1 className="h2">
                <span className="accent">{budget.name} </span>
                Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name}</span>
                            Expenses
                        </h2>
                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 100)} expenses2={expenses.sort((a, b) => b.amount - a.amount)} />
                    </div>
                )
            }
        </div>

    )
}

export default BudgetPage