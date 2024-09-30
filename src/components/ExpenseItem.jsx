import { useState, useEffect, useRef } from "react";
import { TrashIcon } from "@heroicons/react/16/solid";
import { formatCurrency, formateDateToLocalString, getAllMatchingItems } from "../helpers";
import { Link, useFetcher } from "react-router-dom";

const ExpenseItem = ({ expense, showBudget }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        const modal = modalRef.current;

        if (modalOpen) {
            modal.show();
        } else {
            modal.close();
        }

    }, [modalOpen]);

    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })[0];

    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formateDateToLocalString(expense.createdAt)}</td>
            {showBudget && (
                <td>
                    <Link to={`/budget/${budget.id}`} style={{ "--accent": budget.color }}>{budget.name}</Link>
                </td>
            )}
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value='deleteExpense' />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button type="submit" className="btn btn--warning" aria-label={`delete ${expense.name} expense`}>
                        <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
            </td>

            <td>
                <button className="btn" onClick={toggleModal}>Edit</button>
                <dialog ref={modalRef} id={`modal-${expense.id}`} className="modalstyle">
                    <fetcher.Form method="post">
                        <input type="hidden" name="_action" value='editExpense' />
                        <input type="hidden" name="expenseId" value={expense.id} />
                        <input type="text" name="newname" placeholder="new name...." />
                        <input type="number" name="newamount" placeholder="new value...." />
                        <button type="submit" onClick={toggleModal}>Submit</button>
                    </fetcher.Form>
                </dialog>
            </td>
        </>
    );
};

export default ExpenseItem;
