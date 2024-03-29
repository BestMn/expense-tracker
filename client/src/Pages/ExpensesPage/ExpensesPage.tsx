import { Col, Row } from "antd";
import React from "react";
import "antd/dist/antd.css";
import "./ExpensesPage.css";
import ExpensesTableContainer from "../../Components/ExpensesTable/ExpensesTableContainer";
import CreateExpenseFormConitaner from "../../Components/CreateExpenseForm/CreateExpenseFormContainer";
import CategoriesListContainer from "../../Components/CategoiesList/CategoriesListContainer";

const ExpensesPage: React.FC = () => {
    return (
        <>
            <Row gutter={[16, 16]} type="flex">
                <Col
                    span={24}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-16"
                    }
                >
                    <div className="app-block expenses-table-block">
                        <h2>My Expenses</h2>
                        <ExpensesTableContainer />
                    </div>
                </Col>
                <Col
                    span={12}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-8"
                    }
                >
                    <Row gutter={[16, 16]} type="flex">
                        <Col
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-24"
                            }
                        >
                            <div className="app-block expenses-block">
                                <h2>My Categories</h2>
                                <CategoriesListContainer />
                            </div>
                        </Col>
                        <Col
                            className={
                                "ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-24"
                            }
                        >
                            <div className="app-block expenses-block">
                                <h2>Add Expense</h2>
                                <CreateExpenseFormConitaner />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default ExpensesPage;
