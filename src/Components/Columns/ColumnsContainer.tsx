import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segmented } from "antd";
import Columns from "./Columns";
import moment from "moment";

const ColumnsPlotContainer = () => {
    const expenses = useSelector(
        (state: any) => state.expensesReducer.expenses
    );

    const allDates = expenses.map((elem) => {
        return elem.date;
    });
    const uniqueDates = Array.from(new Set(allDates));

    const preparedData = uniqueDates.map((elem) => {
        let accum = 0;
        expenses.reduce((prev, curr) => {
            if (curr.date == elem) {
                accum += curr.value;
            }
        }, accum);
        return {
            date: elem,
            value: accum,
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
            <Columns data={preparedData} />
        </React.Fragment>
    );
};

export default ColumnsPlotContainer;
