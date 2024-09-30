import { useEffect, useState } from "react"
import ExpenseItem from "./ExpenseItem"
import { ArrowDownIcon } from "@heroicons/react/16/solid"

const Table = ({ expenses, showBudget = true, expenses2 }) => {

    const [priceIsSorted, setPriceIsSorted] = useState(true)
    const [finalExpenses, setFinalExpenses] = useState(expenses)

    useEffect(() => {
        if (priceIsSorted) { setFinalExpenses(expenses) }
        else { setFinalExpenses(expenses2) }
    })


    const priceSort = () => {
        setPriceIsSorted(!priceIsSorted)
    }


    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ['Name', <span>Amount <button onClick={priceSort}><ArrowDownIcon width={20} /></button> </span>, "Date", showBudget ? "Budget" : "",].map((i, index) => (<th key={index}>{i}</th>))
                        }
                    </tr>
                </thead>
                <tbody>
                    {finalExpenses.map((expense) => (
                        <tr key={expense.id}>
                            <ExpenseItem expense={expense} showBudget={showBudget} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table