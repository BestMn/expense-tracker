import { Spin, Pagination } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import ExpensesTable, { TTableExpense } from "./ExpensesTable";
import dateFormatter from "../../services/dateFormatter";
import withPagination from "../../HOC/withPagination";
import { getUserCategories } from "../../store/actions/categoryActions";
import {
    deleteUserExpense,
    editUserExpense,
    EditUserExpenseData,
    getUserExpenses,
} from "../../store/actions/expenseActions";
import { RootState } from "../../store/store";

type ExpensesTableContainerProps = {
    currentPage: number;
    setCurrentPage: (value: number) => void;
};

const ExpensesTableContainer: React.FC<ExpensesTableContainerProps> = ({
    currentPage,
    setCurrentPage,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<TTableExpense[] | null>(null);

    const {
        expenses,
        loading: expensesLoading,
        shouldUpdate: shouldUpdateExpenses,
    } = useSelector((state: RootState) => state.expensesReducer);

    const {
        categories,
        loading: categoriesLoading,
        shouldUpdate: shouldUpdateCategories,
    } = useSelector((state: RootState) => state.categoriesReducer);

    const { token, userId, currency } = useSelector(
        (state: RootState) => state.userReducer
    );

    const onDelete = (id: number) => {
        dispatch(deleteUserExpense({ id, userId }));
    };

    const onEdit = (expense: EditUserExpenseData) => {
        const newExpense: EditUserExpenseData = {
            id: expense.id,
            userId: userId,
            categoryId: expense.categoryId,
            amount: expense.amount,
            date: expense.date,
            description: expense.description,
        };
        dispatch(editUserExpense(newExpense));
    };

    useEffect(() => {
        if (userId && shouldUpdateCategories) {
            dispatch(getUserCategories(userId));
        }
    }, [userId, shouldUpdateCategories]);

    useEffect(() => {
        if (userId && shouldUpdateExpenses) {
            dispatch(getUserExpenses(userId));
        }
    }, [shouldUpdateExpenses]);

    useEffect(() => {
        if (expenses && categories && !expensesLoading && !categoriesLoading) {
            // Adding category information into expense objects
            const expensesWithCategories: TTableExpense[] = expenses.map(
                (elem) => {
                    const category = categories.find(
                        (el) => elem.categoryId == el.id
                    );
                    return {
                        ...elem,
                        category: category.name,
                        icon: category.icon,
                        color: category.color,
                        date: dateFormatter(elem.date),
                    };
                }
            );

            // Adding keys for empty table rows
            if (expensesWithCategories.length % 10 !== 0) {
                let inx = 0;
                while (expensesWithCategories.length % 10 !== 0) {
                    inx++;
                    expensesWithCategories.push({ key: `empty-row-${inx}` });
                }
            }

            setData(expensesWithCategories);
        }
    }, [expenses, categories]);

    if (data && !expensesLoading && !categoriesLoading) {
        return (
            <>
                <h2>My Expenses</h2>
                <ExpensesTable
                    data={data}
                    categories={categories}
                    currency={currency}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </>
        );
    } else {
        return <Spin />;
    }
};

export default withPagination(ExpensesTableContainer);
