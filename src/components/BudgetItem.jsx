import { Form, Link } from "react-router-dom"
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers"
import { BanknotesIcon, TrashIcon } from "@heroicons/react/16/solid"

const BudgetItem = ({ budget, showDelete = false }) => {
    const { id, name, amount, color } = budget
    const spent = calculateSpentByBudget(id)


    return (
        <div className="budget" style={{ "--accent": color }}>
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>

            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>

            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            {
                showDelete ? (
                    <div className="flex-sm">
                        <Form
                            method="post"
                            action="delete"
                            onSubmit={(e) => {
                                if (!confirm('are u sure u want to permanently delete this budget?')) {
                                    e.preventDefault()
                                }
                            }}
                        >
                            <button type="submit" className="btn">
                                <span>delete budget</span>
                                <TrashIcon width={20} />
                            </button>
                        </Form>
                    </div>
                ) : (
                    <div className="flex-sm">
                        <Link
                            to={`/budget/${id}`}
                            className="btn"
                        >
                            <span>View details</span>
                            <BanknotesIcon width={20} />
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default BudgetItem