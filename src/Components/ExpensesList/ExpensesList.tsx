import { Avatar, Button, List, Skeleton, Pagination } from "antd";
import React, { useEffect, useState } from "react";
const count = 3;

const ExpensesList = ({ data, currency, loading }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <a key="list-loadmore-edit">edit</a>,
                        <a key="list-loadmore-more">more</a>,
                    ]}
                >
                    <Skeleton avatar title={false} loading={!data} active>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                            }
                            title={
                                <a href="https://ant.design">{`${item.id} ${item.amount} ${currency}`}</a>
                            }
                            description={`${item.date}`}
                        />
                        <div>content</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default ExpensesList;
