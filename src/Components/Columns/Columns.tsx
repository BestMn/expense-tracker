import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";

const Columns = ({ data, currency }) => {
    const config = {
        height: 356,
        data,
        xField: "date",
        yField: "amount",
        xAxis: {
            label: {
                autoHide: false,
                autoRotate: false,
                formatter: (text, item, index) => {
                    if (index === 0 || index === data.length - 1) {
                        return text;
                    }
                },
            },
            tickLine: null,
        },
        tooltip: {
            formatter: (datum) => {
                return {
                    name: "Amount",
                    value: `${datum.amount} ${currency}`,
                };
            },
        },
        meta: {
            type: {
                alias: "别",
            },
            sales: {
                alias: "销额",
            },
        },
    };

    return <Column {...config} />;
};

export default Columns;
