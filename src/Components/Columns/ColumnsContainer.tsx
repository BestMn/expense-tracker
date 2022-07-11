import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segmented } from "antd";
import "./ColumnsContainer.css";
import Columns from "./Columns";
import LineColumn from "./Line";
import dataFormatter from "../../services/dataFormatter";

const ColumnsPlotContainer = () => {
    const [period, setPeriod] = useState(7);

    const expenses = useSelector(
        (state: any) => state.expensesReducer.expenses
    );

    const allDates = [...Array(period)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toJSON().slice(0, 10);
    });

    const preparedData = allDates.map((elem) => {
        let accum = 0;
        expenses.reduce((_, curr) => {
            if (curr.date.slice(0, 10) == elem) {
                accum += curr.value;
            }
        }, accum);
        return {
            date: elem,
            value: accum,
        };
    });

    const segment = (period) => {
        const d = new Date();
        switch (period) {
            case "Weekly":
                setPeriod(7);
                break;
            case "Monthly":
                setPeriod(30);
                break;
            case "Quarterly":
                setPeriod(90);
                break;
            case "Yearly":
                setPeriod(365);
                break;
            default:
                setPeriod(7);
        }
    };

    return (
        <React.Fragment>
            <Segmented
                options={["Weekly", "Monthly", "Quarterly", "Yearly"]}
                defaultValue={"Weekly"}
                onChange={(value) => {
                    segment(value);
                }}
                className={"segmented"}
            />
            {period < 91 ? (
                <Columns data={preparedData} />
            ) : (
                <LineColumn data={preparedData} />
            )}
        </React.Fragment>
    );
};

export default ColumnsPlotContainer;
