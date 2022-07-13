import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segmented, Spin } from "antd";
import "./ColumnsContainer.css";
import Columns from "./Columns";
import LineColumn from "./Line";
import dateFormatter from "../../services/dateFormatter";

const ColumnsPlotContainer = () => {
    const [period, setPeriod] = useState(7);
    const [group, setGroup] = useState(7);

    const [data, setData] = useState(null);

    const { expenses, loading, error } = useSelector(
        (state: any) => state.expensesReducer
    );

    const { currency } = useSelector((state: any) => state.userReducer);

    useEffect(() => {
        if (expenses) {
            const allDates = [...Array(period)]
                .map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    return d.toJSON().slice(0, 10);
                })
                .reverse();
            const preparedData = allDates.map((elem) => {
                let accum = 0;
                expenses.reduce((_, curr) => {
                    if (curr.date.slice(0, 10) == elem) {
                        accum += curr.amount;
                    }
                }, accum);
                return {
                    date: dateFormatter(elem),
                    amount: accum,
                };
            });
            const groupData = preparedData.map((el) => {});
            setData(preparedData);
        }
    }, [loading, period]);

    const segment = (period) => {
        const d = new Date();
        switch (period) {
            case "Week":
                setPeriod(7);
                break;
            case "Month":
                setPeriod(30);
                break;
            case "Quarter":
                setPeriod(90);
                break;
            case "Year":
                setPeriod(365);
                break;
            default:
                setPeriod(7);
        }
    };

    if (data) {
        return (
            <React.Fragment>
                <div className="segments">
                    <Segmented
                        options={["Week", "Month", "Quarter", "Year"]}
                        defaultValue={"Week"}
                        onChange={(value) => {
                            segment(value);
                        }}
                        className={"segmented"}
                        block={false}
                    />
                    <Segmented
                        options={["Days", "Weeks", "Mounths"]}
                        defaultValue={"Days"}
                        onChange={(value) => {
                            console.log(value);
                        }}
                        className={"segmented"}
                        block={false}
                    />
                </div>
                {period < 91 ? (
                    <Columns data={data} currency={currency} />
                ) : (
                    <LineColumn data={data} currency={currency} />
                )}
            </React.Fragment>
        );
    } else {
        return <Spin size="large" />;
    }
};

export default ColumnsPlotContainer;
