import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Col, Row } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./ExpensePage.css";
import { Link } from "react-router-dom";
import CategoriesList from "../Components/CategoiesList/CategoriesList";
import ExpensesTableContainer from "../Components/ExpensesTable/ExpensesTableContainer";

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

const menuItems: MenuItem[] = [
    getItem(<Link to="/dashboard">Dashboard</Link>, "1", <PieChartOutlined />),
    getItem(<Link to="/expenses">Expenses</Link>, "2", <DesktopOutlined />),
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

const ExpensesPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

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
                    defaultSelectedKeys={["2"]}
                    mode="inline"
                    items={menuItems}
                />
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: "0 16px" }}>
                    <Row>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24"
                            }
                        >
                            <div className="dashboard-block expenses-block">
                                <ExpensesTableContainer />
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
                            <div className="dashboard-block list-block"></div>
                        </Col>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8"
                            }
                        >
                            <div className="dashboard-block list-block"></div>
                        </Col>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-8"
                            }
                        >
                            <div className="dashboard-block list-block"></div>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default ExpensesPage;
