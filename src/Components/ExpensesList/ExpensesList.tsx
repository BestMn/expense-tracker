import { Avatar, List } from "antd";
import React from "react";

const ExpensesList: React.FC = ({ data, currency }) => (
    <React.Fragment>
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title={
                            <a href="https://ant.design">{`${item.id} ${item.value} ${currency}`}</a>
                        }
                        description={`${item.date}`}
                    />
                </List.Item>
            )}
        />
    </React.Fragment>
);

export default ExpensesList;
