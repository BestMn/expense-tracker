import { Column } from "@ant-design/plots";
import { ColumnsData } from "./ColumnsContainer";

type ColumnsProps = {
    data: ColumnsData;
    currency: string | null;
};

const Columns: React.FC<ColumnsProps> = ({ data, currency = "$" }) => {
    const config = {
        height: 356,
        data,
        xField: "date",
        yField: "amount",
        xAxis: {
            label: {
                autoHide: false,
                autoRotate: false,
                formatter: (text: string, item, index: number) => {
                    if (index === 0 || index === data.length - 1) {
                        return text;
                    }
                },
            },
            tickLine: null,
        },
        tooltip: {
            formatter: (datum: any) => {
                return {
                    name: "Total",
                    value: `${datum.amount} ${currency}`,
                };
            },
        },
    };

    return <Column {...config} />;
};

export default Columns;
