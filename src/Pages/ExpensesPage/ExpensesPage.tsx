import { Col, Row } from "antd";
import React from "react";
import "antd/dist/antd.css";
import "./ExpensesPage.css";
import CategoriesList from "../../Components/CategoiesList/CategoriesList";
import ExpensesTableContainer from "../../Components/ExpensesTable/ExpensesTableContainer";
import CreateExpenseFormConitaner from "../../Components/CreateExpenseForm/CreateExpenseFormContainer";

const ExpensesPage: React.FC = () => {
    return (
        <>
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
        </>
    );
};

export default ExpensesPage;
