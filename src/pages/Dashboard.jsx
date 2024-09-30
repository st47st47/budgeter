import { Link, useLoaderData } from "react-router-dom"
import { createBudget, createExpense, deleteItem, editItem, fetchData, waait } from "../helpers"
import Intro from "../components/Intro"
import { toast } from "react-toastify"
import AddBudgetForm from "../components/AddBudgetForm"
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem"
import Table from "../components/Table"

export function dashboardLoader() {
    const userName = fetchData("userName")
    const budgets = fetchData("budgets")
    const expenses = fetchData("Expenses")
    return { userName, budgets, expenses }
}

export async function dashboardAction({ request }) {

    await waait()

    const data = await request.formData();

    const { _action, ...values } = Object.fromEntries(data)

    if (_action == 'newUser') {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        }
        catch (e) {
            throw new Error("There was a problem creating your account meng")
        }
    }

    if (_action == 'createBudget') {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })

            return toast.success('budget was created!')
        }
        catch {
            throw new Error("There was a problem creating your budget")
        }
    }

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
            console.log('dashboard ran')
            return toast.success("Expense deleted!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
    }

    if (_action === 'editExpense') {
        try {
            console.log(values.expenseId)
            editItem({ key: "Expenses", id: values.expenseId, newnaam: values.newname, newcost: values.newamount })
            return toast.success('Expense edited')
        }
        catch (e) {
            throw new Error('sorry there was a problem editing your expense')
        }
    }

}

const Dashboard = () => {

    const { userName, budgets, expenses } = useLoaderData()

    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        {
                            budgets && budgets.length > 0 ?
                                (<div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddExpenseForm budgets={budgets} />
                                    </div>
                                    <h2>Existing budgets</h2>
                                    <div className="budgets">
                                        {
                                            budgets.map((budget) => (
                                                <BudgetItem key={budget.id} budget={budget} />
                                            ))
                                        }
                                    </div>

                                    {
                                        expenses && expenses.length > 0 && (
                                            <div className="grid-md">
                                                <h2>Recent expenses</h2>
                                                <Table expenses={
                                                    expenses
                                                        .sort((a, b) => b.createdAt - a.createdAt)
                                                        .slice(0, 5)
                                                }
                                                    expenses2={
                                                        expenses
                                                            .sort((a, b) => b.amount - a.amount)
                                                            .slice(0, 5)
                                                    }
                                                />
                                                {expenses.length > 0 && (
                                                    <Link to='expenses' className="btn btn--dark">
                                                        View all expenses.
                                                    </Link>
                                                )}
                                            </div>
                                        )
                                    }

                                </div>) :
                                (
                                    <div className="grid-sm">
                                        <p>Personal budgeting is the secret to financial freedom.</p>
                                        <p>Create a budget to get started.</p>
                                        <AddBudgetForm />
                                    </div>
                                )
                        }

                    </div>
                </div>
            ) : (<Intro />)}
        </>
    )
}

export default Dashboard