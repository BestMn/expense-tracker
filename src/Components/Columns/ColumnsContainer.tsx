import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Segmented, Spin, DatePicker, Empty } from "antd";
import "./ColumnsContainer.css";
import Columns from "./Columns";
import dateFormatter from "../../services/dateFormatter";
import { RootState } from "../../store/store";

const { RangePicker } = DatePicker;

export type ColumnsExpense = {
    date: string;
    amount: number;
};

export type ColumnsData = Array<ColumnsExpense>;

const ColumnsPlotContainer = () => {
    const [segmentPeriod, setSegmentPeriod] = useState<string | null>("Week");
    const [period, setPeriod] = useState<Array<string> | null>(null);

    const [data, setData] = useState<ColumnsData | null>(null);

    const { expenses, loading, error } = useSelector(
        (state: RootState) => state.expensesReducer
    );

    const { currency } = useSelector((state: RootState) => state.userReducer);

    const onSegmentPeriodChange = (days: number) => {
        const now = new Date();
        const backdate = new Date(now.setDate(now.getDate() - days));
        setPeriod([backdate.toJSON(), new Date().toJSON()]);
    };

    const segment = (period: string) => {
        switch (period) {
            case "Week":
                onSegmentPeriodChange(7);
                break;
            case "Month":
                onSegmentPeriodChange(30);
                break;
            case "Quarter":
                onSegmentPeriodChange(90);
                break;
            case "Year":
                onSegmentPeriodChange(365);
                break;
            default:
                onSegmentPeriodChange(7);
        }
    };

    useEffect(() => {
        if (segmentPeriod) {
            segment(segmentPeriod);
        }
    }, [segmentPeriod]);

    useEffect(() => {
        if (expenses && period) {
            const daysInPeriod = Math.ceil(
                (Date.parse(period[1]) - Date.parse(period[0])) /
                    1000 /
                    60 /
                    60 /
                    24
            );

            const expensesInPeriod = expenses.filter((elem) => {
                return elem.date <= period[1] && elem.date >= period[0];
            });

            const datesArray = [...Array(daysInPeriod)]
                .map((_, i) => {
                    const d = new Date(period[1]);
                    d.setDate(d.getDate() - i);
                    return d.toJSON().slice(0, 10);
                })
                .reverse();
            const reducedExpenses = datesArray.map((elem) => {
                let accum = 0;
                expensesInPeriod.reduce((_, curr) => {
                    if (curr.date.slice(0, 10) == elem) {
                        accum += curr.amount;
                    }
                }, accum);
                return {
                    date: dateFormatter(elem),
                    amount: accum,
                };
            });
            setData(reducedExpenses);
        }
    }, [loading, period]);

    if (loading || !data) {
        return (
            <div className="spin-container">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="columns__container">
            <div className="columns__period-selector">
                <Segmented
                    options={["Week", "Month", "Quarter", "Year"]}
                    value={segmentPeriod}
                    onChange={(value) => {
                        setSegmentPeriod(value);
                    }}
                    className={"period-selector__period-segmented"}
                    block={false}
                />
                <RangePicker
                    size="small"
                    onChange={(value) => {
                        if (value && value[0] && value[1]) {
                            setSegmentPeriod(null);
                            value[0].set({
                                hour: 0,
                                minute: 0,
                                second: 0,
                            });
                            value[1].set({
                                hour: 23,
                                minute: 59,
                                second: 59,
                            });
                            setPeriod([value[0].toJSON(), value[1].toJSON()]);
                        } else {
                            setSegmentPeriod("Week");
                        }
                    }}
                    className={"period-selector__range-picker"}
                />
            </div>
            <Columns data={data} currency={currency} />
        </div>
    );
};

export default ColumnsPlotContainer;
