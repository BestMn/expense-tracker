import { List } from "antd";
import React from "react";
import * as FontIcon from "react-icons/fa";
import "./LastExpensesList.css";

export type LastExpensesListItem = {
    amount: number;
    category: string;
    color: string;
    date: string;
    description: string;
    icon: string;
    key?: string;
};

type LastExpensesListProps = {
    data: LastExpensesListItem[];
    currency: string | null;
};

const LastExpensesList: React.FC<LastExpensesListProps> = ({
    data,
    currency = "$",
}) => {
    console.log(data);
    return (
        <React.Fragment>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => {
                    if (!item.category) {
                        return (
                            <List.Item
                                key={item.key}
                                className="last-expenses-list__item"
                            />
                        );
                    }
                    return (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <div className="last-expenses-list__item-category">
                                        <div
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                            className="last-expenses-list__item-category-icon"
                                        >
                                            {React.createElement(
                                                FontIcon[item.icon]
                                            )}
                                        </div>
                                    </div>
                                }
                                title={
                                    <a href="https://ant.design">
                                        {item.category}
                                    </a>
                                }
                                description={`${item.date}`}
                            />
                            <div
                                className={"last-expenses-list__item-amount"}
                            >{`${item.amount} ${currency}`}</div>
                        </List.Item>
                    );
                }}
            />
        </React.Fragment>
    );
};

export default LastExpensesList;
