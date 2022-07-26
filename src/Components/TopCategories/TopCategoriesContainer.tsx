import React, { useState, useEffect } from "react";
import TopCategories from "./TopCategories";
import { useSelector } from "react-redux";
import { Select } from "antd";
import "./TopCategories.css";
import moment from "moment";

const TopCategoriesContainer = () => {
    const period = 30;
    const handleChange = () => {};

    const [data, setData] = useState(null);

    const { expenses } = useSelector((state: any) => state.expensesReducer);

    const { categories } = useSelector((state: any) => state.categoriesReducer);

    const { currency } = useSelector((state: any) => state.userReducer);

    useEffect(() => {
        if (expenses && categories) {
            const priorDate = moment().subtract(period, "days");
            const copied = [...expenses];
            const lastExpenses = copied.filter(
                (el) => priorDate < moment(el.date)
            );
            const expensesWithCategories = lastExpenses.map((elem) => {
                const category = categories.find(
                    (el) => elem.categoryId == el.id
                );
                return {
                    ...elem,
                    category: category.name,
                    icon: category.icon,
                    color: category.color,
                };
            });
            const reducedExpenses = [];
            expensesWithCategories.forEach((elem) => {
                const existedCategoryIndex = reducedExpenses.findIndex(
                    (el) => el.categoryId == elem.categoryId
                );
                if (existedCategoryIndex >= 0) {
                    reducedExpenses[existedCategoryIndex].amount += elem.amount;
                } else {
                    reducedExpenses.push(elem);
                }
            });
            reducedExpenses.sort((a, b) => b.amount - a.amount).slice(0, 4);
            setData(reducedExpenses);
        }
    }, [expenses, categories]);

    if (data) {
        return (
            <>
                <h2>
                    Top Categories in the last{" "}
                    <PeriodSelect handleChange={handleChange} />
                </h2>
                <TopCategories data={data} currency={currency} />
            </>
        );
    }
};

const PeriodSelect: React.FC = ({ handleChange }) => {
    const { Option } = Select;
    return (
        <>
            <Select
                defaultValue="lucy"
                className="period-select"
                bordered={false}
                dropdownMatchSelectWidth={false}
                onChange={handleChange}
                showArrow={false}
            >
                <Option value="jack">7 days</Option>
                <Option value="lucy">30 days</Option>
                <Option value="Yiminghe">90 days</Option>
            </Select>
        </>
    );
};

export default TopCategoriesContainer;
