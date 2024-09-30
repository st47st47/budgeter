export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800))

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? []
    return data.filter((item) => item[key] === value)
}

export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key)
}

export const editItem = ({ key, id, newnaam, newcost }) => {
    const expensesList = fetchData(key);
    const wantedItem = expensesList.find((eachexpense) => eachexpense.id === id);
    const editedItem = {
        id: wantedItem.id,
        name: newnaam,
        createdAt: wantedItem.createdAt,
        amount: +newcost,
        budgetId: wantedItem.budgetId
    }
    const newData = expensesList.filter((item) => item.id !== wantedItem.id)

    return localStorage.setItem('Expenses', JSON.stringify([...newData, editedItem]))

}

export const createBudget = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()

    }

    const existingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newItem]))
}

export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }

    const existingExpenses = fetchData("Expenses") ?? []
    return localStorage.setItem('Expenses', JSON.stringify([...existingExpenses, newItem]))
}

export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("Expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc
        return acc += expense.amount
    }, 0)
    return budgetSpent
}

export const formateDateToLocalString = (epoch) =>
    new Date(epoch).toLocaleDateString()

export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: 'percent',
        minimumFractiondigits: 0
    })
}

export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}