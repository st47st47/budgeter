import { useLoaderData } from "react-router-dom"
import { deleteItem, editItem, fetchData } from "../helpers"
import Table from "../components/Table"
import { toast } from "react-toastify"

export async function expensesLoader() {
    const expenses = fetchData("Expenses")
    return { expenses }
}

export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

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

const ExpensesPage = () => {

    const { expenses } = useLoaderData()

    return (
        <div className="grid-lg">
            <h1>All expenses</h1>
            {
                expenses && expenses.length > 0 ?
                    (
                        <div className="grid-md">
                            <h2>Recent expenses <small>({expenses.length} total)</small></h2>
                            <Table expenses={
                                expenses
                                    .sort((a, b) => b.createdAt - a.createdAt)
                                    .slice(0, 100)
                            }
                                expenses2={
                                    expenses
                                        .sort((a, b) => b.amount - a.amount)

                                }
                            />
                        </div>
                    ) :
                    <p>No expenses to show</p>
            }
        </div>
    )
}

export default ExpensesPage