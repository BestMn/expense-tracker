import { Pie, measureTextWidth } from "@ant-design/plots";
import { DonutPlotData } from "./DonutPlotContainer";

type DonutPlotProps = {
    data: DonutPlotData;
    currency: string | null;
};

type TRenderStatistic = (
    containerWidth: number,
    text: string,
    style: {}
) => string;

const DonutPlot: React.FC<DonutPlotProps> = ({ data, currency = "$" }) => {
    const renderStatistic: TRenderStatistic = function (
        containerWidth,
        text,
        style
    ) {
        const { width: textWidth, height: textHeight } = measureTextWidth(
            text,
            style
        );
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(
                Math.sqrt(
                    Math.abs(
                        Math.pow(R, 2) /
                            (Math.pow(textWidth / 2, 2) +
                                Math.pow(textHeight, 2))
                    )
                ),
                1
            );
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
            scale < 1 ? 1 : "inherit"
        };">${text}</div>`;
    };

    const config = {
        appendPadding: 10,
        data,
        legend: false,
        colorField: "color",
        angleField: "amount",
        color: (data: any) => {
            return data.color;
        },
        radius: 1,
        innerRadius: 0.64,
        label: {
            type: "inner",
            offset: "-50%",
            style: {
                textAlign: "center",
                fontSize: 16,
            },
            autoRotate: false,
            autoHide: true,
            content: (value: any) => {
                return value.category;
            },
        },
        statistic: {
            title: {
                offsetY: -4,
                customHtml: (container: any, view: any, datum: any) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(
                        Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
                    );
                    const text = datum ? datum.category : "Daily expenses";
                    return renderStatistic(d, text, {
                        fontSize: 28,
                    });
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: "32px",
                },
                customHtml: (
                    container: any,
                    view: any,
                    datum: any,
                    data: any
                ) => {
                    const { width } = container.getBoundingClientRect();
                    const text = datum
                        ? `${datum.amount} ${currency}`
                        : `${data.reduce(
                              (r: number, d: any) => r + d.amount,
                              0
                          )} ${currency}`;
                    return renderStatistic(width, text, {
                        fontSize: 32,
                    });
                },
            },
        },
        interactions: [
            {
                type: "element-selected",
                enable: false,
            },
            {
                type: "element-active",
            },
            {
                type: "pie-statistic-active",
            },
        ],
    };
    return <Pie {...config} />;
};

export default DonutPlot;
