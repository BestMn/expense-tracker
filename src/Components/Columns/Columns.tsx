import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

const Columns = ({ data }) => {
    const config = {
        data,
        xField: "date",
        yField: "value",
        xAxis: {
            // type: 'timeCat',
            tickCount: 10,
        },
    };

    return <Line {...config} />;
};

export default Columns;
