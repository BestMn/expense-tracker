import React from "react";
import { useSelector } from "react-redux";
import ExpensesList from "./ExpensesList";
import dataFormatter from "../../services/dataFormatter";

const ExpensesListContainer: React.FC = () => {
    const { expenses } = useSelector((state: any) => state.expensesReducer);

    const { currency } = useSelector((state: any) => state.userReducer);

    const copied = [...expenses];

    const lastExpenses = copied
        .sort((a, b) => {
            const date1 = new Date(a.date);
            const date2 = new Date(b.date);
            return date2 - date1;
        })
        .slice(0, 4)
        .map((elem) => {
            return {
                ...elem,
                date: dataFormatter(elem.date),
            };
        });

    return (
        <React.Fragment>
            <h2>Last Expenses</h2>
            <ExpensesList data={lastExpenses} currency={currency} />
            <button>Show All</button>
        </React.Fragment>
    );
};

export default ExpensesListContainer;
