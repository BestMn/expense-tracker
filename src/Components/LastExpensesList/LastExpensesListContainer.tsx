import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LastExpensesList, { LastExpensesListItem } from "./LastExpensesList";
import dateFormatter from "../../services/dateFormatter";
import { ReactComponent as EmptyLogo } from "../../Icons/EmptyFolderIcon.svg";
import { Skeleton, Spin } from "antd";
import { RootState } from "../../store/store";

const LastExpensesListContainer: React.FC = () => {
    const [data, setData] = useState<LastExpensesListItem[] | null>(null);

    const { expenses, loading: expensesLoading } = useSelector(
        (state: RootState) => state.expensesReducer
    );

    const { categories, loading: categoriesLoading } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

    const { currency } = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        if (expenses && categories && !expensesLoading && !categoriesLoading) {
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
                .slice(0, 4)
                .map((elem) => {
                    return {
                        ...elem,
                        date: dateFormatter(elem.date),
                    };
                });
            if (lastExpenses.length < 4) {
                let inx = 0;
                while (lastExpenses.length < 4) {
                    inx++;
                    lastExpenses.push({ key: `empty-row-${inx}` });
                }
            }
            setData(lastExpenses);
        }
    }, [expenses, categories]);

    if (expensesLoading || categoriesLoading) {
        return <Skeleton />;
    }

    if (data && !data?.length) {
        return (
            <>
                <h2>Last Expenses</h2>
                <EmptyLogo
                    viewBox="0 0 300 240"
                    width="340px"
                    height="240px"
                    fill="rgba(0, 0, 0, 0.06)"
                />
            </>
        );
    }

    if (data && data?.length) {
        return (
            <React.Fragment>
                <h2>Last Expenses</h2>
                <LastExpensesList
                    data={data}
                    currency={currency}
                    loading={expensesLoading}
                />
            </React.Fragment>
        );
    }
};

export default LastExpensesListContainer;
