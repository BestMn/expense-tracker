import { Line } from "@ant-design/plots";

const LineColumn = ({ data }) => {
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
        smooth: true,
    };

    return <Line {...config} />;
};

export default LineColumn;
