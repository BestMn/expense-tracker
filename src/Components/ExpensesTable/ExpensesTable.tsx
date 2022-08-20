import { Space, Table, Tag, DatePicker, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useState, useRef, useEffect } from "react";
import dateFormatter from "../../services/dateFormatter";
const { Column, ColumnGroup } = Table;
import * as FontIcon from "react-icons/fa";
import "./ExpensesTable.css";
import EditExpenseForm from "../EditExpenseForm/EditExpenseForm";

const ExpensesTable = ({
    data,
    currency,
    pagination,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleDateFilter,
}) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    // const disabledDates = (current) => {
    //     if (
    //         data.find((elem) => {
    //             const cur = dateFormatter(current.toJSON());
    //             return elem.date == cur;
    //         })
    //     ) {
    //         return;
    //     }

    //     return current;
    // };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        console.log(searchInput);
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
                            if (e) {
                                setSelectedKeys([e]);
                                handleDateFilter(e.toJSON());
                            } else {
                                clearFilters && handleReset(clearFilters);
                            }
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            );
                        }}
                        // disabledDate={disabledDates}
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
        onFilter: (value, record) => {},
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => (text ? dateFormatter(text) : text),
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
            render: (text, record) => {
                if (text && record) {
                    return (
                        <div className="expense-category">
                            <div
                                style={{ backgroundColor: record.color }}
                                className="expense-category-icon"
                            >
                                {React.createElement(FontIcon[record.icon])}
                            </div>
                            {` ${text}`}
                        </div>
                    );
                }
            },
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text) => {
                if (text) {
                    return <span>{`${text} ${currency}`}</span>;
                }
            },
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record, index) => {
                if (record.id) {
                    return (
                        <Space size="middle">
                            <EditExpenseForm editedExpense={record} />
                            <button onClick={() => handleDelete(record.id)}>
                                Delete
                            </button>
                        </Space>
                    );
                }
            },
        },
    ];

    return (
        <Table
            pagination={{ position: ["bottomLeft"], ...pagination }}
            onChange={(pagination) => handlePageChange(pagination.current)}
            columns={columns}
            dataSource={data}
            rowKey={(record) => {
                return record.id ? record.id : record.key;
            }}
            rowClassName={(record, index) => "expense-table-row"}
        />
    );
};

export default ExpensesTable;
