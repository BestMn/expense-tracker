import { Spin, Pagination } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserCategories } from "../../store/reducers/categoriesReducer";
import { getUserExpenses } from "../../store/reducers/expensesReducer";
import ExpensesTable from "./ExpensesTable";
import dateFormatter from "../../services/dateFormatter";

const ExpensesTableContainer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [data, setData] = useState(null);

    const {
        expenses,
        loading: expensesLoading,
        count,
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

    const handlePageChange = (currentPage) => {
        setPagination({ ...pagination, current: currentPage, total: count });
    };

    useEffect(() => {
        if (token) {
            dispatch(getUserCategories(userId));
            dispatch(
                getUserExpenses({
                    userId,
                    limit: pagination.pageSize,
                    page: pagination.current,
                })
            );
        }
    }, [token, pagination]);

    useEffect(() => {
        if (expenses && categories) {
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
            setData(expensesWithCategories);
        }
    }, [expenses, categories]);

    if (data) {
        return (
            <>
                <ExpensesTable
                    data={data}
                    currency={currency}
                    loading={expensesLoading}
                    pagination={pagination}
                    handlePageChange={handlePageChange}
                />
            </>
        );
    } else {
        return <Spin />;
    }
};

export default ExpensesTableContainer;
