import { Space, Table, Tag, DatePicker, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useState, useRef } from "react";
import dateFormatter from "../../services/dateFormatter";
const { Column, ColumnGroup } = Table;
import moment from "moment";

const ExpensesTable = ({ data }) => {
    console.log(data);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const disabledDate = (current) => {
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
                        disabledDate={disabledDate}
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
        // searchedColumn === dataIndex ? (
        //     <Highlighter
        //         highlightStyle={{
        //             backgroundColor: "#ffc069",
        //             padding: 0,
        //         }}
        //         searchWords={[searchText]}
        //         autoEscape
        //         textToHighlight={text ? text.toString() : ""}
        //     />
        // ) : (
        //     text
        // ),
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
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
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

    return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default ExpensesTable;
