import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segmented } from "antd";
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

    return (
        <React.Fragment>
            <Segmented
                options={["Weekly", "Monthly", "Quarterly", "Yearly"]}
                defaultValue={"Weekly"}
                onChange={(value) => {
                    console.log(value);
                }}
            />
            <Columns data={data} />
        </React.Fragment>
    );
};

export default ColumnsPlotContainer;
