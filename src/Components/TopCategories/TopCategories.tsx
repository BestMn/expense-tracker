import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";

const TopCategories = ({ data, currency }) => {
    const config = {
        height: 322,
        data,
        xField: "amount",
        yField: "category",
        seriesField: "color",
        color: ({ color }) => {
            return color;
        },
        tooltip: {
            formatter: (data) => {
                return {
                    name: "Total",
                    value: `${data.amount} ${currency}`,
                };
            },
        },
        legend: false,
    };
    return <Bar {...config} />;
};

export default TopCategories;
