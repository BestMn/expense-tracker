import { Layout, Col, Row } from "antd";
import React from "react";
import "antd/dist/antd.css";
import "./ExpensesPage.css";
import CategoriesList from "../../Components/CategoiesList/CategoriesList";
import ExpensesTableContainer from "../../Components/ExpensesTable/ExpensesTableContainer";
import CreateExpenseFormConitaner from "../../Components/CreateExpenseForm/CreateExpenseFormContainer";
import SideMenu from "../../Components/SideMenu/SideMenu";

const { Content, Footer } = Layout;

const ExpensesPage: React.FC = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SideMenu />
            <Layout className="site-layout">
                <Content style={{ margin: "0 16px" }}>
                    <Row>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-16"
                            }
                        >
                            <div className="dashboard-block expenses-block">
                                <ExpensesTableContainer />
                            </div>
                        </Col>
                        <Col
                            span={12}
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-8"
                            }
                        >
                            <div className="dashboard-block list-block">
                                <CategoriesList editable={true} />
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
