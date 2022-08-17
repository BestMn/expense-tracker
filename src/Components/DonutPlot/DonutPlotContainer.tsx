import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DonutPlot from "./DonutPlot";
import { Spin, Empty } from "antd";

const DonutPlotContainer = () => {
    const [data, setData] = useState(null);

    const { currency } = useSelector((state: any) => state.userReducer);

    const {
        expenses,
        loading: expensesLoading,
        error,
    } = useSelector((state: any) => state.expensesReducer);

    const { categories, loading: categoriesLoading } = useSelector(
        (state: any) => state.categoriesReducer
    );

    useEffect(() => {
        if (categories && expenses && categories?.length > 0) {
            const todayExpenses = expenses.filter(
                (elem) =>
                    elem.date.slice(0, 10) == new Date().toJSON().slice(0, 10)
            );
            const donutData = todayExpenses.map((el) => {
                const category = categories.find(
                    (elem) => elem.id == el.categoryId
                );
                return {
                    color: category.color,
                    amount: el.amount,
                    type: el.id,
                    categoryId: el.categoryId,
                    category: category.name,
                };
            });
            const reducedExpenses = [];
            donutData.forEach((elem) => {
                const existedCategoryIndex = reducedExpenses.findIndex(
                    (el) => el.categoryId == elem.categoryId
                );
                if (existedCategoryIndex >= 0) {
                    reducedExpenses[existedCategoryIndex].amount += elem.amount;
                } else {
                    reducedExpenses.push(elem);
                }
            });
            setData(reducedExpenses);
        }
    }, [expenses, categories]);

    if (data && data.length) {
        return <DonutPlot data={data} currency={currency} />;
    } else if (expensesLoading || categoriesLoading) {
        return <Spin size="large" />;
    } else if (!data || !data.length) {
        return <Empty description={"No expenses today"}></Empty>;
    }
};

export default DonutPlotContainer;
