import { Space, Table, Tag, DatePicker, Button, Input, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type {
    ColumnsType,
    ColumnType,
    FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useState, useRef, useEffect } from "react";
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
    categories: TCategory[];
    currency: string;
    onDelete: (value: number) => void;
    onEdit: (value: EditUserExpenseData) => void;
    currentPage: number;
    setCurrentPage: (value: number) => void;
};

const ExpensesTable: React.FC<ExpenseTableProps> = ({
    data,
    categories,
    currency = "$",
    onDelete,
    onEdit,
    currentPage,
    setCurrentPage,
}) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);

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
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
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
        onFilterDropdownVisibleChange: (visible: boolean) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns: ColumnsType<TTableExpense> = [
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
            filters: categories.map((elem) => {
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
                            <EditExpenseForm
                                editedExpense={record}
                                onEdit={onEdit}
                            />
                            <button onClick={() => onDelete(record.id)}>
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
            pagination={{
                position: ["bottomLeft"],
                current: currentPage,
                onChange: (page) => setCurrentPage(page),
            }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => {
                if (record.id) {
                    return record.id;
                } else if (record.key) {
                    return record.key;
                } else return "defaultKey";
            }}
            rowClassName={(record, index) => "expense-table__row"}
        />
    );
};

export default ExpensesTable;
