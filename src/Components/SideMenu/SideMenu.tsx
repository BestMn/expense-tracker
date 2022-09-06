import React, { useState } from "react";
import {
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Layout } from "antd";
import "antd/dist/antd.css";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "../../store/reducers/userReducer";

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
    getItem(<NavLink to="/user">User</NavLink>, "/user", <UserOutlined />),
    getItem(<span>Logout</span>, "logout", <LogoutOutlined />),
];

const SideMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setToken(null));
        dispatch(setUserId(null));

        localStorage.removeItem("userData");
    };
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
                selectedKeys={[location.pathname]}
                mode="inline"
                items={items}
                onClick={(item) => {
                    if (item.key === "logout") {
                        logout();
                    }
                }}
            />
        </Sider>
    );
};

export default SideMenu;
