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

    const data = expenses.map((el) => {
        const color = categories.find((elem) => elem.id === el.categoryId);
        return { color: color.color, value: el.value, type: el.id };
    });

    console.log(data);

    return <DonutPlot data={data} />;
};

export default DonutPlotContainer;
