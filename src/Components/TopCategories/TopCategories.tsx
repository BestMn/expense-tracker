import { Bar } from "@ant-design/plots";
import { TopCategoriesData } from "./TopCategoriesContainer";

type TopCategoriesProps = {
    data: TopCategoriesData[];
    currency: string | null;
};

const TopCategories: React.FC<TopCategoriesProps> = ({ data, currency }) => {
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
