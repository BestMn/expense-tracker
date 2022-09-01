import React, { useState, useEffect } from "react";
import TopCategories from "./TopCategories";
import { useSelector } from "react-redux";
import { Select } from "antd";
import "./TopCategories.css";

const TopCategoriesContainer = () => {
    const [data, setData] = useState(null);
    const [period, setPeriod] = useState(7);
    const handleChange = (value) => {
        setPeriod(value);
    };

    const { expenses } = useSelector((state: any) => state.expensesReducer);

    const { categories } = useSelector((state: any) => state.categoriesReducer);

    const { currency } = useSelector((state: any) => state.userReducer);

    useEffect(() => {
        if (expenses && categories) {
            const today = new Date();
            const priorDate = new Date().setDate(today.getDate() - period);
            const lastExpenses = expenses.filter(
                (el) => priorDate < Date.parse(el.date)
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
    }, [expenses, categories, period]);

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
                defaultValue="7"
                className="period-select"
                bordered={false}
                dropdownMatchSelectWidth={false}
                onChange={(value) => handleChange(value)}
                showArrow={false}
            >
                <Option value="7">7 days</Option>
                <Option value="30">30 days</Option>
                <Option value="90">90 days</Option>
            </Select>
        </>
    );
};

export default TopCategoriesContainer;
