import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Col, Row } from "antd";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "../store/reducers/userReducer";
import "antd/dist/antd.css";
import "./DashboardPage.css";
import { NavLink } from "react-router-dom";

import DonutPlotContainer from "../Components/DonutPlot/DonutPlotContainer";
import ColumnsContainer from "../Components/Columns/ColumnsContainer";
import LastExpensesListContainer from "../Components/LastExpensesList/LastExpensesListContainer";
import TopCategoriesContainer from "../Components/TopCategories/TopCategoriesContainer";
import CreateExpenseFormConitaner from "../Components/CreateExpenseForm/CreateExpenseFormContainer";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(
        <NavLink to="/dashboard">Dashboard</NavLink>,
        "1",
        <PieChartOutlined />
    ),
    getItem(
        <NavLink to="/expenses">Expenses</NavLink>,
        "2",
        <DesktopOutlined />
    ),
    getItem("User", "sub1", <UserOutlined />, [
        getItem("Tom", "3"),
        getItem("Bill", "4"),
        getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
        getItem("Team 1", "6"),
        getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
];

const DashboardPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setToken(null));
        dispatch(setUserId(null));

        localStorage.removeItem("userData");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: "0 16px" }}>
                    <Row>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-10"
                            }
                        >
                            <div className="dashboard-block graph-block">
                                <DonutPlotContainer />
                            </div>
                        </Col>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-14"
                            }
                        >
                            <div className="dashboard-block graph-block">
                                <ColumnsContainer />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8"
                            }
                        >
                            <div className="dashboard-block list-block">
                                <CreateExpenseFormConitaner />
                            </div>
                        </Col>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8"
                            }
                        >
                            <div className="dashboard-block list-block">
                                <LastExpensesListContainer />
                            </div>
                        </Col>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-8"
                            }
                        >
                            <div className="dashboard-block list-block">
                                <TopCategoriesContainer />
                            </div>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    <button onClick={logout}>Logout</button>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardPage;
