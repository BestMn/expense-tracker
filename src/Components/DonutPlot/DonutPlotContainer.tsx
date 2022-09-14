import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DonutPlot from "./DonutPlot";
import { Spin } from "antd";
import { ReactComponent as EmptyLogo } from "../../Icons/EmptyFolderIcon.svg";
import { RootState } from "../../store/store";
import { TExpense } from "../../store/reducers/expensesReducer";
import "./DonutPlot.css";

type DonutExpense = {
    amount: number;
    category: string;
    categoryId: number;
    color: string;
    type: number;
};

export type DonutPlotData = Array<DonutExpense>;

const DonutPlotContainer = () => {
    const [data, setData] = useState<DonutPlotData | null>(null);

    const { currency } = useSelector((state: RootState) => state.userReducer);

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
            const reducedExpenses: DonutPlotData = [];
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

    if (data && data.length) {
        return <DonutPlot data={data} currency={currency} />;
    } else if (expensesLoading || categoriesLoading) {
        return <Spin size="large" />;
    } else if (!data || !data.length) {
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
};

export default DonutPlotContainer;
