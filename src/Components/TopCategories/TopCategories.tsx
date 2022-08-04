import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";

const TopCategories = ({ data }) => {
    const config = {
        height: 322,
        data,
        xField: "amount",
        yField: "category",
        seriesField: "color",
        legend: false,
    };
    return <Bar {...config} />;
};

export default TopCategories;
