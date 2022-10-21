import {
    Space,
    Table,
    Tooltip,
    DatePicker,
    Button,
    InputRef,
    Skeleton,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type {
    ColumnsType,
    ColumnType,
    FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useState, useRef } from "react";
import dateFormatter from "../../services/dateFormatter";
import * as FontIcon from "react-icons/fa";
import "./ExpensesTable.css";
import EditExpenseForm from "../EditExpenseForm/EditExpenseForm";
import { IconList } from "../IconPicker/iconType";
import { TCategory } from "../../store/reducers/categoriesReducer";
import { EditUserExpenseData } from "../../store/actions/expenseActions";

export type TTableExpense = {
    id: number;
    categoryId: number;
    amount: number;
    category: string;
    icon: IconList;
    color: string;
    date: string;
    description: string;
    key?: string;
};

type DataIndex = keyof TTableExpense;

type ExpenseTableProps = {
    data: Array<TTableExpense>;
    categories: TCategory[] | null;
    currency: string | null;
    loading: boolean;
    onDelete: (value: number) => void;
    onEdit: (value: EditUserExpenseData) => void;
    currentPage: number;
    setCurrentPage: (value: number) => void;
};

const ExpensesTable: React.FC<ExpenseTableProps> = ({
    data,
    categories,
    currency = "$",
    loading,
    onDelete,
    onEdit,
    currentPage,
    setCurrentPage,
}) => {
    const disabledDates = (current: moment.Moment) => {
        const cur = current.utc().format("DD-MM-YYYY");
        return !data.find((elem) => elem.date == cur);
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm();
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<TTableExpense> => ({
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
        onFilter: (value, record) => {
            if (record[dataIndex]) {
                return record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase());
            } else return false;
        },
    });

    const columns: ColumnsType<TTableExpense> = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: "15%",
            render: (text) => {
                if (text) {
                    return (
                        <div className={"expense-table__date-cell"}>{text}</div>
                    );
                }
            },

            ...getColumnSearchProps("date"),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: "20%",
            ellipsis: true,
            render: (text, record) => {
                if (text && record) {
                    return (
                        <div className="expense-table__category-cell">
                            <div
                                style={{ backgroundColor: record.color }}
                                className="expense-table__category-icon"
                            >
                                {React.createElement(FontIcon[record.icon])}
                            </div>
                            <span className="expense-table__category-name">
                                {text}
                            </span>
                        </div>
                    );
                }
            },
            filters: categories?.map((elem) => {
                return {
                    text: <span>{elem.name}</span>,
                    value: elem.name,
                };
            }),
            onFilter: (value: string, record) =>
                record.category?.startsWith(value),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            width: "12%",
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
            ellipsis: true,
            render: (text) => {
                if (text) {
                    return (
                        <Tooltip placement="topLeft" title={text}>
                            {text}
                        </Tooltip>
                    );
                }
            },
        },
        {
            title: "Action",
            key: "action",
            width: "23%",
            render: (_, record, index) => {
                if (record.id) {
                    return (
                        <div className="expense-table__action-cell">
                            <EditExpenseForm
                                editedExpense={record}
                                onEdit={onEdit}
                                currency={currency}
                            />
                            <Button
                                shape="round"
                                danger
                                onClick={() => onDelete(record.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    );
                }
            },
        },
    ];

    return (
        <Table
            pagination={{
                position: ["bottomLeft"],
                current: currentPage,
                onChange: (page) => setCurrentPage(page),
            }}
            scroll={{
                x: 700,
            }}
            columns={
                loading
                    ? columns.map((column, index) => {
                          return {
                              ...column,
                              render: () => {
                                  return (
                                      <Skeleton
                                          key={index}
                                          title={true}
                                          paragraph={false}
                                          active
                                      />
                                  );
                              },
                          };
                      })
                    : columns
            }
            dataSource={data}
            rowKey={(record) => {
                if (record.id) {
                    return record.id;
                } else if (record.key) {
                    return record.key;
                } else return "defaultKey";
            }}
            className={"expense-table"}
            rowClassName={(record, index) => "expense-table__row"}
        />
    );
};

export default ExpensesTable;
