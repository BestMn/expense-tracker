import { Spin, message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import ExpensesTable, { TTableExpense } from "./ExpensesTable";
import dateFormatter from "../../services/dateFormatter";
import withPagination from "../../HOC/withPagination";
import {
    deleteUserExpense,
    editUserExpense,
    EditUserExpenseData,
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

    const { expenses, loading: expensesLoading } = useSelector(
        (state: RootState) => state.expensesReducer
    );

    const { categories, loading: categoriesLoading } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

    const {
        userId,
        currency,
        loading: userLoading,
    } = useSelector((state: RootState) => state.userReducer);

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
        dispatch(editUserExpense(newExpense))
            .unwrap()
            .catch((rejectedValue) => {
                message.error(rejectedValue.message);
            });
    };

    useEffect(() => {
        if (expenses && categories) {
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

    if (userLoading || !data) {
        return <Spin />;
    }

    return (
        <ExpensesTable
            data={data}
            categories={categories}
            currency={currency}
            onDelete={onDelete}
            onEdit={onEdit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            loading={expensesLoading}
        />
    );
};

export default withPagination(ExpensesTableContainer);
