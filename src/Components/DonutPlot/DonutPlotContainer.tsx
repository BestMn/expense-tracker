import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DonutPlot from "./DonutPlot";
import { Spin } from "antd";
import { ReactComponent as EmptyLogo } from "../../Icons/EmptyFolderIcon.svg";
import { RootState } from "../../store/store";
import { TExpense } from "../../store/reducers/expensesReducer";
import "./DonutPlot.css";

export type DonutExpense = {
    amount: number;
    category: string;
    categoryId: number;
    color: string;
    type: number;
};

const DonutPlotContainer = () => {
    const [data, setData] = useState<DonutExpense[] | null>(null);

    const { currency, loading: userLoading } = useSelector(
        (state: RootState) => state.userReducer
    );

    const { expenses, loading: expensesLoading } = useSelector(
        (state: RootState) => state.expensesReducer
    );

    const { categories, loading: categoriesLoading } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

    useEffect(() => {
        if (expenses?.length) {
            const todayExpenses = expenses.filter(
                (elem: TExpense) =>
                    elem.date.slice(0, 10) == new Date().toJSON().slice(0, 10)
            );
            const donutData = todayExpenses.map((el: TExpense) => {
                const category = categories.find(
                    (elem: TExpense) => elem.id == el.categoryId
                );
                return {
                    color: category.color,
                    amount: el.amount,
                    type: el.id,
                    categoryId: el.categoryId,
                    category: category.name,
                };
            });
            const reducedExpenses: DonutExpense[] = [];
            donutData.forEach((elem: DonutExpense) => {
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

    if (expensesLoading || categoriesLoading || userLoading) {
        return <Spin size="large" />;
    }

    if (!data || !data.length) {
        return (
            <div className="donut-plot__empty-container">
                <EmptyLogo
                    viewBox="0 0 300 240"
                    width="340px"
                    height="240px"
                    fill="rgba(0, 0, 0, 0.06)"
                />
                <span className="donut-plot__empty-description">
                    No expenses today
                </span>
            </div>
        );
    }

    return <DonutPlot data={data} currency={currency} />;
};

export default DonutPlotContainer;
