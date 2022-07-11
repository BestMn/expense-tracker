import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DonutPlot from "./DonutPlot";

const DonutPlotContainer = () => {
    const expenses = useSelector(
        (state: any) => state.expensesReducer.expenses
    );

    const categories = useSelector(
        (state: any) => state.categoriesReducer.categories
    );

    const todayExpenses = expenses.filter(
        (elem) => elem.date.slice(0, 10) == new Date().toJSON().slice(0, 10)
    );

    const data = todayExpenses.map((el) => {
        const color = categories.find((elem) => elem.id === el.categoryId);
        return { color: color.color, value: el.value, type: el.id };
    });

    return <DonutPlot data={data} />;
};

export default DonutPlotContainer;
