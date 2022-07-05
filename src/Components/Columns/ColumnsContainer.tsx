import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Columns from "./Columns";

const ColumnsPlotContainer = () => {
    const expenses = useSelector(
        (state: any) => state.expensesReducer.expenses
    );

    const categories = useSelector(
        (state: any) => state.categoriesReducer.categories
    );

    const data = expenses.map((el) => {
        const color = categories.find((elem) => elem.id === el.categoryId);
        return {
            color: color.color,
            value: el.value,
            type: el.id,
            date: el.date.toISOString().slice(0, 10),
        };
    });

    return <Columns data={data} />;
};

export default ColumnsPlotContainer;
