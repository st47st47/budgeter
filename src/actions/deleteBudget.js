import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export function deleteBudget({ params }) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        })
        const associatedExpenses = getAllMatchingItems({
            category: "Expenses",
            key: 'budgetId',
            value: params.id
        })
        associatedExpenses.forEach((expense) => {
            deleteItem({
                key: 'Expenses',
                id: expense.id
            })
        })

        toast.success('budget deleted successfully')
    } catch (e) {
        throw new Error('there was a problem deleting your budget')
    }

    return redirect('/')

}

