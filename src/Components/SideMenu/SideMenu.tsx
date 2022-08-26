import React, { useState } from "react";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Layout } from "antd";
import "antd/dist/antd.css";
import { NavLink, useLocation } from "react-router-dom";

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

const { Sider } = Layout;

const items: MenuItem[] = [
    getItem(
        <NavLink to="/dashboard">Dashboard</NavLink>,
        "/dashboard",
        <PieChartOutlined />
    ),
    getItem(
        <NavLink to="/expenses">Expenses</NavLink>,
        "/expenses",
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

const SideMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    return (
        <Sider
            collapsible={true}
            collapsed={collapsed}
            breakpoint="lg"
            collapsedWidth={50}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className="logo" />
            <Menu
                theme="dark"
                defaultSelectedKeys={[location.pathname]}
                mode="inline"
                items={items}
            />
        </Sider>
    );
};

export default SideMenu;
