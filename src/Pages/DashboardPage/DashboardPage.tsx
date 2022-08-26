import { Layout, Col, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "../../store/reducers/userReducer";
import "antd/dist/antd.css";
import "./DashboardPage.css";
import SideMenu from "../../Components/SideMenu/SideMenu";

import DonutPlotContainer from "../../Components/DonutPlot/DonutPlotContainer";
import ColumnsContainer from "../../Components/Columns/ColumnsContainer";
import LastExpensesListContainer from "../../Components/LastExpensesList/LastExpensesListContainer";
import TopCategoriesContainer from "../../Components/TopCategories/TopCategoriesContainer";
import CreateExpenseFormConitaner from "../../Components/CreateExpenseForm/CreateExpenseFormContainer";

const { Content, Footer } = Layout;

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setToken(null));
        dispatch(setUserId(null));

        localStorage.removeItem("userData");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SideMenu />
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
