import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segmented, Spin, DatePicker, Empty } from "antd";
import "./ColumnsContainer.css";
import Columns from "./Columns";
import dateFormatter from "../../services/dateFormatter";

const { RangePicker } = DatePicker;

const ColumnsPlotContainer = () => {
    const [period, setPeriod] = useState(null);

    const [data, setData] = useState(null);

    const { expenses, loading, error } = useSelector(
        (state: any) => state.expensesReducer
    );

    const { currency } = useSelector((state: any) => state.userReducer);

    const onPeriodChange = (days) => {
        const now = new Date();
        const backdate = new Date(now.setDate(now.getDate() - days));
        setPeriod([backdate.toJSON(), new Date().toJSON()]);
    };

    useEffect(() => {
        onPeriodChange(7);
    }, []);

    useEffect(() => {
        if (expenses && period) {
            const days = Math.floor(
                (Date.parse(period[1]) - Date.parse(period[0])) /
                    1000 /
                    60 /
                    60 /
                    24
            );

            const allDates = [...Array(days)]
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
            setData(preparedData);
        }
    }, [loading, period]);

    const segment = (period) => {
        const d = new Date();
        switch (period) {
            case "Week":
                onPeriodChange(7);
                break;
            case "Month":
                onPeriodChange(30);
                break;
            case "Quarter":
                onPeriodChange(90);
                break;
            case "Year":
                onPeriodChange(365);
                break;
            default:
                onPeriodChange(7);
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
                    <RangePicker
                        onChange={(value) => {
                            if (value) {
                                setPeriod([
                                    value[0]?.toJSON(),
                                    value[1]?.toJSON(),
                                ]);
                            }
                        }}
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
                <Columns data={data} currency={currency} />
            </React.Fragment>
        );
    } else if (loading) {
        return <Spin size="large" />;
    } else if (!data) {
        return <Empty />;
    }
};

export default ColumnsPlotContainer;
