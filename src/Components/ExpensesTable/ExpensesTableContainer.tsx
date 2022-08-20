import { Spin, Pagination } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserCategories } from "../../store/reducers/categoriesReducer";
import {
    getUserExpenses,
    editUserExpense,
} from "../../store/reducers/expensesReducer";
import ExpensesTable from "./ExpensesTable";
import dateFormatter from "../../services/dateFormatter";

const ExpensesTableContainer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [data, setData] = useState(null);
    const [dateFilter, setDateFilter] = useState(null);

    const {
        expenses,
        loading: expensesLoading,
        count,
        shouldUpdate: shouldUpdateExpense,
    } = useSelector((state: any) => state.expensesReducer);

    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: count,
    });

    const { categories, loading: categoriesLoading } = useSelector(
        (state: any) => state.categoriesReducer
    );

    const { token, userId, currency } = useSelector(
        (state: any) => state.userReducer
    );

    useEffect(() => {
        setPagination({
            ...pagination,
            total: count,
        });
    }, [count]);

    const handlePageChange = (currentPage) => {
        setPagination({
            ...pagination,
            current: currentPage,
            total: count,
        });
    };
    const handleEdit = (id) => {};

    const handleDelete = (id) => {};

    const handleDateFilter = (date) => {
        setDateFilter(date);
    };

    useEffect(() => {
        if (token) {
            dispatch(getUserCategories(userId));
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            dispatch(
                getUserExpenses({
                    userId,
                    limit: pagination.pageSize,
                    page: pagination.current,
                    date: dateFilter,
                })
            );
        }
    }, [token, pagination, shouldUpdateExpense, dateFilter]);

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
                };
            });

            // Adding keys for empty table rows
            let inx = 0;
            while (expensesWithCategories.length < 10) {
                inx++;
                expensesWithCategories.push({ key: `empty-row-${inx}` });
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
                    pagination={pagination}
                    handlePageChange={handlePageChange}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleDateFilter={handleDateFilter}
                />
            </>
        );
    } else {
        return <Spin />;
    }
};

export default ExpensesTableContainer;
