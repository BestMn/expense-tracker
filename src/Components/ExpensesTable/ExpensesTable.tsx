import { Space, Table, Tag, DatePicker, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useState, useRef } from "react";
import dateFormatter from "../../services/dateFormatter";
const { Column, ColumnGroup } = Table;
import * as FontIcon from "react-icons/fa";
import "./ExpensesTable.css";

const ExpensesTable = ({ data, currency }) => {
    console.log(data);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const disabledDates = (current) => {
        if (
            data.find((elem) => {
                const cur = dateFormatter(current.toJSON());
                return elem.date == cur;
            })
        ) {
            return;
        }

        return current;
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Space>
                    <DatePicker
                        format="DD-MM-YYYY"
                        onChange={(e) => {
                            e
                                ? setSelectedKeys([dateFormatter(e?.toJSON())])
                                : clearFilters && handleReset(clearFilters);
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            );
                        }}
                        disabledDate={disabledDates}
                        autoFocus={true}
                    />
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => text,
    });

    const columns: ColumnsType<DataType> = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            ...getColumnSearchProps("date"),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (text, record) => (
                <div className="expense-category">
                    <div
                        style={{ backgroundColor: record.color }}
                        className="expense-category-icon"
                    >
                        {React.createElement(FontIcon[record.icon])}
                    </div>
                    {` ${text}`}
                </div>
            ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text) => <span>{`${text} ${currency}`}</span>,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <Table
            pagination={{ position: ["bottomLeft"] }}
            columns={columns}
            dataSource={data}
            rowKey={"id"}
            // rowClassName={(record, index) => console.log(record, index)}
        />
    );
};

export default ExpensesTable;
