import { Spin, Pagination } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserCategories } from "../../store/reducers/categoriesReducer";
import {
    getUserExpenses,
    deleteUserExpense,
} from "../../store/reducers/expensesReducer";
import ExpensesTable from "./ExpensesTable";
import dateFormatter from "../../services/dateFormatter";
import withPagination from "../../HOC/withPagination";

const ExpensesTableContainer = ({ currentPage, setCurrentPage }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState(null);
    const [dateFilter, setDateFilter] = useState(null);

    const {
        expenses,
        loading: expensesLoading,
        shouldUpdate: shouldUpdateExpenses,
    } = useSelector((state: any) => state.expensesReducer);

    const {
        categories,
        loading: categoriesLoading,
        shouldUpdate: shouldUpdateCategories,
    } = useSelector((state: any) => state.categoriesReducer);

    const { token, userId, currency } = useSelector(
        (state: any) => state.userReducer
    );

    const handleDelete = (id) => {
        dispatch(deleteUserExpense({ id, userId }));
    };

    useEffect(() => {
        if (token && shouldUpdateCategories === true) {
            dispatch(getUserCategories(userId));
        }
    }, [token, shouldUpdateCategories]);

    useEffect(() => {
        if (token && shouldUpdateExpenses === true) {
            dispatch(
                getUserExpenses({
                    userId,
                })
            );
        }
    }, [token, shouldUpdateExpenses]);

    useEffect(() => {
        if (expenses && categories) {
            // Adding category information into expense objects
            const expensesWithCategories = expenses.map((elem) => {
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
            });

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
                <ExpensesTable
                    data={data}
                    currency={currency}
                    handleDelete={handleDelete}
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
