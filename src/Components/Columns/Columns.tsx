import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";

const Columns = ({ data }) => {
    const config = {
        data,
        xField: "date",
        yField: "value",
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "类别",
            },
            sales: {
                alias: "销额",
            },
        },
    };

    return <Column {...config} />;
};

export default Columns;
