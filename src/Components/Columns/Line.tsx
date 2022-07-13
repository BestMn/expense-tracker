import { Line } from "@ant-design/plots";

const LineColumn = ({ data, currency }) => {
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
        smooth: true,
    };

    return <Line {...config} />;
};

export default LineColumn;
