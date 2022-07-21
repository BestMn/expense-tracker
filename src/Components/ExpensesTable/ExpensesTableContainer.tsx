import { Spin, Pagination } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExpensesTable from "./ExpensesTable";
import dateFormatter from "../../services/dateFormatter";

const ExpensesTableContainer = () => {
    const [data, setData] = useState(null);

    const { expenses, loading: expensesLoading } = useSelector(
        (state: any) => state.expensesReducer
    );

    const { categories, loading: categoriesLoading } = useSelector(
        (state: any) => state.categoriesReducer
    );

    const { currency } = useSelector((state: any) => state.userReducer);

    const pageSize = 10;

    useEffect(() => {
        if (expenses && categories) {
            const copied = [...expenses];
            const expensesWithCategories = copied.map((elem) => {
                const category = categories.find(
                    (el) => elem.categoryId == el.id
                );
                return {
                    ...elem,
                    category: category.name,
                    icon: category.icon,
                    color: category.color,
                };
            });
            const lastExpenses = expensesWithCategories
                .sort((a, b) => {
                    const date1 = new Date(a.date);
                    const date2 = new Date(b.date);
                    return date2 - date1;
                })
                .map((elem) => {
                    return {
                        ...elem,
                        date: dateFormatter(elem.date),
                    };
                });
            setData(lastExpenses);
        }
    }, [expenses, categories]);

    if (data) {
        return (
            <>
                <ExpensesTable
                    data={data}
                    currency={currency}
                    loading={expensesLoading}
                />
            </>
        );
    } else {
        return <Spin />;
    }
};

export default ExpensesTableContainer;
